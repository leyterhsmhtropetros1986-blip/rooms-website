const { ADMIN_CREDENTIALS } = require('../_lib/config');
const { json, error, methodNotAllowed, readJson } = require('../_lib/http');
const { createSessionToken, serializeSessionCookie } = require('../_lib/session');
const { isAuthorizedOwner } = require('../_lib/auth');
const crypto = require('crypto');

function verifyScrypt(password, encoded) {
  const [salt, expectedHex] = String(encoded || '').split(':');
  if (!salt || !expectedHex) return false;

  const actual = crypto.scryptSync(password, salt, 64).toString('hex');
  const actualBuffer = Buffer.from(actual, 'hex');
  const expectedBuffer = Buffer.from(expectedHex, 'hex');
  if (actualBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  try {
    const body = await readJson(req);
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) return error(res, 400, 'Email and password are required');

    const match = ADMIN_CREDENTIALS.find((item) => {
      if (item.email !== email) return false;
      if (item.password_scrypt) return verifyScrypt(password, item.password_scrypt);
      if (item.password) return item.password === password;
      return false;
    });
    if (!match || !isAuthorizedOwner(email)) return error(res, 401, 'Invalid credentials');

    const token = createSessionToken(email);
    res.setHeader('Set-Cookie', serializeSessionCookie(token));
    return json(res, 200, { ok: true, email });
  } catch (err) {
    return error(res, 500, 'Login failed', err.message);
  }
};

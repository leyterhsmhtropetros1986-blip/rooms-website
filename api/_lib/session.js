const crypto = require('crypto');
const { SESSION_SECRET, SESSION_MAX_AGE_SECONDS, SESSION_COOKIE_NAME } = require('./config');

function toBase64Url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function sign(data) {
  return crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(data)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function createSessionToken(email) {
  const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = toBase64Url(
    JSON.stringify({
      sub: email,
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
    })
  );
  const signature = sign(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

function verifySessionToken(token) {
  if (!SESSION_SECRET || !token || typeof token !== 'string') return null;
  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) return null;

  const expected = sign(`${header}.${payload}`);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (signatureBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) return null;
    if (!decoded.sub || typeof decoded.sub !== 'string') return null;
    return decoded;
  } catch {
    return null;
  }
}

function serializeSessionCookie(token) {
  const attrs = [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    'HttpOnly',
    'SameSite=Lax',
    'Secure',
  ];
  return attrs.join('; ');
}

function clearSessionCookie() {
  return [
    `${SESSION_COOKIE_NAME}=`,
    'Path=/',
    'Max-Age=0',
    'HttpOnly',
    'SameSite=Lax',
    'Secure',
  ].join('; ');
}

module.exports = {
  createSessionToken,
  verifySessionToken,
  serializeSessionCookie,
  clearSessionCookie,
};

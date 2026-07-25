const { parseCookies } = require('./http');
const { SESSION_COOKIE_NAME, OWNER_EMAILS } = require('./config');
const { verifySessionToken } = require('./session');

function isAuthorizedOwner(email) {
  if (!email) return false;
  if (OWNER_EMAILS.length === 0) return true;
  return OWNER_EMAILS.includes(email.toLowerCase());
}

function requireAdmin(req, res) {
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE_NAME];
  const session = verifySessionToken(token);

  if (!session || !isAuthorizedOwner(session.sub)) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Unauthorized' }));
    return null;
  }

  return { email: session.sub };
}

module.exports = {
  requireAdmin,
  isAuthorizedOwner,
};

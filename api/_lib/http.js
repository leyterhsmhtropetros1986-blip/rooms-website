function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function error(res, status, message, details) {
  const payload = { error: message };
  if (details) payload.details = details;
  json(res, status, payload);
}

function methodNotAllowed(res, methods) {
  res.setHeader('Allow', methods.join(', '));
  return error(res, 405, 'Method not allowed');
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body.trim()) {
    return JSON.parse(req.body);
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  return raw ? JSON.parse(raw) : {};
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return header.split(';').reduce((acc, cookie) => {
    const idx = cookie.indexOf('=');
    if (idx < 0) return acc;
    const key = cookie.slice(0, idx).trim();
    const value = decodeURIComponent(cookie.slice(idx + 1).trim());
    acc[key] = value;
    return acc;
  }, {});
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

module.exports = {
  json,
  error,
  methodNotAllowed,
  readJson,
  parseCookies,
  getClientIp,
};

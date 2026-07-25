const { json, methodNotAllowed } = require('../_lib/http');
const { requireAdmin } = require('../_lib/auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  const admin = requireAdmin(req, res);
  if (!admin) return;
  return json(res, 200, { authenticated: true, email: admin.email });
};

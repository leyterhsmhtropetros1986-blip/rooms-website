const { json, methodNotAllowed } = require('../_lib/http');
const { requireAdmin } = require('../_lib/auth');
const { META_APP_ID, META_APP_SECRET, META_INSTAGRAM_ACCOUNT_ID, META_ACCESS_TOKEN } = require('../_lib/config');

module.exports = async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  const hasConfig = Boolean(META_APP_ID && META_APP_SECRET && META_INSTAGRAM_ACCOUNT_ID && META_ACCESS_TOKEN);

  return json(res, 200, {
    connected: hasConfig,
    oauthReady: Boolean(META_APP_ID && META_APP_SECRET),
    publishingEnabled: hasConfig,
    note: hasConfig
      ? 'Meta credentials configured. Ensure app review permissions before production publishing.'
      : 'Meta credentials are missing. Keep publishing disabled until setup is complete.',
  });
};

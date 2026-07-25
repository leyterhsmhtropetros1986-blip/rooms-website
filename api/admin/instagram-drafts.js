const { json, error, methodNotAllowed, readJson } = require('../_lib/http');
const { requireAdmin } = require('../_lib/auth');
const { supabaseRequest } = require('../_lib/supabase');
const { requireString, optionalString } = require('../_lib/validation');

module.exports = async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    if (req.method === 'GET') {
      const drafts = await supabaseRequest('instagram_drafts', {
        method: 'GET',
        query: {
          select: 'id,caption,image_url,status,created_at',
          order: 'created_at.desc',
          limit: '100',
        },
      });
      return json(res, 200, { drafts: drafts || [] });
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const created = await supabaseRequest('instagram_drafts', {
        method: 'POST',
        body: {
          caption: requireString(body.caption, 'caption', { min: 3, max: 4000 }),
          image_url: optionalString(body.image_url, 'image_url', { max: 1000 }),
          status: 'draft',
          created_by: admin.email,
        },
        query: { select: '*' },
        prefer: 'return=representation',
      });
      return json(res, 201, { draft: Array.isArray(created) ? created[0] : created });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  } catch (err) {
    return error(res, err.status || 500, err.message || 'Instagram drafts request failed', err.details);
  }
};

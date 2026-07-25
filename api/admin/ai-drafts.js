const { json, error, methodNotAllowed, readJson } = require('../_lib/http');
const { requireAdmin } = require('../_lib/auth');
const { supabaseRequest } = require('../_lib/supabase');
const { requireString } = require('../_lib/validation');

module.exports = async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    if (req.method === 'GET') {
      const drafts = await supabaseRequest('ai_drafts', {
        method: 'GET',
        query: {
          select: 'id,content_type,language,tone,output_text,created_at',
          order: 'created_at.desc',
          limit: '50',
        },
      });
      return json(res, 200, { drafts: drafts || [] });
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const created = await supabaseRequest('ai_drafts', {
        method: 'POST',
        body: {
          content_type: requireString(body.content_type, 'content_type', { max: 60 }),
          context: requireString(body.context || 'manual save', 'context', { max: 6000 }),
          language: requireString(body.language || 'el', 'language', { max: 20 }),
          tone: requireString(body.tone || 'friendly', 'tone', { max: 40 }),
          output_text: requireString(body.output_text, 'output_text', { min: 1, max: 8000 }),
          created_by: admin.email,
        },
        query: { select: '*' },
        prefer: 'return=representation',
      });
      return json(res, 201, { draft: Array.isArray(created) ? created[0] : created });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  } catch (err) {
    return error(res, err.status || 500, err.message || 'AI drafts request failed', err.details);
  }
};

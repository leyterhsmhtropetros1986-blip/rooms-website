const { json, error, methodNotAllowed, readJson } = require('../_lib/http');
const { requireAdmin } = require('../_lib/auth');
const { supabaseRequest } = require('../_lib/supabase');
const { requireString, requireInteger, optionalString } = require('../_lib/validation');

module.exports = async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    if (req.method === 'GET') {
      const url = new URL(req.url, 'http://localhost');
      const status = url.searchParams.get('status') || 'pending';

      const rows = await supabaseRequest('reviews', {
        method: 'GET',
        query: {
          select: 'id,guest_name,rating,review_text,status,admin_notes,created_at,updated_at',
          status: status === 'all' ? undefined : `eq.${status}`,
          order: 'created_at.desc',
          limit: '200',
        },
      });
      return json(res, 200, { reviews: rows || [] });
    }

    if (req.method === 'PATCH') {
      const body = await readJson(req);
      const id = requireString(body.id, 'id', { max: 100 });
      const payload = {
        guest_name: requireString(body.guest_name, 'guest_name', { max: 120 }),
        rating: requireInteger(body.rating, 'rating', { min: 1, max: 5 }),
        review_text: requireString(body.review_text, 'review_text', { min: 10, max: 3000 }),
        status: requireString(body.status, 'status', { max: 20 }),
        admin_notes: optionalString(body.admin_notes, 'admin_notes', { max: 1000 }),
        updated_at: new Date().toISOString(),
      };

      const updated = await supabaseRequest('reviews', {
        method: 'PATCH',
        query: { id: `eq.${id}`, select: '*' },
        body: payload,
        prefer: 'return=representation',
      });
      return json(res, 200, { review: Array.isArray(updated) ? updated[0] : updated });
    }

    if (req.method === 'DELETE') {
      const body = await readJson(req);
      const id = requireString(body.id, 'id', { max: 100 });
      await supabaseRequest('reviews', { method: 'DELETE', query: { id: `eq.${id}` } });
      return json(res, 200, { ok: true });
    }

    return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
  } catch (err) {
    return error(res, err.status || 500, err.message || 'Review request failed', err.details);
  }
};

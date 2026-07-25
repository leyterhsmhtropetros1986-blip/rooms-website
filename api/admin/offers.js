const { json, error, methodNotAllowed, readJson } = require('../_lib/http');
const { requireAdmin } = require('../_lib/auth');
const { supabaseRequest } = require('../_lib/supabase');
const { requireString, optionalString, requireDate } = require('../_lib/validation');

function normalizeOffer(input) {
  const validFrom = input.valid_from ? requireDate(input.valid_from, 'valid_from') : null;
  const validTo = input.valid_to ? requireDate(input.valid_to, 'valid_to') : null;
  if (validFrom && validTo && validTo < validFrom) throw new Error('valid_to must be after valid_from');

  return {
    title: requireString(input.title, 'title', { max: 180 }),
    description: requireString(input.description, 'description', { max: 3000 }),
    benefit: requireString(input.benefit, 'benefit', { max: 400 }),
    valid_from: validFrom,
    valid_to: validTo,
    image_url: optionalString(input.image_url, 'image_url', { max: 1000 }),
    cta_text: requireString(input.cta_text, 'cta_text', { max: 120 }),
    cta_url: requireString(input.cta_url, 'cta_url', { max: 1000 }),
    is_active: Boolean(input.is_active),
  };
}

module.exports = async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    if (req.method === 'GET') {
      const offers = await supabaseRequest('offers', {
        method: 'GET',
        query: {
          select: 'id,title,description,benefit,valid_from,valid_to,image_url,cta_text,cta_url,is_active,created_at,updated_at',
          order: 'created_at.desc',
          limit: '200',
        },
      });
      return json(res, 200, { offers: offers || [] });
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const created = await supabaseRequest('offers', {
        method: 'POST',
        body: normalizeOffer(body),
        query: { select: '*' },
        prefer: 'return=representation',
      });
      return json(res, 201, { offer: Array.isArray(created) ? created[0] : created });
    }

    if (req.method === 'PATCH') {
      const body = await readJson(req);
      const id = requireString(body.id, 'id', { max: 100 });
      const payload = normalizeOffer(body);
      payload.updated_at = new Date().toISOString();

      const updated = await supabaseRequest('offers', {
        method: 'PATCH',
        query: { id: `eq.${id}`, select: '*' },
        body: payload,
        prefer: 'return=representation',
      });
      return json(res, 200, { offer: Array.isArray(updated) ? updated[0] : updated });
    }

    if (req.method === 'DELETE') {
      const body = await readJson(req);
      const id = requireString(body.id, 'id', { max: 100 });
      await supabaseRequest('offers', { method: 'DELETE', query: { id: `eq.${id}` } });
      return json(res, 200, { ok: true });
    }

    return methodNotAllowed(res, ['GET', 'POST', 'PATCH', 'DELETE']);
  } catch (err) {
    return error(res, err.status || 500, err.message || 'Offer request failed', err.details);
  }
};

const { json, error, methodNotAllowed, readJson, getClientIp } = require('../_lib/http');
const { supabaseRequest } = require('../_lib/supabase');
const { enforceRateLimit } = require('../_lib/rate-limit');
const { requireString, requireInteger, optionalString } = require('../_lib/validation');

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const reviews = await supabaseRequest('reviews', {
        method: 'GET',
        query: {
          select: 'id,guest_name,rating,review_text,created_at',
          status: 'eq.approved',
          order: 'created_at.desc',
          limit: '20',
        },
      });
      return json(res, 200, { reviews: reviews || [] });
    } catch (err) {
      return error(res, err.status || 500, err.message || 'Failed to load reviews', err.details);
    }
  }

  if (req.method === 'POST') {
    try {
      const body = await readJson(req);
      if (body.website) return error(res, 400, 'Spam detected');

      await enforceRateLimit({
        ip: getClientIp(req),
        action: 'public_review_submit',
        windowMinutes: 20,
        maxAttempts: 5,
      });

      const payload = {
        guest_name: requireString(body.guest_name, 'guest_name', { max: 120 }),
        rating: requireInteger(body.rating, 'rating', { min: 1, max: 5 }),
        review_text: requireString(body.review_text, 'review_text', { min: 10, max: 3000 }),
        status: 'pending',
        admin_notes: optionalString(body.admin_notes, 'admin_notes', { max: 1000 }),
      };

      await supabaseRequest('reviews', { method: 'POST', body: payload });
      return json(res, 201, { ok: true, message: 'Review submitted for moderation' });
    } catch (err) {
      return error(res, err.status || 500, err.message || 'Failed to submit review', err.details);
    }
  }

  return methodNotAllowed(res, ['GET', 'POST']);
};

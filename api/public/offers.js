const { json, error, methodNotAllowed } = require('../_lib/http');
const { supabaseRequest } = require('../_lib/supabase');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  try {
    const today = new Date().toISOString().slice(0, 10);
    const offers = await supabaseRequest('offers', {
      method: 'GET',
      query: {
        select: 'id,title,description,benefit,valid_from,valid_to,image_url,cta_text,cta_url',
        is_active: 'eq.true',
        order: 'created_at.desc',
      },
    });

    const filtered = (offers || []).filter((item) => {
      if (item.valid_from && item.valid_from > today) return false;
      if (item.valid_to && item.valid_to < today) return false;
      return true;
    });

    return json(res, 200, { offers: filtered });
  } catch (err) {
    return error(res, err.status || 500, err.message || 'Failed to load offers', err.details);
  }
};

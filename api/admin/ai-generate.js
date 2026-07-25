const { json, error, methodNotAllowed, readJson } = require('../_lib/http');
const { requireAdmin } = require('../_lib/auth');
const { supabaseRequest } = require('../_lib/supabase');
const { OPENAI_API_KEY, AI_MODEL } = require('../_lib/config');
const { requireString } = require('../_lib/validation');

module.exports = async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  try {
    const body = await readJson(req);
    const type = requireString(body.type, 'type', { max: 60 });
    const context = requireString(body.context, 'context', { min: 5, max: 6000 });
    const language = requireString(body.language || 'el', 'language', { max: 20 });
    const tone = requireString(body.tone || 'friendly', 'tone', { max: 40 });

    if (!OPENAI_API_KEY) {
      return error(res, 503, 'AI provider is not configured. Set OPENAI_API_KEY on the backend.');
    }

    const prompt = `You are an assistant for a hotel owner. Generate ${type} text in ${language} with ${tone} tone. Context:\n${context}`;

    const aiRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + OPENAI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: AI_MODEL, input: prompt }),
    });

    const aiData = await aiRes.json();
    if (!aiRes.ok) {
      return error(res, aiRes.status, aiData?.error?.message || 'AI request failed');
    }

    const output = aiData.output_text || aiData.output?.[0]?.content?.[0]?.text || '';

    await supabaseRequest('ai_drafts', {
      method: 'POST',
      body: {
        content_type: type,
        context,
        language,
        tone,
        output_text: output,
        created_by: admin.email,
      },
    });

    return json(res, 200, { text: output });
  } catch (err) {
    return error(res, err.status || 500, err.message || 'AI generation failed', err.details);
  }
};

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = require('./config');

function assertConfigured() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const error = new Error('Supabase is not configured');
    error.status = 503;
    throw error;
  }
}

function buildUrl(path, query = {}) {
  const base = SUPABASE_URL.replace(/\/$/, '');
  const url = new URL(`${base}/rest/v1/${path.replace(/^\//, '')}`);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

async function supabaseRequest(path, { method = 'GET', query, body, prefer } = {}) {
  assertConfigured();

  const headers = {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY,
  };

  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (prefer) headers.Prefer = prefer;

  const response = await fetch(buildUrl(path, query), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const err = new Error(payload?.message || 'Supabase request failed');
    err.status = response.status;
    err.details = payload;
    throw err;
  }

  return payload;
}

module.exports = {
  supabaseRequest,
};

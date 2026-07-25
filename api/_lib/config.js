function parseOwnerEmails() {
  return (process.env.ADMIN_OWNER_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function parseCredentials() {
  const raw = process.env.ADMIN_CREDENTIALS_JSON || '[]';
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && item.email && (item.password || item.password_scrypt))
      .map((item) => ({
        email: String(item.email).trim().toLowerCase(),
        password: item.password ? String(item.password) : null,
        password_scrypt: item.password_scrypt ? String(item.password_scrypt) : null,
      }));
  } catch {
    return [];
  }
}

module.exports = {
  SESSION_COOKIE_NAME: 'admin_session',
  SESSION_MAX_AGE_SECONDS: 60 * 60 * 8,
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  AI_MODEL: process.env.AI_MODEL || 'gpt-4o-mini',
  META_APP_ID: process.env.META_APP_ID || '',
  META_APP_SECRET: process.env.META_APP_SECRET || '',
  META_INSTAGRAM_ACCOUNT_ID: process.env.META_INSTAGRAM_ACCOUNT_ID || '',
  META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN || '',
  OWNER_EMAILS: parseOwnerEmails(),
  ADMIN_CREDENTIALS: parseCredentials(),
};

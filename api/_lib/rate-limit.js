const crypto = require('crypto');
const { supabaseRequest } = require('./supabase');

function hashIp(ip) {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

async function enforceRateLimit({ ip, action, windowMinutes, maxAttempts }) {
  const ipHash = hashIp(ip || 'unknown');
  const since = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();
  const retentionCutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  await supabaseRequest('submission_events', {
    method: 'DELETE',
    query: {
      action: `eq.${action}`,
      created_at: `lt.${retentionCutoff}`,
    },
  });

  const rows = await supabaseRequest('submission_events', {
    method: 'GET',
    query: {
      select: 'id',
      ip_hash: `eq.${ipHash}`,
      action: `eq.${action}`,
      created_at: `gte.${since}`,
    },
  });

  if (Array.isArray(rows) && rows.length >= maxAttempts) {
    const error = new Error('Too many requests. Please try again later.');
    error.status = 429;
    throw error;
  }

  await supabaseRequest('submission_events', {
    method: 'POST',
    body: { ip_hash: ipHash, action },
  });
}

module.exports = {
  enforceRateLimit,
};

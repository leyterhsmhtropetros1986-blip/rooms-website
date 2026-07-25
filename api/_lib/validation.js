function requireString(value, field, { min = 1, max = 500 } = {}) {
  if (typeof value !== 'string') throw new Error(`${field} must be a string`);
  const trimmed = value.trim();
  if (trimmed.length < min) throw new Error(`${field} is required`);
  if (trimmed.length > max) throw new Error(`${field} is too long`);
  return trimmed;
}

function optionalString(value, field, { max = 5000 } = {}) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') throw new Error(`${field} must be a string`);
  const trimmed = value.trim();
  if (trimmed.length > max) throw new Error(`${field} is too long`);
  return trimmed;
}

function requireEmail(value) {
  const email = requireString(value, 'email', { min: 3, max: 120 }).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('email is invalid');
  }
  return email;
}

function requireDate(value, field) {
  const date = requireString(value, field, { min: 10, max: 10 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`${field} must be YYYY-MM-DD`);
  return date;
}

function requireInteger(value, field, { min = 0, max = 1000 } = {}) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) throw new Error(`${field} must be an integer`);
  if (parsed < min || parsed > max) throw new Error(`${field} must be between ${min} and ${max}`);
  return parsed;
}

module.exports = {
  requireString,
  optionalString,
  requireEmail,
  requireDate,
  requireInteger,
};

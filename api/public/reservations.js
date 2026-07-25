const { json, error, methodNotAllowed, readJson, getClientIp } = require('../_lib/http');
const { supabaseRequest } = require('../_lib/supabase');
const { enforceRateLimit } = require('../_lib/rate-limit');
const { requireString, optionalString, requireEmail, requireDate, requireInteger } = require('../_lib/validation');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  try {
    const body = await readJson(req);
    await enforceRateLimit({
      ip: getClientIp(req),
      action: 'public_reservation_submit',
      windowMinutes: 10,
      maxAttempts: 8,
    });

    const arrivalDate = requireDate(body.arrival_date, 'arrival_date');
    const departureDate = requireDate(body.departure_date, 'departure_date');
    if (departureDate <= arrivalDate) return error(res, 400, 'departure_date must be after arrival_date');

    const payload = {
      guest_name: requireString(body.guest_name, 'guest_name', { max: 120 }),
      email: requireEmail(body.email),
      phone: requireString(body.phone, 'phone', { max: 40 }),
      arrival_date: arrivalDate,
      departure_date: departureDate,
      guests: requireInteger(body.guests, 'guests', { min: 1, max: 12 }),
      room: requireString(body.room, 'room', { max: 120 }),
      booking_source: requireString(body.booking_source || 'website', 'booking_source', { max: 40 }),
      status: 'pending',
      notes: optionalString(body.notes, 'notes', { max: 4000 }),
    };

    const created = await supabaseRequest('reservations', {
      method: 'POST',
      body: payload,
      query: { select: 'id,created_at' },
      prefer: 'return=representation',
    });

    return json(res, 201, { ok: true, reservation: Array.isArray(created) ? created[0] : created });
  } catch (err) {
    return error(res, err.status || 500, err.message || 'Failed to create reservation', err.details);
  }
};

const { json, error, methodNotAllowed, readJson } = require('../_lib/http');
const { requireAdmin } = require('../_lib/auth');
const { supabaseRequest } = require('../_lib/supabase');
const { requireString, optionalString, requireEmail, requireDate, requireInteger } = require('../_lib/validation');

function normalizeReservation(input) {
  const arrivalDate = requireDate(input.arrival_date, 'arrival_date');
  const departureDate = requireDate(input.departure_date, 'departure_date');
  if (departureDate <= arrivalDate) throw new Error('departure_date must be after arrival_date');

  return {
    guest_name: requireString(input.guest_name, 'guest_name', { max: 120 }),
    email: requireEmail(input.email),
    phone: requireString(input.phone, 'phone', { max: 40 }),
    arrival_date: arrivalDate,
    departure_date: departureDate,
    guests: requireInteger(input.guests, 'guests', { min: 1, max: 12 }),
    room: requireString(input.room, 'room', { max: 120 }),
    booking_source: requireString(input.booking_source || 'website', 'booking_source', { max: 40 }),
    status: requireString(input.status || 'pending', 'status', { max: 40 }),
    notes: optionalString(input.notes, 'notes', { max: 4000 }),
  };
}

module.exports = async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    if (req.method === 'GET') {
      const url = new URL(req.url, 'http://localhost');
      const search = url.searchParams.get('search');
      const status = url.searchParams.get('status');

      const query = {
        select: 'id,guest_name,email,phone,arrival_date,departure_date,guests,room,booking_source,status,notes,created_at,updated_at',
        order: 'arrival_date.asc',
        limit: '300',
      };
      if (status && status !== 'all') query.status = `eq.${status}`;
      if (search) query.or = `(guest_name.ilike.*${search}*,email.ilike.*${search}*,phone.ilike.*${search}*,room.ilike.*${search}*)`;

      const rows = await supabaseRequest('reservations', { method: 'GET', query });
      return json(res, 200, { reservations: rows || [] });
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      const payload = normalizeReservation(body);
      const created = await supabaseRequest('reservations', {
        method: 'POST',
        body: payload,
        query: { select: '*' },
        prefer: 'return=representation',
      });
      return json(res, 201, { reservation: Array.isArray(created) ? created[0] : created });
    }

    if (req.method === 'PATCH') {
      const body = await readJson(req);
      const id = requireString(body.id, 'id', { max: 100 });
      const payload = normalizeReservation(body);
      payload.updated_at = new Date().toISOString();

      const updated = await supabaseRequest('reservations', {
        method: 'PATCH',
        query: { id: `eq.${id}`, select: '*' },
        body: payload,
        prefer: 'return=representation',
      });

      return json(res, 200, { reservation: Array.isArray(updated) ? updated[0] : updated });
    }

    if (req.method === 'DELETE') {
      const body = await readJson(req);
      const id = requireString(body.id, 'id', { max: 100 });
      await supabaseRequest('reservations', { method: 'DELETE', query: { id: `eq.${id}` } });
      return json(res, 200, { ok: true });
    }

    return methodNotAllowed(res, ['GET', 'POST', 'PATCH', 'DELETE']);
  } catch (err) {
    return error(res, err.status || 500, err.message || 'Reservation request failed', err.details);
  }
};

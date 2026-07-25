/* Booking form — validation, summary, and backend submission */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  const summary = document.getElementById('bookingSummary');
  const guestName = document.getElementById('guestName');
  const guestEmail = document.getElementById('guestEmail');
  const guestPhone = document.getElementById('guestPhone');
  const arrival = document.getElementById('arrivalDate');
  const departure = document.getElementById('departureDate');
  const adults = document.getElementById('adultGuests');
  const children = document.getElementById('childGuests');
  const roomType = document.getElementById('roomType');

  if (!form || !summary) return;

  const todayStr = new Date().toISOString().split('T')[0];
  arrival.min = todayStr;
  departure.min = todayStr;

  function nightsBetween(a, b) {
    return Math.round((new Date(b) - new Date(a)) / 86400000);
  }

  function updateSummary(message) {
    if (message) {
      summary.textContent = message;
      summary.dataset.empty = 'false';
      return;
    }

    const a = arrival.value;
    const d = departure.value;

    if (!a || !d) {
      summary.textContent = 'Επιλέξτε ημερομηνίες για να εμφανιστούν οι διανυκτερεύσεις.';
      summary.dataset.empty = 'true';
      return;
    }

    const nights = nightsBetween(a, d);
    if (nights <= 0) {
      summary.textContent = 'Η ημερομηνία αναχώρησης πρέπει να είναι μετά την άφιξη.';
      summary.dataset.empty = 'false';
      return;
    }

    const adultCount = parseInt(adults.value, 10);
    const childCount = parseInt(children.value, 10);
    const roomLabel = roomType.value;
    const nightLabel = nights === 1 ? '1 διανυκτέρευση' : `${nights} διανυκτερεύσεις`;
    const adultLabel = adultCount === 1 ? '1 ενήλικας' : `${adultCount} ενήλικες`;
    const childLabel = childCount > 0 ? ` · ${childCount} παιδί/παιδιά` : '';
    const roomSuffix = roomLabel !== 'Δεν έχω προτίμηση' ? ` · ${roomLabel}` : '';

    summary.textContent = `${nightLabel} · ${adultLabel}${childLabel}${roomSuffix}`;
    summary.dataset.empty = 'false';
  }

  arrival.addEventListener('change', () => {
    if (arrival.value) {
      const next = new Date(arrival.value);
      next.setDate(next.getDate() + 1);
      const nextStr = next.toISOString().split('T')[0];
      departure.min = nextStr;
      if (departure.value && departure.value <= arrival.value) departure.value = nextStr;
    }
    updateSummary();
  });

  [departure, adults, children, roomType].forEach((el) => el?.addEventListener('change', () => updateSummary()));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = guestName.value.trim();
    const email = guestEmail.value.trim();
    const phone = guestPhone.value.trim();
    const a = arrival.value;
    const d = departure.value;

    if (!name || !email || !phone || !a || !d) {
      updateSummary('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.');
      return;
    }

    const nights = nightsBetween(a, d);
    if (nights <= 0) {
      updateSummary('Η ημερομηνία αναχώρησης πρέπει να είναι μετά την άφιξη.');
      return;
    }

    const payload = {
      guest_name: name,
      email,
      phone,
      arrival_date: a,
      departure_date: d,
      guests: parseInt(adults.value, 10) + parseInt(children.value, 10),
      room: roomType.value,
      booking_source: 'website',
      notes: '',
    };

    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton ? submitButton.textContent : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Αποστολή...';
    }

    try {
      const response = await fetch('/api/public/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(data.error || 'Αποτυχία αποστολής');

      updateSummary('Το αίτημά σας καταχωρήθηκε. Θα επικοινωνήσουμε σύντομα μαζί σας.');
      form.reset();
    } catch (err) {
      updateSummary(`Δεν ήταν δυνατή η αποστολή: ${err.message}`);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
});

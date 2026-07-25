/* Booking form — date validation, summary, and WhatsApp submission */

document.addEventListener("DOMContentLoaded", () => {
  const form       = document.getElementById("bookingForm");
  const summary    = document.getElementById("bookingSummary");
  const arrival    = document.getElementById("arrivalDate");
  const departure  = document.getElementById("departureDate");
  const adults     = document.getElementById("adultGuests");
  const children   = document.getElementById("childGuests");
  const roomType   = document.getElementById("roomType");

  if (!form) return;

  /* ── set min dates ────────────────────────────────────────── */
  const todayStr = new Date().toISOString().split("T")[0];
  arrival.min   = todayStr;
  departure.min = todayStr;

  /* ── helpers ──────────────────────────────────────────────── */

  function nightsBetween(a, b) {
    return Math.round((new Date(b) - new Date(a)) / 86400000);
  }

  function formatDate(iso) {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }

  /* ── update summary text ──────────────────────────────────── */

  function updateSummary() {
    const a = arrival.value;
    const d = departure.value;

    if (!a || !d) {
      summary.textContent = "Επιλέξτε ημερομηνίες για να εμφανιστούν οι διανυκτερεύσεις.";
      return;
    }

    const nights = nightsBetween(a, d);

    if (nights <= 0) {
      summary.textContent = "Η ημερομηνία αναχώρησης πρέπει να είναι μετά την άφιξη.";
      return;
    }

    const adultCount    = parseInt(adults.value, 10);
    const childCount    = parseInt(children.value, 10);
    const roomLabel     = roomType.value;
    const nightLabel    = nights === 1 ? "1 διανυκτέρευση" : `${nights} διανυκτερεύσεις`;
    const adultLabel    = adultCount === 1 ? "1 ενήλικας" : `${adultCount} ενήλικες`;
    const childLabel    = childCount > 0 ? ` · ${childCount} παιδί/παιδιά` : "";
    const roomSuffix    = roomLabel !== "Δεν έχω προτίμηση" ? ` · ${roomLabel}` : "";

    summary.textContent = `${nightLabel} · ${adultLabel}${childLabel}${roomSuffix}`;
  }

  /* ── keep departure min in sync with arrival ──────────────── */

  arrival.addEventListener("change", () => {
    if (arrival.value) {
      const next = new Date(arrival.value);
      next.setDate(next.getDate() + 1);
      const nextStr = next.toISOString().split("T")[0];
      departure.min = nextStr;
      if (departure.value && departure.value <= arrival.value) {
        departure.value = nextStr;
      }
    }
    updateSummary();
  });

  departure.addEventListener("change", updateSummary);
  adults.addEventListener("change", updateSummary);
  children.addEventListener("change", updateSummary);
  roomType.addEventListener("change", updateSummary);

  /* ── form submit → WhatsApp ───────────────────────────────── */

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const a = arrival.value;
    const d = departure.value;

    if (!a || !d) {
      summary.textContent = "Παρακαλώ επιλέξτε ημερομηνίες άφιξης και αναχώρησης.";
      arrival.focus();
      return;
    }

    const nights = nightsBetween(a, d);

    if (nights <= 0) {
      summary.textContent = "Η ημερομηνία αναχώρησης πρέπει να είναι μετά την άφιξη.";
      departure.focus();
      return;
    }

    const adultCount = parseInt(adults.value, 10);
    const childCount = parseInt(children.value, 10);
    const roomLabel  = roomType.value;

    let msg = "Καλησπέρα! Θα ήθελα να ελέγξω διαθεσιμότητα:\n";
    msg += `📅 Άφιξη: ${formatDate(a)}\n`;
    msg += `📅 Αναχώρηση: ${formatDate(d)}\n`;
    msg += `🌙 Διανυκτερεύσεις: ${nights}\n`;
    msg += `👥 Ενήλικες: ${adultCount}\n`;
    if (childCount > 0)                           msg += `👶 Παιδιά: ${childCount}\n`;
    if (roomLabel !== "Δεν έχω προτίμηση")        msg += `🛏️ Δωμάτιο: ${roomLabel}\n`;

    const waURL = `https://wa.me/306936960328?text=${encodeURIComponent(msg)}`;
    window.open(waURL, "_blank", "noopener,noreferrer");
  });
});

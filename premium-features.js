/* Booking form: night counter + WhatsApp submission */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "306936960328";

  var form       = document.getElementById("bookingForm");
  var arrival    = document.getElementById("arrivalDate");
  var departure  = document.getElementById("departureDate");
  var summary    = document.getElementById("bookingSummary");

  if (!form || !arrival || !departure || !summary) return;

  /* ── Set minimum dates ─────────────────────────────────────────── */
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var todayStr = today.toISOString().slice(0, 10);
  arrival.min   = todayStr;
  departure.min = todayStr;

  /* ── Update the night-count summary ────────────────────────────── */
  function updateSummary() {
    if (!arrival.value || !departure.value) {
      summary.textContent = "Επιλέξτε ημερομηνίες για να εμφανιστούν οι διανυκτερεύσεις.";
      return;
    }

    var a = new Date(arrival.value);
    var d = new Date(departure.value);
    var nights = Math.round((d - a) / 86400000);

    if (nights <= 0) {
      summary.textContent = "Η ημερομηνία αναχώρησης πρέπει να είναι μετά την άφιξη.";
      summary.style.color = "#b94040";
      return;
    }

    summary.style.color = "";
    summary.textContent =
      nights === 1
        ? "1 διανυκτέρευση επιλεγμένη."
        : nights + " διανυκτερεύσεις επιλεγμένες.";
  }

  arrival.addEventListener("change", function () {
    /* Push departure min forward so it can't be before or same as arrival */
    if (arrival.value) {
      var next = new Date(arrival.value);
      next.setDate(next.getDate() + 1);
      departure.min = next.toISOString().slice(0, 10);

      /* Reset departure if it is now invalid */
      if (departure.value && departure.value <= arrival.value) {
        departure.value = "";
      }
    }
    updateSummary();
  });

  departure.addEventListener("change", updateSummary);

  /* ── Form submission → WhatsApp message ────────────────────────── */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!arrival.value || !departure.value) {
      summary.textContent = "Παρακαλούμε επιλέξτε ημερομηνίες άφιξης και αναχώρησης.";
      summary.style.color = "#b94040";
      arrival.focus();
      return;
    }

    var a      = new Date(arrival.value);
    var d      = new Date(departure.value);
    var nights = Math.round((d - a) / 86400000);

    if (nights <= 0) {
      summary.textContent = "Η ημερομηνία αναχώρησης πρέπει να είναι μετά την άφιξη.";
      summary.style.color = "#b94040";
      departure.focus();
      return;
    }

    summary.style.color = "";

    var adults   = document.getElementById("adultGuests");
    var children = document.getElementById("childGuests");
    var room     = document.getElementById("roomType");

    var fmtDate = function (iso) {
      var parts = iso.split("-");
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    };

    var lines = [
      "Καλησπέρα! Θα ήθελα να ρωτήσω για διαθεσιμότητα.",
      "",
      "📅 Άφιξη: "        + fmtDate(arrival.value),
      "📅 Αναχώρηση: "    + fmtDate(departure.value),
      "🌙 Διανυκτερεύσεις: " + nights,
      "👤 Ενήλικες: "      + (adults   ? adults.value   : "—"),
      "👶 Παιδιά: "        + (children ? children.value : "—"),
      "🛏️ Δωμάτιο: "      + (room     ? room.value     : "—"),
    ];

    var message = encodeURIComponent(lines.join("\n"));
    var url     = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message;

    window.open(url, "_blank", "noopener,noreferrer");
  });
})();

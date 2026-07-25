/* Booking form: night counter + WhatsApp submission */
(function () {
  "use strict";

  var WHATSAPP_NUMBER =
    (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.contact && SITE_CONFIG.contact.whatsapp)
      ? SITE_CONFIG.contact.whatsapp
      : "306936960328";
  var MS_PER_DAY      = 86400000;

  var form       = document.getElementById("bookingForm");
  var arrival    = document.getElementById("arrivalDate");
  var departure  = document.getElementById("departureDate");
  var summary    = document.getElementById("bookingSummary");

  if (!form || !arrival || !departure || !summary) return;

  function lang() {
    return document.documentElement.getAttribute("lang") === "en" ? "en" : "el";
  }

  var STRINGS = {
    selectDates:            { el: "Επιλέξτε ημερομηνίες για να εμφανιστούν οι διανυκτερεύσεις.", en: "Select dates to see the number of nights." },
    departureAfterArrival:  { el: "Η ημερομηνία αναχώρησης πρέπει να είναι μετά την άφιξη.", en: "The departure date must be after the arrival date." },
    oneNight:               { el: "1 διανυκτέρευση επιλεγμένη.", en: "1 night selected." },
    nightsSuffix:           { el: " διανυκτερεύσεις επιλεγμένες.", en: " nights selected." },
    selectBothDates:        { el: "Παρακαλούμε επιλέξτε ημερομηνίες άφιξης και αναχώρησης.", en: "Please select arrival and departure dates." },
    greeting:               { el: "Καλησπέρα! Θα ήθελα να ρωτήσω για διαθεσιμότητα.", en: "Hello! I would like to ask about availability." },
    arrivalLabel:           { el: "📅 Άφιξη: ", en: "📅 Arrival: " },
    departureLabel:         { el: "📅 Αναχώρηση: ", en: "📅 Departure: " },
    nightsLabel:            { el: "🌙 Διανυκτερεύσεις: ", en: "🌙 Nights: " },
    adultsLabel:            { el: "👤 Ενήλικες: ", en: "👤 Adults: " },
    childrenLabel:          { el: "👶 Παιδιά: ", en: "👶 Children: " },
    roomLabel:              { el: "🛏️ Δωμάτιο: ", en: "🛏️ Room: " },
  };

  function t(key) {
    return STRINGS[key][lang()];
  }

  /* ── Set minimum dates ─────────────────────────────────────────── */
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var todayStr = today.toISOString().slice(0, 10);
  arrival.min   = todayStr;
  departure.min = todayStr;

  /* ── Update the night-count summary ────────────────────────────── */
  function updateSummary() {
    if (!arrival.value || !departure.value) {
      summary.textContent = t("selectDates");
      return;
    }

    var a = new Date(arrival.value);
    var d = new Date(departure.value);
    var nights = Math.round((d - a) / MS_PER_DAY);

    if (nights <= 0) {
      summary.textContent = t("departureAfterArrival");
      summary.style.color = "#b94040";
      return;
    }

    summary.style.color = "";
    summary.textContent =
      nights === 1
        ? t("oneNight")
        : nights + t("nightsSuffix");
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

  /* ── Format ISO date string (YYYY-MM-DD) as DD/MM/YYYY ─────────── */
  function fmtDate(iso) {
    var parts = iso ? iso.split("-") : [];
    if (parts.length !== 3) return iso;
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  }

  /* ── Form submission → WhatsApp message ────────────────────────── */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!arrival.value || !departure.value) {
      summary.textContent = t("selectBothDates");
      summary.style.color = "#b94040";
      arrival.focus();
      return;
    }

    var a      = new Date(arrival.value);
    var d      = new Date(departure.value);
    var nights = Math.round((d - a) / MS_PER_DAY);

    if (nights <= 0) {
      summary.textContent = t("departureAfterArrival");
      summary.style.color = "#b94040";
      departure.focus();
      return;
    }

    summary.style.color = "";

    var adults   = document.getElementById("adultGuests");
    var children = document.getElementById("childGuests");
    var room     = document.getElementById("roomType");

    var lines = [
      t("greeting"),
      "",
      t("arrivalLabel")   + fmtDate(arrival.value),
      t("departureLabel") + fmtDate(departure.value),
      t("nightsLabel")    + nights,
      t("adultsLabel")    + (adults   ? adults.value   : "—"),
      t("childrenLabel")  + (children ? children.value : "—"),
      t("roomLabel")      + (room     ? room.value     : "—"),
    ];

    var message = encodeURIComponent(lines.join("\n"));
    var url     = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message;

    window.open(url, "_blank", "noopener,noreferrer");
  });
})();

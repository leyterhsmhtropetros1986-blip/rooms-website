/* Booking form: night counter + email submission via /api/send-booking */
(function () {
  "use strict";

  var MS_PER_DAY = 86400000;

  var form         = document.getElementById("bookingForm");
  var arrival      = document.getElementById("arrivalDate");
  var departure    = document.getElementById("departureDate");
  var summary      = document.getElementById("bookingSummary");
  var submitBtn    = document.getElementById("bookingSubmit");
  var continueBtn  = document.getElementById("bookingContinue");
  var step2        = document.getElementById("bookingStep2");
  var nameField    = document.getElementById("guestName");
  var emailField   = document.getElementById("guestEmail");
  var phoneField   = document.getElementById("guestPhone");

  if (!form || !arrival || !departure || !summary || !submitBtn) return;

  function lang() {
    return document.documentElement.getAttribute("lang") === "en" ? "en" : "el";
  }

  var STRINGS = {
    selectDates:           { el: "Επιλέξτε ημερομηνίες για να εμφανιστούν οι διανυκτερεύσεις.", en: "Select dates to see the number of nights." },
    departureAfterArrival: { el: "Η ημερομηνία αναχώρησης πρέπει να είναι μετά την άφιξη.", en: "The departure date must be after the arrival date." },
    oneNight:              { el: "1 διανυκτέρευση επιλεγμένη.", en: "1 night selected." },
    nightsSuffix:          { el: " διανυκτερεύσεις επιλεγμένες.", en: " nights selected." },
    selectBothDates:       { el: "Παρακαλούμε επιλέξτε ημερομηνίες άφιξης και αναχώρησης.", en: "Please select arrival and departure dates." },
    missingFields:         { el: "Συμπληρώστε ονοματεπώνυμο, email και τηλέφωνο.", en: "Please fill in your name, email and phone." },
    invalidEmail:          { el: "Το email δεν φαίνεται έγκυρο.", en: "That email address doesn't look valid." },
    sending:                { el: "Αποστολή...", en: "Sending..." },
    success:                { el: "Το αίτημά σας στάλθηκε επιτυχώς. Θα επικοινωνήσουμε σύντομα μαζί σας.", en: "Your request has been sent successfully. We'll be in touch shortly." },
    genericError:           { el: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή επικοινωνήστε μαζί μας τηλεφωνικά.", en: "Something went wrong. Please try again or call us directly." },
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
      summary.style.color = "";
      return;
    }

    var a = new Date(arrival.value);
    var d = new Date(departure.value);
    var nights = Math.round((d - a) / MS_PER_DAY);

    if (nights <= 0) {
      summary.textContent = t("departureAfterArrival");
      summary.style.color = "#e08080";
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

  function showStatus(text, isError) {
    summary.textContent = text;
    summary.style.color = isError ? "#e08080" : "";
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  /* ── Step 1 → Step 2: reveal the contact-details fields ─────────── */
  function datesAreValid() {
    if (!arrival.value || !departure.value) {
      showStatus(t("selectBothDates"), true);
      arrival.focus();
      return false;
    }
    var nights = Math.round((new Date(departure.value) - new Date(arrival.value)) / MS_PER_DAY);
    if (nights <= 0) {
      showStatus(t("departureAfterArrival"), true);
      departure.focus();
      return false;
    }
    return true;
  }

  if (continueBtn && step2) {
    continueBtn.addEventListener("click", function () {
      if (!datesAreValid()) return;

      if (step2.hasAttribute("hidden")) {
        step2.removeAttribute("hidden");
        /* One frame between un-hiding and adding the class that
           animates max-height, so the transition actually runs
           instead of jumping straight to its end state. */
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            step2.classList.add("is-open");
          });
        });
      }

      updateSummary();
      if (nameField) setTimeout(function () { nameField.focus(); }, 300);
    });
  }

  var isSubmitting = false;

  /* ── Form submission → POST /api/send-booking ────────────────────
     Sends the guest's request as a real email via a server-side
     API route. No WhatsApp involved anywhere in this flow. */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isSubmitting) return; // guards against double-clicks

    if (!datesAreValid()) return;

    var nights = Math.round((new Date(departure.value) - new Date(arrival.value)) / MS_PER_DAY);

    var name  = nameField  ? nameField.value.trim()  : "";
    var email = emailField ? emailField.value.trim() : "";
    var phone = phoneField ? phoneField.value.trim() : "";

    if (!name || !email || !phone) {
      showStatus(t("missingFields"), true);
      (nameField && !name ? nameField : emailField && !email ? emailField : phoneField).focus();
      return;
    }

    if (!isValidEmail(email)) {
      showStatus(t("invalidEmail"), true);
      emailField.focus();
      return;
    }

    var adults   = document.getElementById("adultGuests");
    var children = document.getElementById("childGuests");
    var room     = document.getElementById("roomType");
    var message  = document.getElementById("guestMessage");

    var payload = {
      name:      name,
      email:     email,
      phone:     phone,
      arrival:   fmtDate(arrival.value),
      departure: fmtDate(departure.value),
      nights:    nights,
      adults:    adults   ? adults.value   : "",
      children:  children ? children.value : "",
      room:      room     ? room.value     : "",
      message:   message  ? message.value.trim() : "",
      lang:      lang(),
    };

    isSubmitting = true;
    submitBtn.disabled = true;
    var originalLabel = submitBtn.textContent;
    submitBtn.textContent = t("sending");
    showStatus(t("sending"), false);

    fetch("/api/send-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok) throw new Error((data && data.error) || "request_failed");
          return data;
        });
      })
      .then(function () {
        showStatus(t("success"), false);
        form.reset();
        updateSummary();
        submitBtn.textContent = originalLabel;
        submitBtn.disabled = false;
        isSubmitting = false;
      })
      .catch(function () {
        showStatus(t("genericError"), true);
        submitBtn.textContent = originalLabel;
        submitBtn.disabled = false;
        isSubmitting = false;
      });
  });
})();

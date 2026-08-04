/**
 * ASTERIA APARTMENTS — Review Submission Form
 * =============================================
 * Handles client-side validation and submission.
 *
 * MODERATION POLICY
 * ─────────────────
 * Reviews are NEVER published automatically.
 * Every submission must be approved by the owner via the admin dashboard.
 *
 * CURRENT SUBMISSION FLOW (frontend-only / no backend)
 * ─────────────────────────────────────────────────────
 * 1. Validates all required fields.
 * 2. Opens a mailto: link as a temporary bridge so the owner
 *    receives the review by email and can paste it manually.
 * 3. Shows a pending-approval message to the guest.
 *
 * PRODUCTION BACKEND REQUIREMENTS
 * ────────────────────────────────
 * Replace the mailto fallback in submitReview() with:
 *
 *   POST /api/reviews
 *   Content-Type: application/json
 *   Body: { name, email, rating, stayDate, review }
 *
 * Expected response:
 *   201 Created → { id, status: "pending" }
 *   400 Bad Request → { error: "..." }
 *
 * Database schema (Supabase / PostgreSQL):
 *   reviews (
 *     id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *     name        TEXT NOT NULL,
 *     email       TEXT,
 *     rating      SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
 *     stay_date   DATE,
 *     review      TEXT NOT NULL,
 *     status      TEXT NOT NULL DEFAULT 'pending'
 *                   CHECK (status IN ('pending','approved','rejected')),
 *     created_at  TIMESTAMPTZ DEFAULT now()
 *   );
 *
 * Admin approval endpoint:
 *   PATCH /api/reviews/:id  Body: { status: "approved" | "rejected" }
 *   (protected — requires admin session token)
 */

(function () {
  "use strict";

  var form    = document.getElementById("reviewForm");
  var message = document.getElementById("reviewFormMessage");

  if (!form) return;

  function lang() {
    return document.documentElement.getAttribute("lang") === "en" ? "en" : "el";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearMessage();

    /* ── Gather values ── */
    var name      = getValue("reviewName");
    var email     = getValue("reviewEmail");
    var stayDate  = getValue("reviewStayDate");
    var reviewTxt = getValue("reviewText");
    var consent   = document.getElementById("reviewConsent");
    var ratingEl  = form.querySelector('input[name="rating"]:checked');

    /* ── Validate ── */
    if (!name) {
      return showError(lang() === "en" ? "Please enter your name." : "Παρακαλούμε συμπληρώστε το όνομά σας.");
    }
    if (!ratingEl) {
      return showError(lang() === "en" ? "Please select a star rating." : "Παρακαλούμε επιλέξτε βαθμολογία (αστέρια).");
    }
    if (!reviewTxt || reviewTxt.length < 30) {
      return showError(lang() === "en" ? "Your review must be at least 30 characters long." : "Η κριτική πρέπει να περιέχει τουλάχιστον 30 χαρακτήρες.");
    }
    if (!consent || !consent.checked) {
      return showError(lang() === "en" ? "Please accept the privacy policy." : "Παρακαλούμε αποδεχτείτε την πολιτική απορρήτου.");
    }

    /* ── Submit ── */
    submitReview({
      name:      name,
      email:     email,
      rating:    ratingEl.value,
      stayDate:  stayDate,
      review:    reviewTxt,
    });
  });

  /* ──────────────────────────────────────────────────────────────
     submitReview — swap the mailto fallback for a real API call
     once the backend is ready.
  ────────────────────────────────────────────────────────────── */
  function submitReview(data) {
    /*
     * TODO: Replace this block with a fetch() call when backend is ready:
     *
     * fetch("/api/reviews", {
     *   method: "POST",
     *   headers: { "Content-Type": "application/json" },
     *   body: JSON.stringify(data),
     * })
     *   .then(function (res) { return res.json(); })
     *   .then(function ()    { showSuccess(); form.reset(); })
     *   .catch(function ()   { showError("Παρουσιάστηκε σφάλμα. Δοκιμάστε ξανά."); });
     */

    /* ── Mailto fallback (frontend-only mode) ── */
    var subject = encodeURIComponent("Νέα κριτική από " + data.name);
    var body    = encodeURIComponent(
      "Όνομα: "        + data.name       + "\n" +
      "Email: "        + (data.email || "—") + "\n" +
      "Βαθμολογία: "   + data.rating     + "/5\n" +
      "Ημερομηνία: "   + (data.stayDate || "—") + "\n\n" +
      "Κριτική:\n"     + data.review
    );

    var ownerEmail =
      (typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.contact && SITE_CONFIG.contact.email)
        ? SITE_CONFIG.contact.email
        : "info@asteriaapartments.gr";

    window.location.href =
      "mailto:" + ownerEmail + "?subject=" + subject + "&body=" + body;

    /* Show success state immediately — owner will receive the email */
    showSuccess();
    form.reset();
  }

  /* ── Helpers ── */
  function getValue(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function clearMessage() {
    if (!message) return;
    message.textContent = "";
    message.className   = "form-message";
  }

  function showError(text) {
    if (!message) return;
    message.textContent = "⚠️ " + text;
    message.className   = "form-message is-error";
    message.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showSuccess() {
    if (!message) return;
    message.innerHTML = lang() === "en"
      ? "✅ <strong>Thank you!</strong> Your review has been received and will be checked by the owner before publishing."
      : "✅ <strong>Ευχαριστούμε!</strong> Η κριτική σας ελήφθη και θα εξεταστεί από τον διαχειριστή πριν δημοσιευθεί.";
    message.className = "form-message is-success";
    message.scrollIntoView({ behavior: "smooth", block: "center" });
  }

})();

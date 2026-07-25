/**
 * Review Form Handler
 * ====================
 * Handles the guest review submission form.
 *
 * Current behaviour (frontend-only):
 *   - Validates name, star rating, and review text.
 *   - On submit, opens a mailto: link so the review is sent to the
 *     property email address as a temporary measure.
 *   - Hides the form and shows a success message.
 *
 * BACKEND WORK REQUIRED:
 *   To properly handle review submissions you need:
 *     1. A server-side endpoint (e.g. POST /api/reviews) that stores the
 *        review in a database with status = "pending".
 *     2. An admin interface to approve or reject pending reviews
 *        (see admin/index.html).
 *     3. Replace the mailto fallback below with a fetch() call to that
 *        endpoint and remove REVIEW_RECIPIENT_EMAIL.
 *
 * Environment variable needed (backend):
 *   REVIEW_RECIPIENT_EMAIL — the email address that receives raw review
 *   submissions until a database is set up.
 */

/* Temporary fallback: email address that receives review submissions.
   Replace with a real backend endpoint as documented above. */
var REVIEW_RECIPIENT_EMAIL = "info@example.gr";

document.addEventListener("DOMContentLoaded", function () {
  var form    = document.getElementById("reviewForm");
  var success = document.getElementById("reviewSuccess");

  if (!form) return;

  /* ── Validation helpers ─────────────────────────────────── */

  function getSelectedRating() {
    var checked = form.querySelector("input[name='rating']:checked");
    return checked ? parseInt(checked.value, 10) : 0;
  }

  function showError(field, message) {
    field.setCustomValidity(message);
    field.reportValidity();
    field.setCustomValidity("");
  }

  /* ── Form submit ────────────────────────────────────────── */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var nameField   = document.getElementById("reviewName");
    var reviewField = document.getElementById("reviewText");
    var rating      = getSelectedRating();

    /* Validate name */
    if (!nameField.value.trim()) {
      showError(nameField, "Παρακαλώ συμπληρώστε το όνομά σας.");
      nameField.focus();
      return;
    }

    /* Validate rating */
    if (rating === 0) {
      var firstStar = form.querySelector("input[name='rating']");
      firstStar.setCustomValidity("Παρακαλώ επιλέξτε βαθμολογία.");
      firstStar.reportValidity();
      firstStar.setCustomValidity("");
      return;
    }

    /* Validate review text */
    if (!reviewField.value.trim()) {
      showError(reviewField, "Παρακαλώ γράψτε την κριτική σας.");
      reviewField.focus();
      return;
    }

    /* Build star string for the email subject */
    var stars = "";
    for (var i = 0; i < rating; i++) stars += "★";

    var subject = encodeURIComponent(
      "Νέα κριτική (" + stars + ") — " + nameField.value.trim()
    );

    var body = encodeURIComponent(
      "Όνομα: " + nameField.value.trim() + "\n" +
      "Βαθμολογία: " + rating + "/5 " + stars + "\n\n" +
      "Κριτική:\n" + reviewField.value.trim() + "\n\n" +
      "---\n" +
      "Αυτή η κριτική υποβλήθηκε μέσω της φόρμας στη σελίδα και\n" +
      "χρειάζεται έγκριση πριν δημοσιευτεί.\n" +
      "TODO: Αντικαταστήστε αυτό το mailto με κλήση API endpoint."
    );

    /* Open mail client (temporary — replace with fetch() to backend) */
    window.location.href =
      "mailto:" + REVIEW_RECIPIENT_EMAIL +
      "?subject=" + subject +
      "&body=" + body;

    /* Show success state immediately */
    form.hidden = true;
    success.hidden = false;
    success.focus();

    /* Also hide the notice */
    var notice = form.closest(".review-form-wrapper").querySelector(".review-form-notice");
    if (notice) notice.hidden = true;
  });
});

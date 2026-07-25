/**
 * Review form + approved reviews rendering
 */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reviewForm');
  const success = document.getElementById('reviewSuccess');
  const approvedList = document.getElementById('approvedReviewsList');

  function renderApprovedReviews(items) {
    if (!approvedList) return;
    if (!items.length) {
      approvedList.innerHTML = '';
      return;
    }

    approvedList.innerHTML =
      '<h3 style="margin-bottom:10px; font-size:1rem;">Εγκεκριμένες κριτικές</h3>' +
      items.map(function (item) {
        return (
          '<article style="padding:12px; border:1px solid #ddd; border-radius:10px; margin-bottom:10px; background:#fff;">' +
            '<strong>' + item.guest_name + '</strong> ' +
            '<span aria-label="rating">' + '★'.repeat(Math.max(1, Number(item.rating) || 1)) + '</span>' +
            '<p style="margin-top:8px;">' + item.review_text + '</p>' +
          '</article>'
        );
      }).join('');
  }

  async function loadApprovedReviews() {
    try {
      const response = await fetch('/api/public/reviews');
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return;
      renderApprovedReviews(data.reviews || []);
    } catch (_) {
      /* ignore public fetch errors */
    }
  }

  loadApprovedReviews();

  if (!form || !success) return;

  function getSelectedRating() {
    const checked = form.querySelector("input[name='rating']:checked");
    return checked ? parseInt(checked.value, 10) : 0;
  }

  function showError(field, message) {
    field.setCustomValidity(message);
    field.reportValidity();
    field.setCustomValidity('');
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nameField = document.getElementById('reviewName');
    const reviewField = document.getElementById('reviewText');
    const websiteField = document.getElementById('reviewWebsite');
    const rating = getSelectedRating();

    if (!nameField.value.trim()) {
      showError(nameField, 'Παρακαλώ συμπληρώστε το όνομά σας.');
      nameField.focus();
      return;
    }

    if (rating === 0) {
      const firstStar = form.querySelector("input[name='rating']");
      firstStar.setCustomValidity('Παρακαλώ επιλέξτε βαθμολογία.');
      firstStar.reportValidity();
      firstStar.setCustomValidity('');
      return;
    }

    if (!reviewField.value.trim()) {
      showError(reviewField, 'Παρακαλώ γράψτε την κριτική σας.');
      reviewField.focus();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton ? submitButton.textContent : '';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Υποβολή...';
    }

    try {
      const response = await fetch('/api/public/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_name: nameField.value.trim(),
          rating,
          review_text: reviewField.value.trim(),
          website: websiteField ? websiteField.value : '',
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Αποτυχία υποβολής');
      }

      form.hidden = true;
      success.hidden = false;
      success.focus();

      const notice = form.closest('.review-form-wrapper').querySelector('.review-form-notice');
      if (notice) notice.hidden = true;
    } catch (err) {
      alert(err.message || 'Αποτυχία υποβολής');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
});

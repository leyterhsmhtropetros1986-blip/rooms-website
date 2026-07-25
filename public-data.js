/* Public dynamic data: active offers */

document.addEventListener('DOMContentLoaded', function () {
  const offersGrid = document.getElementById('publicOffersGrid');
  const offersEmpty = document.getElementById('offersEmptyState');
  if (!offersGrid || !offersEmpty) return;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  fetch('/api/public/offers')
    .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) return;
      const offers = Array.isArray(data.offers) ? data.offers : [];

      if (offers.length === 0) {
        offersEmpty.hidden = false;
        offersGrid.hidden = true;
        offersGrid.innerHTML = '';
        return;
      }

      offersEmpty.hidden = true;
      offersGrid.hidden = false;
      offersGrid.innerHTML = offers.map((offer) => {
        const validity = [offer.valid_from, offer.valid_to].filter(Boolean).join(' έως ');
        const image = offer.image_url
          ? '<img src="' + escapeHtml(offer.image_url) + '" alt="' + escapeHtml(offer.title) + '" style="width:100%; border-radius:10px; margin-bottom:10px;">'
          : '';

        return (
          '<article class="offer-card">' +
            image +
            '<h3>' + escapeHtml(offer.title) + '</h3>' +
            '<p>' + escapeHtml(offer.description) + '</p>' +
            '<dl class="offer-meta">' +
              '<dt>Ισχύς</dt><dd>' + escapeHtml(validity || 'Χωρίς περιορισμό') + '</dd>' +
              '<dt>Όφελος</dt><dd>' + escapeHtml(offer.benefit) + '</dd>' +
            '</dl>' +
            '<a href="' + escapeHtml(offer.cta_url || '#contact') + '" class="button button-primary">' + escapeHtml(offer.cta_text || 'Μάθετε περισσότερα') + '</a>' +
          '</article>'
        );
      }).join('');
    })
    .catch(() => {
      offersEmpty.hidden = false;
      offersGrid.hidden = true;
    });
});

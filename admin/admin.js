document.addEventListener('DOMContentLoaded', function () {
  const state = {
    reservations: [],
    reviews: [],
    offers: [],
    aiType: 'offer',
  };

  const navLinks = Array.from(document.querySelectorAll('.admin-nav-link'));
  const tabs = Array.from(document.querySelectorAll('.admin-tab'));
  const reviewsBadge = document.getElementById('reviewsBadge');

  function nightsBetween(a, b) {
    return Math.round((new Date(b) - new Date(a)) / 86400000);
  }

  function formatDate(date) {
    if (!date) return '—';
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleDateString('el-GR');
  }

  async function api(path, options) {
    const response = await fetch(path, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      ...options,
    });

    if (response.status === 401) {
      window.location.href = '/admin/login.html';
      throw new Error('Unauthorized');
    }

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    return data;
  }

  function activateTab(tabName) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-tab') === tabName);
    });

    tabs.forEach(function (tab) {
      tab.classList.toggle('hidden', tab.id !== 'tab-' + tabName);
    });

    try {
      sessionStorage.setItem('adminActiveTab', tabName);
    } catch (_) {}
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      activateTab(link.getAttribute('data-tab'));
    });
  });

  try {
    const saved = sessionStorage.getItem('adminActiveTab');
    if (saved) activateTab(saved);
  } catch (_) {}

  const sidebarToggle = document.getElementById('sidebarToggle');
  const adminNav = document.querySelector('.admin-nav');
  if (sidebarToggle && adminNav) {
    sidebarToggle.addEventListener('click', function () {
      const isOpen = adminNav.classList.toggle('open');
      sidebarToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  async function loadReservations() {
    const search = document.getElementById('reservationSearch')?.value.trim() || '';
    const status = document.getElementById('reservationStatusFilter')?.value || 'all';

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status && status !== 'all') params.set('status', status);

    const data = await api('/api/admin/reservations?' + params.toString(), { method: 'GET' });
    state.reservations = data.reservations || [];
    renderReservations();
    renderCalendar();
  }

  function renderReservations() {
    const tbody = document.getElementById('reservationsBody');
    const dateFilter = document.getElementById('reservationDateFilter')?.value;
    if (!tbody) return;

    const rows = state.reservations.filter(function (item) {
      if (!dateFilter) return true;
      return item.arrival_date <= dateFilter && item.departure_date >= dateFilter;
    });

    if (rows.length === 0) {
      tbody.innerHTML = '<tr class="admin-empty-row"><td colspan="7"><span aria-hidden="true">📭</span>Δεν υπάρχουν κρατήσεις.</td></tr>';
      return;
    }

    tbody.innerHTML = rows.map(function (item) {
      const nights = nightsBetween(item.arrival_date, item.departure_date);
      return '<tr>' +
        '<td>' + item.guest_name + '<br><small>' + item.email + '</small></td>' +
        '<td>' + item.room + '<br><small>' + item.guests + ' άτομα</small></td>' +
        '<td>' + formatDate(item.arrival_date) + '</td>' +
        '<td>' + formatDate(item.departure_date) + '</td>' +
        '<td>' + nights + '</td>' +
        '<td>' + item.status + '</td>' +
        '<td>' +
          '<button class="admin-btn" data-edit-reservation="' + item.id + '">✏️</button> ' +
          '<button class="admin-btn" data-delete-reservation="' + item.id + '">🗑️</button>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  function renderCalendar() {
    const grid = document.getElementById('calendarGridBody');
    if (!grid) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1);
    const startWeekday = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const html = [];
    for (let i = 0; i < startWeekday; i += 1) {
      html.push('<div class="cal-day cal-prev"></div>');
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const current = new Date(year, month, day);
      const iso = current.toISOString().slice(0, 10);
      const booked = state.reservations.some(function (r) {
        return r.arrival_date <= iso && r.departure_date > iso && r.status !== 'cancelled';
      });
      const isToday = iso === new Date().toISOString().slice(0, 10);
      const classes = ['cal-day'];
      if (booked) classes.push('cal-booked');
      if (isToday) classes.push('today');
      html.push('<div class="' + classes.join(' ') + '">' + day + '</div>');
    }

    grid.innerHTML = html.join('');
  }

  function promptReservation(initial) {
    const guest_name = prompt('Όνομα επισκέπτη', initial?.guest_name || '');
    if (!guest_name) return null;
    const email = prompt('Email', initial?.email || '');
    if (!email) return null;
    const phone = prompt('Τηλέφωνο', initial?.phone || '');
    if (!phone) return null;
    const arrival_date = prompt('Άφιξη (YYYY-MM-DD)', initial?.arrival_date || '');
    if (!arrival_date) return null;
    const departure_date = prompt('Αναχώρηση (YYYY-MM-DD)', initial?.departure_date || '');
    if (!departure_date) return null;
    const guests = prompt('Αριθμός επισκεπτών', String(initial?.guests || 2));
    const room = prompt('Δωμάτιο', initial?.room || 'Δεν έχω προτίμηση');
    if (!room) return null;
    const booking_source = prompt('Πηγή κράτησης', initial?.booking_source || 'website') || 'website';
    const status = prompt('Κατάσταση (pending/confirmed/cancelled)', initial?.status || 'pending') || 'pending';
    const notes = prompt('Σημειώσεις', initial?.notes || '') || '';

    return {
      ...(initial?.id ? { id: initial.id } : {}),
      guest_name,
      email,
      phone,
      arrival_date,
      departure_date,
      guests: Number(guests || 1),
      room,
      booking_source,
      status,
      notes,
    };
  }

  async function loadReviews() {
    const data = await api('/api/admin/reviews?status=all', { method: 'GET' });
    state.reviews = data.reviews || [];
    const pendingCount = state.reviews.filter((item) => item.status === 'pending').length;
    if (reviewsBadge) reviewsBadge.textContent = String(pendingCount);
    renderReviews();
  }

  function renderReviews() {
    const root = document.getElementById('pendingReviews');
    if (!root) return;

    if (state.reviews.length === 0) {
      root.innerHTML = '<div class="admin-empty-state"><span aria-hidden="true">⭐</span><p>Δεν υπάρχουν κριτικές.</p></div>';
      return;
    }

    root.innerHTML = state.reviews.map(function (review) {
      return '<div class="admin-card">' +
        '<h3>' + review.guest_name + ' · ' + review.rating + '/5</h3>' +
        '<p class="admin-muted" style="margin-bottom:8px;">' + review.review_text + '</p>' +
        '<p class="admin-muted" style="margin-bottom:12px;">Κατάσταση: <strong>' + review.status + '</strong></p>' +
        '<div style="display:flex; gap:8px; flex-wrap:wrap;">' +
          '<button class="admin-btn" data-review-action="approved" data-review-id="' + review.id + '">✅ Έγκριση</button>' +
          '<button class="admin-btn" data-review-action="rejected" data-review-id="' + review.id + '">⛔ Απόρριψη</button>' +
          '<button class="admin-btn" data-review-action="edit" data-review-id="' + review.id + '">✏️ Επεξεργασία</button>' +
          '<button class="admin-btn" data-review-action="delete" data-review-id="' + review.id + '">🗑️ Διαγραφή</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  async function loadOffers() {
    const data = await api('/api/admin/offers', { method: 'GET' });
    state.offers = data.offers || [];
    renderOffers();
  }

  function renderOffers() {
    const grid = document.getElementById('offersGrid');
    if (!grid) return;

    if (state.offers.length === 0) {
      grid.innerHTML = '<div class="admin-empty-state"><span aria-hidden="true">🏷️</span><p>Δεν υπάρχουν προσφορές.</p></div>';
      return;
    }

    grid.innerHTML = state.offers.map(function (offer) {
      return '<div class="admin-card">' +
        '<h3>' + offer.title + '</h3>' +
        '<p class="admin-muted" style="margin-bottom:8px;">' + offer.description + '</p>' +
        '<p class="admin-muted" style="margin-bottom:8px;">Όφελος: ' + offer.benefit + '</p>' +
        '<p class="admin-muted" style="margin-bottom:12px;">Ενεργή: ' + (offer.is_active ? 'Ναι' : 'Όχι') + '</p>' +
        '<div style="display:flex; gap:8px; flex-wrap:wrap;">' +
          '<button class="admin-btn" data-edit-offer="' + offer.id + '">✏️</button>' +
          '<button class="admin-btn" data-delete-offer="' + offer.id + '">🗑️</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function promptOffer(initial) {
    const title = prompt('Τίτλος προσφοράς', initial?.title || '');
    if (!title) return null;
    const description = prompt('Περιγραφή', initial?.description || '');
    if (!description) return null;
    const benefit = prompt('Όφελος', initial?.benefit || '');
    if (!benefit) return null;
    const valid_from = prompt('Έναρξη ισχύος (YYYY-MM-DD ή κενό)', initial?.valid_from || '') || null;
    const valid_to = prompt('Λήξη ισχύος (YYYY-MM-DD ή κενό)', initial?.valid_to || '') || null;
    const image_url = prompt('Image URL', initial?.image_url || '') || null;
    const cta_text = prompt('CTA κείμενο', initial?.cta_text || 'Κρατήστε τώρα');
    if (!cta_text) return null;
    const cta_url = prompt('CTA URL', initial?.cta_url || '#contact');
    if (!cta_url) return null;
    const is_active = confirm('Να είναι ενεργή;');

    return {
      ...(initial?.id ? { id: initial.id } : {}),
      title,
      description,
      benefit,
      valid_from,
      valid_to,
      image_url,
      cta_text,
      cta_url,
      is_active,
    };
  }

  async function loadInstagramStatus() {
    const status = await api('/api/admin/instagram-status', { method: 'GET' });
    const connectBtn = document.getElementById('instagramConnectBtn');
    const publishBtn = document.getElementById('instagramPublishBtn');

    if (connectBtn) {
      connectBtn.disabled = !status.oauthReady;
      connectBtn.title = status.note;
    }
    if (publishBtn) {
      publishBtn.disabled = !status.publishingEnabled;
      publishBtn.title = status.note;
    }
  }

  const aiTypeButtons = Array.from(document.querySelectorAll('.ai-type-btn'));
  aiTypeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      aiTypeButtons.forEach(function (item) { item.classList.remove('active'); });
      btn.classList.add('active');
      state.aiType = btn.getAttribute('data-type') || 'offer';
    });
  });

  document.getElementById('aiGenerateBtn')?.addEventListener('click', async function () {
    const output = document.getElementById('aiOutput');
    const context = document.getElementById('aiContext')?.value.trim();
    const language = document.getElementById('aiLanguage')?.value;
    const tone = document.getElementById('aiTone')?.value;

    if (!context) {
      alert('Συμπληρώστε περιγραφή.');
      return;
    }

    const button = document.getElementById('aiGenerateBtn');
    const previous = button.textContent;
    button.disabled = true;
    button.textContent = 'Δημιουργία...';

    try {
      const data = await api('/api/admin/ai-generate', {
        method: 'POST',
        body: JSON.stringify({ type: state.aiType, context, language, tone }),
      });
      output.value = data.text || '';
    } catch (err) {
      alert(err.message);
    } finally {
      button.disabled = false;
      button.textContent = previous;
    }
  });

  document.getElementById('aiCopyBtn')?.addEventListener('click', async function () {
    const output = document.getElementById('aiOutput')?.value || '';
    if (!output) return;
    await navigator.clipboard.writeText(output);
    alert('Αντιγράφηκε.');
  });

  document.getElementById('aiClearBtn')?.addEventListener('click', function () {
    const output = document.getElementById('aiOutput');
    if (output) output.value = '';
  });

  document.getElementById('aiSaveDraftBtn')?.addEventListener('click', async function () {
    const output = document.getElementById('aiOutput')?.value.trim() || '';
    const context = document.getElementById('aiContext')?.value.trim() || 'manual save';
    const language = document.getElementById('aiLanguage')?.value || 'el';
    const tone = document.getElementById('aiTone')?.value || 'friendly';

    if (!output) {
      alert('Δεν υπάρχει κείμενο για αποθήκευση.');
      return;
    }

    try {
      await api('/api/admin/ai-drafts', {
        method: 'POST',
        body: JSON.stringify({ content_type: state.aiType, context, language, tone, output_text: output }),
      });
      alert('Αποθηκεύτηκε draft.');
    } catch (err) {
      alert(err.message);
    }
  });

  document.getElementById('instagramDraftSaveBtn')?.addEventListener('click', async function () {
    const caption = document.getElementById('instagramContext')?.value.trim();
    if (!caption) {
      alert('Συμπληρώστε caption.');
      return;
    }

    try {
      await api('/api/admin/instagram-drafts', {
        method: 'POST',
        body: JSON.stringify({ caption }),
      });
      alert('Αποθηκεύτηκε Instagram draft.');
    } catch (err) {
      alert(err.message);
    }
  });

  document.getElementById('adminLogoutBtn')?.addEventListener('click', async function () {
    await api('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login.html';
  });

  document.getElementById('addReservationBtn')?.addEventListener('click', async function () {
    const payload = promptReservation();
    if (!payload) return;
    try {
      await api('/api/admin/reservations', { method: 'POST', body: JSON.stringify(payload) });
      await loadReservations();
    } catch (err) {
      alert(err.message);
    }
  });

  document.getElementById('addOfferBtn')?.addEventListener('click', async function () {
    const payload = promptOffer();
    if (!payload) return;
    try {
      await api('/api/admin/offers', { method: 'POST', body: JSON.stringify(payload) });
      await loadOffers();
    } catch (err) {
      alert(err.message);
    }
  });

  document.getElementById('reservationSearch')?.addEventListener('input', function () {
    loadReservations().catch(function (err) { alert(err.message); });
  });
  document.getElementById('reservationStatusFilter')?.addEventListener('change', function () {
    loadReservations().catch(function (err) { alert(err.message); });
  });
  document.getElementById('reservationDateFilter')?.addEventListener('change', renderReservations);

  document.addEventListener('click', async function (event) {
    const editReservationId = event.target.getAttribute('data-edit-reservation');
    if (editReservationId) {
      const row = state.reservations.find((item) => item.id === editReservationId);
      const payload = promptReservation(row);
      if (!payload) return;
      try {
        await api('/api/admin/reservations', { method: 'PATCH', body: JSON.stringify(payload) });
        await loadReservations();
      } catch (err) {
        alert(err.message);
      }
      return;
    }

    const deleteReservationId = event.target.getAttribute('data-delete-reservation');
    if (deleteReservationId) {
      if (!confirm('Να διαγραφεί η κράτηση;')) return;
      try {
        await api('/api/admin/reservations', {
          method: 'DELETE',
          body: JSON.stringify({ id: deleteReservationId }),
        });
        await loadReservations();
      } catch (err) {
        alert(err.message);
      }
      return;
    }

    const reviewAction = event.target.getAttribute('data-review-action');
    const reviewId = event.target.getAttribute('data-review-id');
    if (reviewAction && reviewId) {
      const review = state.reviews.find((item) => item.id === reviewId);
      if (!review) return;

      try {
        if (reviewAction === 'delete') {
          if (!confirm('Να διαγραφεί η κριτική;')) return;
          await api('/api/admin/reviews', { method: 'DELETE', body: JSON.stringify({ id: reviewId }) });
        } else {
          const next = { ...review };
          if (reviewAction === 'approved') next.status = 'approved';
          if (reviewAction === 'rejected') next.status = 'rejected';
          if (reviewAction === 'edit') {
            next.guest_name = prompt('Όνομα', review.guest_name) || review.guest_name;
            next.rating = Number(prompt('Βαθμολογία 1-5', String(review.rating)) || review.rating);
            next.review_text = prompt('Κριτική', review.review_text) || review.review_text;
            next.status = prompt('Κατάσταση (pending/approved/rejected)', review.status) || review.status;
            next.admin_notes = prompt('Σημειώσεις admin', review.admin_notes || '') || '';
          }
          await api('/api/admin/reviews', { method: 'PATCH', body: JSON.stringify(next) });
        }

        await loadReviews();
      } catch (err) {
        alert(err.message);
      }
      return;
    }

    const editOfferId = event.target.getAttribute('data-edit-offer');
    if (editOfferId) {
      const offer = state.offers.find((item) => item.id === editOfferId);
      const payload = promptOffer(offer);
      if (!payload) return;
      try {
        await api('/api/admin/offers', { method: 'PATCH', body: JSON.stringify(payload) });
        await loadOffers();
      } catch (err) {
        alert(err.message);
      }
      return;
    }

    const deleteOfferId = event.target.getAttribute('data-delete-offer');
    if (deleteOfferId) {
      if (!confirm('Να διαγραφεί η προσφορά;')) return;
      try {
        await api('/api/admin/offers', { method: 'DELETE', body: JSON.stringify({ id: deleteOfferId }) });
        await loadOffers();
      } catch (err) {
        alert(err.message);
      }
    }
  });

  async function initialize() {
    try {
      await api('/api/auth/session', { method: 'GET' });
      await Promise.all([loadReservations(), loadReviews(), loadOffers(), loadInstagramStatus()]);
    } catch (err) {
      if (err.message !== 'Unauthorized') {
        alert('Αποτυχία αρχικοποίησης: ' + err.message);
      }
    }
  }

  initialize();
});

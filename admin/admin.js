/**
 * Admin Dashboard JavaScript
 * ============================
 * Handles tab navigation and interactive elements in the admin prototype.
 *
 * IMPORTANT: This is a PROTOTYPE.
 * All data displayed here is static placeholder content.
 * No real data is stored, read, or modified.
 *
 * ─────────────────────────────────────────────────────────────────
 * BACKEND INTEGRATION REQUIRED
 * ─────────────────────────────────────────────────────────────────
 * Replace the placeholder functions below with fetch() calls to your
 * REST API once the backend is implemented.
 *
 * Recommended API structure:
 *
 *   GET    /api/reservations           → list reservations
 *   POST   /api/reservations           → create reservation
 *   GET    /api/guests                 → list guests
 *   GET    /api/reviews?status=pending → pending reviews
 *   PATCH  /api/reviews/:id            → approve / reject
 *   GET    /api/offers                 → list offers
 *   POST   /api/offers                 → create offer
 *   POST   /api/ai/generate            → AI content (backend calls OpenAI)
 *   GET    /api/instagram/posts        → recent Instagram posts
 *   POST   /api/instagram/publish      → publish post (Meta Graph API)
 *
 * Authentication:
 *   All API requests must include an Authorization header with a
 *   server-issued JWT or session cookie. Never store tokens in
 *   localStorage or plain JavaScript variables.
 *
 * Environment variables needed on the backend (never in frontend):
 *   DATABASE_URL          — PostgreSQL / MongoDB connection string
 *   JWT_SECRET            — Secret for signing JWT tokens
 *   OPENAI_API_KEY        — OpenAI API key for AI assistant
 *   META_APP_ID           — Meta / Facebook App ID
 *   META_APP_SECRET       — Meta App Secret
 *   META_ACCESS_TOKEN     — Long-lived Instagram/Facebook page token
 *   META_INSTAGRAM_ACCOUNT_ID — Instagram Business account ID
 *   SENDGRID_API_KEY      — For email notifications (or use SMTP)
 * ─────────────────────────────────────────────────────────────────
 */

document.addEventListener("DOMContentLoaded", function () {

  /* ── Tab navigation ──────────────────────────────────────── */

  const navLinks = Array.from(document.querySelectorAll(".admin-nav-link"));
  const tabs     = Array.from(document.querySelectorAll(".admin-tab"));

  function activateTab(tabName) {
    navLinks.forEach(function (link) {
      const isActive = link.getAttribute("data-tab") === tabName;
      link.classList.toggle("active", isActive);
    });

    tabs.forEach(function (tab) {
      const isActive = tab.id === "tab-" + tabName;
      tab.classList.toggle("hidden", !isActive);
    });

    /* Persist active tab in sessionStorage so page refresh restores it */
    try {
      sessionStorage.setItem("adminActiveTab", tabName);
    } catch (e) { /* ignore */ }
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const tabName = link.getAttribute("data-tab");
      activateTab(tabName);
    });
  });

  /* Restore last active tab */
  try {
    const savedTab = sessionStorage.getItem("adminActiveTab");
    if (savedTab) activateTab(savedTab);
  } catch (e) { /* ignore */ }

  /* ── Mobile sidebar toggle ───────────────────────────────── */

  const sidebarToggle = document.getElementById("sidebarToggle");
  const adminNav      = document.querySelector(".admin-nav");

  if (sidebarToggle && adminNav) {
    sidebarToggle.addEventListener("click", function () {
      const isOpen = adminNav.classList.toggle("open");
      sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ── AI type selector ────────────────────────────────────── */

  const aiTypeButtons = Array.from(document.querySelectorAll(".ai-type-btn"));
  const aiContextArea = document.getElementById("aiContext");

  const aiPlaceholders = {
    offer:     "π.χ. Early booking Αύγουστος, -20%, ισχύει για ζευγάρια, έως 30 Ιουνίου",
    instagram: "π.χ. Ηλιοβασίλεμα από τον εξώστη δωμάτιο 2, ήσυχη Κυριακή, ζευγάρι",
    post:      "π.χ. Ανοικτά για κρατήσεις Σεπτεμβρίου, ειδικές τιμές για οικογένειες",
    room:      "π.χ. Deluxe δίκλινο, διπλό κρεβάτι, μπαλκόνι με θέα, 25τμ",
    reply:     "Κριτική: «Πολύ καλό κατάλυμα, καθαριότητα άριστη, ξανά θα έρθουμε!» — Ανταπόκριση",
    translate: "Επικολλήστε το κείμενο που θέλετε να μεταφραστεί…",
  };

  aiTypeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      aiTypeButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const type = btn.getAttribute("data-type");
      if (aiContextArea && aiPlaceholders[type]) {
        aiContextArea.placeholder = aiPlaceholders[type];
      }
    });
  });

  /* ── AI clear button ─────────────────────────────────────── */

  const aiClearBtn = document.getElementById("aiClearBtn");
  const aiOutput   = document.getElementById("aiOutput");

  if (aiClearBtn && aiOutput) {
    aiClearBtn.addEventListener("click", function () {
      aiOutput.value = "";
    });
  }

  /* ── AI generate placeholder message ────────────────────── */

  const aiGenerateBtn = document.getElementById("aiGenerateBtn");

  if (aiGenerateBtn) {
    aiGenerateBtn.addEventListener("click", function () {
      /* This button is disabled in the prototype.
         When backend is ready, replace this with a fetch() call:

         fetch("/api/ai/generate", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             "Authorization": "Bearer " + getAdminToken(),
           },
           body: JSON.stringify({
             type: getSelectedAiType(),
             context: aiContextArea.value,
             language: document.getElementById("aiLanguage").value,
             tone: document.getElementById("aiTone").value,
           }),
         })
         .then(function (res) { return res.json(); })
         .then(function (data) {
           aiOutput.value = data.text;
           aiCopyBtn.disabled = false;
         })
         .catch(function (err) {
           console.error("AI generation error:", err);
         });
      */
    });
  }

  /* ── Reviews badge (placeholder: 0 pending) ─────────────── */
  /* Replace with a fetch() to /api/reviews?status=pending when backend ready */
  const reviewsBadge = document.getElementById("reviewsBadge");
  if (reviewsBadge) {
    reviewsBadge.textContent = "0";
    /* When backend is ready:
       fetch("/api/reviews?status=pending")
         .then(function(res) { return res.json(); })
         .then(function(data) { reviewsBadge.textContent = String(data.length); });
    */
  }

});

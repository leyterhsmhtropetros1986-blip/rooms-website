/* global SITE_CONFIG, BOOKING_CONFIG */
"use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* ── Apply centralized image config to DOM ─────────────────── */
  applyConfig();

  /* ── Render booking platform links ──────────────────────────── */
  renderBookingPlatforms();

  /* ── Render social links in footer ──────────────────────────── */
  renderSocialLinks();

  /* ── Mobile menu ─────────────────────────────────────────────── */
  var menuButton = document.getElementById("menuButton");
  var navigation = document.getElementById("navigation");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.classList.toggle("is-open", isOpen);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.classList.remove("is-open");
      });
    });
  }

  /* ── Scroll: header appearance + scroll-to-top button ───────── */
  var header    = document.getElementById("site-header");
  var scrollBtn = document.getElementById("scrollTop");
  var THRESHOLD = 60;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header)    header.classList.toggle("scrolled", y > THRESHOLD);
    if (scrollBtn) scrollBtn.classList.toggle("visible", y > 400);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (scrollBtn) {
    scrollBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── Hero: subtle ken-burns / fade-in on load ───────────────── */
  var hero = document.querySelector(".hero");
  if (hero) {
    // Small delay ensures the CSS transition runs visibly
    setTimeout(function () { hero.classList.add("loaded"); }, 80);
  }

  /* ── Gallery: touch / swipe for mobile ──────────────────────── */
  initGallerySwipe();

  /* ── Newsletter form — placeholder handler ───────────────────── */
  var newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("newsletterEmail");
      if (input && input.value) {
        // TODO: POST to /api/newsletter once backend is ready
        input.value = "";
        input.placeholder = "Ευχαριστούμε για την εγγραφή! ✓";
        input.disabled = true;
        var btn = newsletterForm.querySelector("button");
        if (btn) btn.disabled = true;
      }
    });
  }

  /* ── Intersection Observer: fade-up sections ─────────────────── */
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity    = "1";
          entry.target.style.transform  = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(
      ".room-card, .amenity, .offer-card, .review-card, .nearby-card, .about-feature"
    ).forEach(function (el) {
      el.style.opacity   = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
      observer.observe(el);
    });
  }
});

/* ──────────────────────────────────────────────────────────────
   CONFIG RENDERING
   Reads SITE_CONFIG and applies image paths to the DOM.
   The HTML already has correct src attributes as a fallback;
   this function overrides them from the config if available.
────────────────────────────────────────────────────────────── */
function applyConfig() {
  if (typeof SITE_CONFIG === "undefined") return;

  var img = SITE_CONFIG.images;
  if (!img) return;

  /* Hero background */
  setBackground("heroBg", img.hero);

  /* About image */
  setImgSrc("aboutImg", img.about);

  /* Offers background */
  setBackground("offersBg", img.offers);

  /* Footer background */
  setBackground("footerBg", img.footer);

  /* Room images */
  if (Array.isArray(img.rooms)) {
    img.rooms.forEach(function (room, i) {
      setImgSrc("roomImg" + i, room.src, room.alt);
    });
  }

  /* Gallery images */
  if (Array.isArray(img.gallery)) {
    var grid = document.getElementById("galleryGrid");
    if (!grid) return;
    var items = grid.querySelectorAll(".gallery-item");
    img.gallery.forEach(function (g, i) {
      if (items[i]) {
        var imgEl = items[i].querySelector("img");
        if (imgEl) {
          imgEl.src = g.src;
          imgEl.alt = g.alt;
          items[i].setAttribute("aria-label", "Προβολή: " + g.alt);
        }
      }
    });
  }
}

function setBackground(id, url) {
  if (!url) return;
  var el = document.getElementById(id);
  if (el) el.style.backgroundImage = "url('" + url + "')";
}

function setImgSrc(id, src, alt) {
  if (!src) return;
  var el = document.getElementById(id);
  if (!el) return;
  el.src = src;
  if (alt) el.alt = alt;
}

/* ──────────────────────────────────────────────────────────────
   BOOKING PLATFORM LINKS
   Reads BOOKING_CONFIG and renders platform cards.
   Empty URL → card hidden automatically.
────────────────────────────────────────────────────────────── */
function renderBookingPlatforms() {
  if (typeof BOOKING_CONFIG === "undefined") return;

  var container = document.getElementById("bookingPlatforms");
  if (!container) return;

  var platforms = [
    { key: "bookingCom", label: "Booking.com",  icon: "🏨" },
    { key: "airbnb",     label: "Airbnb",        icon: "🏠" },
    { key: "direct",     label: "Άμεση κράτηση", icon: "✉️" },
  ];

  var html = "";
  platforms.forEach(function (p) {
    var url = BOOKING_CONFIG[p.key];
    if (!url) return;
    var isExternal = url.startsWith("http");
    var attrs = isExternal
      ? 'target="_blank" rel="noopener noreferrer"'
      : "";
    html +=
      '<a href="' + url + '" class="booking-platform-card" ' + attrs + ">" +
        '<span class="p-icon" aria-hidden="true">' + p.icon + "</span>" +
        p.label +
      "</a>";
  });

  if (html) {
    container.innerHTML = html;
  } else {
    container.style.display = "none";
  }
}

/* ──────────────────────────────────────────────────────────────
   SOCIAL LINKS
   Reads SITE_CONFIG.social and renders links in footer.
   Empty URL → link hidden.
────────────────────────────────────────────────────────────── */
function renderSocialLinks() {
  if (typeof SITE_CONFIG === "undefined") return;

  var container = document.getElementById("footerSocial");
  if (!container) return;

  var networks = [
    { key: "instagram", label: "Instagram", icon: "📷" },
    { key: "facebook",  label: "Facebook",  icon: "📘" },
    { key: "tiktok",    label: "TikTok",    icon: "🎵" },
  ];

  var html = "";
  networks.forEach(function (n) {
    var url = SITE_CONFIG.social && SITE_CONFIG.social[n.key];
    if (!url) return;
    html +=
      '<a href="' + url + '" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="' + n.label + '" title="' + n.label + '">' +
        n.icon +
      "</a>";
  });

  container.innerHTML = html || "";
}

/* ──────────────────────────────────────────────────────────────
   GALLERY SWIPE (mobile touch)
   Horizontal swipe on the gallery grid moves between images
   by opening the lightbox for the swiped-to item.
────────────────────────────────────────────────────────────── */
function initGallerySwipe() {
  var grid = document.getElementById("galleryGrid");
  if (!grid) return;

  var startX = 0;
  var SWIPE_THRESHOLD = 50;

  grid.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  grid.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;

    var items = Array.from(grid.querySelectorAll(".gallery-item"));
    if (!items.length) return;

    // Find the item currently most visible in the viewport
    var closest = items.reduce(function (best, item) {
      var rect  = item.getBoundingClientRect();
      var score = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
      return score < best.score ? { el: item, score: score, idx: items.indexOf(item) } : best;
    }, { el: null, score: Infinity, idx: 0 });

    var next = dx < 0
      ? Math.min(closest.idx + 1, items.length - 1)
      : Math.max(closest.idx - 1, 0);

    if (next !== closest.idx) {
      items[next].click();
    }
  }, { passive: true });
}

/* global SITE_CONFIG, BOOKING_CONFIG */
"use strict";

var FALLBACK_BRAND_NAME = "Asteria Apartments";
var FALLBACK_PRIMARY_HEX = "%230d1e16";
var FALLBACK_SECONDARY_HEX = "%231e3c2b";
var FALLBACK_GOLD_HEX = "%23c8a96b";

/* Current UI language, kept in sync by legal-pages.js via <html lang="">. */
function currentLang() {
  return document.documentElement.getAttribute("lang") === "en" ? "en" : "el";
}

document.addEventListener("DOMContentLoaded", function () {

  /* ── Apply centralized image config to DOM ─────────────────── */
  applyConfig();

  /* ── Render booking platform links ──────────────────────────── */
  renderBookingPlatforms();

  /* ── Render social links in footer ──────────────────────────── */
  renderSocialLinks();

  /* ── Render hiking trail links (map / GPX) ──────────────────── */
  renderHikingTrail();

  /* ── Room card photo carousels ─────────────────────────────── */
  initRoomCarousels();

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

  /* ── Floating contact dock: single FAB on mobile, expands to
     reveal phone/WhatsApp/Viber (desktop shows all three already,
     this toggle is simply hidden there via CSS) ────────────────── */
  var contactDock       = document.getElementById("contactDock");
  var contactDockToggle = document.getElementById("contactDockToggle");

  if (contactDock && contactDockToggle) {
    contactDockToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = contactDock.classList.toggle("is-open");
      contactDockToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (e) {
      if (!contactDock.contains(e.target)) {
        contactDock.classList.remove("is-open");
        contactDockToggle.setAttribute("aria-expanded", "false");
      }
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

  /* ── Gallery: scroll-row arrows ──────────────────────────────── */
  initGalleryArrows();

  /* ── Newsletter form — placeholder handler ───────────────────── */
  var newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("newsletterEmail");
      if (input && input.value) {
        // TODO: POST to /api/newsletter once backend is ready
        var lang = currentLang();
        input.value = "";
        input.placeholder = lang === "en" ? "Thank you for subscribing! ✓" : "Ευχαριστούμε για την εγγραφή! ✓";
        input.disabled = true;
        var btn = newsletterForm.querySelector("button");
        if (btn) btn.disabled = true;
        /* Announce success to screen readers */
        var notice = newsletterForm.querySelector(".newsletter-notice");
        if (!notice) {
          notice = document.createElement("p");
          notice.className = "newsletter-notice";
          notice.setAttribute("role", "status");
          notice.setAttribute("aria-live", "polite");
          newsletterForm.appendChild(notice);
        }
        notice.textContent = lang === "en" ? "You have successfully subscribed to our newsletter!" : "Εγγραφήκατε επιτυχώς στο newsletter μας!";
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
      ".room-card, .amenity, .offer-card, .review-card, .nearby-card, .about-feature, .location-highlight"
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

  /* Room carousels — each room has its own array of photos, matched
     by position to the <img> tags inside #roomCarouselN's track. */
  if (Array.isArray(img.rooms)) {
    img.rooms.forEach(function (room, i) {
      var carousel = document.getElementById("roomCarousel" + i);
      if (!carousel || !Array.isArray(room.images)) return;
      var imgs = carousel.querySelectorAll(".room-carousel-track img");
      room.images.forEach(function (photo, j) {
        if (imgs[j]) setImageWithFallback(imgs[j], photo.src, photo.alt);
      });
    });
  }

  /* Gallery images, grouped by category — each category is its own
     scrollable row identified by [data-gallery-category]. */
  if (img.gallery && typeof img.gallery === "object") {
    Object.keys(img.gallery).forEach(function (category) {
      var row = document.querySelector('[data-gallery-category="' + category + '"]');
      if (!row) return;
      var items = row.querySelectorAll(".premium-gallery-card");
      img.gallery[category].forEach(function (g, i) {
        if (items[i]) {
          var imgEl = items[i].querySelector("img");
          if (imgEl) {
            setImageWithFallback(imgEl, g.src, g.alt);
            items[i].setAttribute("aria-label", "Άνοιγμα: " + g.alt);
          }
        }
      });
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
  setImageWithFallback(el, src, alt);
}

function buildFallbackSvg() {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1000'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='" + FALLBACK_PRIMARY_HEX + "'/%3E%3Cstop offset='1' stop-color='" + FALLBACK_SECONDARY_HEX + "'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1600' height='1000' fill='url(%23g)'/%3E%3Ctext x='50%25' y='48%25' text-anchor='middle' font-family='Georgia,serif' font-size='78' fill='" + FALLBACK_GOLD_HEX + "'%3E" + encodeURIComponent(FALLBACK_BRAND_NAME) + "%3C/text%3E%3C/svg%3E";
}

function setImageWithFallback(el, src, alt) {
  if (!el || !src) return;
  var fallbackSvg = buildFallbackSvg();

  el.onerror = function () {
    el.onerror = null;
    el.src = fallbackSvg;
    if (alt) el.alt = alt;
  };

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
    { key: "direct",     label: "Άμεση κράτηση", i18n: "booking.platformDirect", icon: "✉️" },
  ];

  var html = "";
  platforms.forEach(function (p) {
    var url = BOOKING_CONFIG[p.key];
    if (!url) return;
    var isExternal = url.startsWith("http");
    var attrs = isExternal
      ? 'target="_blank" rel="noopener noreferrer"'
      : "";
    var labelAttr = p.i18n ? ' data-i18n="' + p.i18n + '"' : "";
    html +=
      '<a href="' + url + '" class="booking-platform-card" ' + attrs + ">" +
        '<span class="p-icon" aria-hidden="true">' + p.icon + "</span>" +
        "<span" + labelAttr + ">" + p.label + "</span>" +
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
   HIKING TRAIL LINKS
   Reads SITE_CONFIG.hiking and renders "view map" / "download GPX"
   links on the Πεζοπορία (Hiking) nearby-card.
   Empty URL → that link hidden. Both empty → nothing rendered.
────────────────────────────────────────────────────────────── */
function renderHikingTrail() {
  if (typeof SITE_CONFIG === "undefined") return;

  var container = document.getElementById("hikingTrailLinks");
  var hiking = SITE_CONFIG.hiking;
  if (!container || !hiking) return;

  var html = "";
  if (hiking.mapUrl) {
    html +=
      '<a href="' + hiking.mapUrl + '" class="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">' +
        '<span data-i18n="nearby.hiking.viewMap">Δείτε τη διαδρομή</span>' +
      "</a>";
  }
  if (hiking.gpxUrl) {
    html +=
      '<a href="' + hiking.gpxUrl + '" class="btn btn-ghost btn-sm" download>' +
        '<span data-i18n="nearby.hiking.downloadGpx">Λήψη GPX</span>' +
      "</a>";
  }

  container.innerHTML = html;
  container.style.display = html ? "" : "none";
}

/* ──────────────────────────────────────────────────────────────
   GALLERY SWIPE (mobile touch)
   Horizontal swipe on the gallery grid moves between images
   by opening the lightbox for the swiped-to item.
────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────
   GALLERY SCROLL-ROW ARROWS
   Each category row scrolls natively (touch swipe, trackpad,
   scroll-snap). The prev/next buttons just nudge that native
   scroll for mouse users — one card-width per click.
────────────────────────────────────────────────────────────── */
function initGalleryArrows() {
  document.querySelectorAll(".gallery-category").forEach(function (category) {
    var row = category.querySelector(".gallery-scroll");
    if (!row) return;

    category.querySelectorAll(".gallery-arrow").forEach(function (button) {
      button.addEventListener("click", function () {
        var card = row.querySelector(".premium-gallery-card");
        var step = card ? card.getBoundingClientRect().width + 18 : row.clientWidth * 0.8;
        var dir  = button.getAttribute("data-dir") === "prev" ? -1 : 1;
        row.scrollBy({ left: dir * step, behavior: "smooth" });
      });
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   ROOM CARD PHOTO CAROUSELS
   Each room card has its own small scrollable set of photos with
   dot indicators. Clicking a dot scrolls to that photo; the active
   dot follows native scroll position (swipe on mobile too).
────────────────────────────────────────────────────────────── */
function initRoomCarousels() {
  document.querySelectorAll(".room-carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".room-carousel-track");
    var dots  = Array.from(carousel.querySelectorAll(".room-carousel-dot"));
    if (!track || !dots.length) return;

    function setActive(index) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        track.scrollTo({ left: track.clientWidth * i, behavior: "smooth" });
      });
    });

    track.addEventListener("scroll", function () {
      var index = Math.round(track.scrollLeft / track.clientWidth);
      setActive(index);
    }, { passive: true });
  });
}

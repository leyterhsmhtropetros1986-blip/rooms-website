"use strict";

(function () {
  var STORAGE_KEY = "asteria-language";
  var pageKey = document.body.getAttribute("data-legal-page") || "";
  var pageTranslations = window.LEGAL_PAGE_TRANSLATIONS || {};

  var common = {
    el: {
      "skip.link": "Μετάβαση στο κύριο περιεχόμενο",
      "header.logo.aria": "Asteria Apartments — Αρχική",
      "header.menu.aria": "Άνοιγμα μενού πλοήγησης",
      "header.nav.aria": "Κύριο μενού",
      "nav.about": "Το κατάλυμα",
      "nav.rooms": "Δωμάτια",
      "nav.amenities": "Παροχές",
      "nav.gallery": "Φωτογραφίες",
      "nav.location": "Τοποθεσία",
      "nav.contact": "Επικοινωνία",
      "nav.booking": "Κράτηση",
      "footer.brand": "Boutique κατάλυμα στο Νιμπορειό Ευβοίας — άνεση, καθαριότητα και αυθεντική ελληνική φιλοξενία.",
      "footer.social.aria": "Κοινωνικά δίκτυα",
      "footer.nav.aria": "Πλοήγηση",
      "footer.nav.title": "Πλοήγηση",
      "footer.contact.aria": "Επικοινωνία",
      "footer.contact.title": "Επικοινωνία",
      "footer.location.1": "Νιμπορειό Ευβοίας",
      "footer.location.2": "Νότια Εύβοια, Ελλάδα",
      "footer.news.title": "Newsletter",
      "footer.news.body": "Εγγραφείτε για να λαμβάνετε ειδικές προσφορές και νέα από το κατάλυμα.",
      "footer.news.placeholder": "email@example.com",
      "footer.news.aria": "Email για newsletter",
      "footer.news.btn": "Εγγραφή",
      "footer.news.note": "* Η εγγραφή ενεργοποιείται μόλις διαμορφωθεί το backend.",
      "footer.copy": "© 2026 Asteria Apartments. Όλα τα δικαιώματα διατηρούνται.",
      "footer.legal.aria": "Νομικό πλαίσιο",
      "footer.legal.privacy": "Πολιτική απορρήτου",
      "footer.legal.terms": "Όροι χρήσης",
      "footer.legal.cancel": "Πολιτική ακύρωσης"
    },
    en: {
      "skip.link": "Skip to main content",
      "header.logo.aria": "Asteria Apartments — Home",
      "header.menu.aria": "Open navigation menu",
      "header.nav.aria": "Main menu",
      "nav.about": "Property",
      "nav.rooms": "Rooms",
      "nav.amenities": "Amenities",
      "nav.gallery": "Gallery",
      "nav.location": "Location",
      "nav.contact": "Contact",
      "nav.booking": "Book",
      "footer.brand": "Boutique accommodation in Niborio, Evia — comfort, cleanliness, and authentic Greek hospitality.",
      "footer.social.aria": "Social media",
      "footer.nav.aria": "Navigation",
      "footer.nav.title": "Navigation",
      "footer.contact.aria": "Contact",
      "footer.contact.title": "Contact",
      "footer.location.1": "Niborio, Evia",
      "footer.location.2": "South Evia, Greece",
      "footer.news.title": "Newsletter",
      "footer.news.body": "Subscribe to receive special offers and updates from the property.",
      "footer.news.placeholder": "email@example.com",
      "footer.news.aria": "Newsletter email",
      "footer.news.btn": "Subscribe",
      "footer.news.note": "* Subscription will be enabled once backend support is available.",
      "footer.copy": "© 2026 Asteria Apartments. All rights reserved.",
      "footer.legal.aria": "Legal",
      "footer.legal.privacy": "Privacy Policy",
      "footer.legal.terms": "Terms of Use",
      "footer.legal.cancel": "Cancellation Policy"
    }
  };

  var merged = {
    el: Object.assign({}, common.el, (pageTranslations.el || {})),
    en: Object.assign({}, common.en, (pageTranslations.en || {}))
  };

  function applyLanguage(lang) {
    var selected = lang === "en" ? "en" : "el";
    var dict = merged[selected];

    document.documentElement.setAttribute("lang", selected);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var attr = el.getAttribute("data-i18n-attr");
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.setAttribute(attr, dict[key]);
    });

    document.title = dict["meta.title"] || document.title;

    document.querySelectorAll("[data-lang-switch]").forEach(function (button) {
      var isActive = button.getAttribute("data-lang-switch") === selected;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    try {
      localStorage.setItem(STORAGE_KEY, selected);
    } catch (e) {
      // ignore storage failures
    }
  }

  function getInitialLanguage() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "el" || stored === "en") return stored;
    } catch (e) {
      // ignore storage failures
    }

    var browserLang = (navigator.language || "").toLowerCase();
    return browserLang.indexOf("en") === 0 ? "en" : "el";
  }

  document.querySelectorAll("[data-lang-switch]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(button.getAttribute("data-lang-switch"));
    });
  });

  applyLanguage(getInitialLanguage());

  if (pageKey) {
    document.body.setAttribute("data-legal-page-ready", pageKey);
  }
})();

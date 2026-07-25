/**
 * ASTERIA APARTMENTS — Bilingual EL / EN switcher
 * =================================================
 * - Greek (el) is the default language.
 * - Persists the user's choice to localStorage.
 * - No page reload required.
 *
 * How it works:
 *   Every translatable element has data-el and data-en attributes
 *   containing the Greek and English text respectively.
 *   When the user switches language this module replaces the
 *   textContent of every such element and updates the <html lang>
 *   attribute.
 *
 *   For elements that contain child nodes (e.g. <h1> with <br>),
 *   only the data-XX value is swapped as a whole — the inner HTML
 *   structure is preserved for single-line attributes and replaced
 *   only for block-level headings where a flat string is sufficient.
 */
"use strict";

(function () {
  var STORAGE_KEY = "asteria-lang";
  var DEFAULT_LANG = "el";

  /* ── Helpers ─────────────────────────────────────────────── */

  function getCurrentLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* silently ignore storage errors */ }
  }

  /**
   * Apply the given language to all translatable elements.
   * Elements must have data-el and data-en attributes.
   */
  function applyLang(lang) {
    var attr = "data-" + lang;
    var els = document.querySelectorAll("[data-el][data-en]");
    els.forEach(function (el) {
      var text = el.getAttribute(attr);
      if (!text) return;

      /* For elements with child nodes (e.g. <h1 data-el="…"><br>…</h1>)
         we only update if the element has no child element nodes
         (i.e. plain text containers).  Elements with child nodes like
         <br> keep their inner markup unchanged — their data-XX attr
         acts only as an ARIA / screen-reader label in that case.
         Exception: buttons, anchors, small, strong — always safe to update. */
      var hasChildElements = Array.from(el.childNodes).some(function (n) {
        return n.nodeType === 1; /* Node.ELEMENT_NODE */
      });

      var tagName = el.tagName ? el.tagName.toLowerCase() : "";
      var safeTags = ["a", "button", "span", "p", "small", "strong", "li", "h4", "label"];
      var alwaysReplace = safeTags.indexOf(tagName) !== -1;

      if (!hasChildElements || alwaysReplace) {
        el.textContent = text;
      }
    });

    /* Update <html lang> */
    document.documentElement.lang = lang;

    /* Update switcher button states */
    var btnEl = document.getElementById("langEl");
    var btnEn = document.getElementById("langEn");
    if (btnEl) {
      btnEl.setAttribute("aria-pressed", lang === "el" ? "true" : "false");
      btnEl.classList.toggle("lang-btn--active", lang === "el");
    }
    if (btnEn) {
      btnEn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
      btnEn.classList.toggle("lang-btn--active", lang === "en");
    }

    /* Update skip-link text */
    var skipLink = document.querySelector(".skip-link");
    if (skipLink) {
      skipLink.textContent = lang === "en"
        ? "Skip to main content"
        : "Μετάβαση στο κύριο περιεχόμενο";
    }

    /* Update aria-label on site-nav */
    var siteNav = document.getElementById("navigation");
    if (siteNav) {
      siteNav.setAttribute("aria-label", lang === "en" ? "Main menu" : "Κύριο μενού");
    }

    /* Update menu button aria-label */
    var menuBtn = document.getElementById("menuButton");
    if (menuBtn) {
      menuBtn.setAttribute("aria-label",
        lang === "en" ? "Open navigation menu" : "Άνοιγμα μενού πλοήγησης");
    }
  }

  /* ── Initialisation ──────────────────────────────────────── */

  function init() {
    var lang = getCurrentLang();
    applyLang(lang);

    var btnEl = document.getElementById("langEl");
    var btnEn = document.getElementById("langEn");

    if (btnEl) {
      btnEl.addEventListener("click", function () {
        saveLang("el");
        applyLang("el");
      });
    }

    if (btnEn) {
      btnEn.addEventListener("click", function () {
        saveLang("en");
        applyLang("en");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

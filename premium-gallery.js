document.addEventListener("DOMContentLoaded", () => {
  const lightbox     = document.getElementById("lightbox");
  const lbImage      = document.getElementById("lightboxImage");
  const lbCaption    = document.getElementById("lightboxCaption");
  const lbClose      = document.getElementById("lightboxClose");
  const lbPrev       = document.getElementById("lightboxPrev");
  const lbNext       = document.getElementById("lightboxNext");
  const lbCounter    = document.getElementById("lightboxCounter");
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

  if (!lightbox || galleryItems.length === 0) return;

  let currentIndex = 0;

  /* ── helpers ─────────────────────────────────────────────── */

  function loadSlide(index) {
    const img = galleryItems[index].querySelector("img");
    lbImage.src       = img.src;
    lbImage.alt       = img.alt;
    lbCaption.textContent = img.alt;
    lbCounter.textContent = `${index + 1} / ${galleryItems.length}`;
  }

  function open(index) {
    currentIndex = index;
    loadSlide(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lbClose.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    galleryItems[currentIndex].focus();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    loadSlide(currentIndex);
  }

  function next() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    loadSlide(currentIndex);
  }

  /* ── event listeners ─────────────────────────────────────── */

  galleryItems.forEach((item, i) => item.addEventListener("click", () => open(i)));

  lbClose.addEventListener("click", close);
  lbPrev.addEventListener("click", prev);
  lbNext.addEventListener("click", next);

  /* Close on backdrop click */
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  /* Keyboard: Escape / arrows / focus trap */
  const focusableInLightbox = [lbClose, lbPrev, lbNext];

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape")     { e.preventDefault(); close(); return; }
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev();  return; }
    if (e.key === "ArrowRight") { e.preventDefault(); next();  return; }

    /* Focus trap: keep Tab/Shift+Tab inside the lightbox */
    if (e.key === "Tab") {
      const first = focusableInLightbox[0];
      const last  = focusableInLightbox[focusableInLightbox.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }
  });

  /* Touch swipe on mobile */
  let touchStartX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    const delta = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(delta) > 48) {
      if (delta > 0) next(); else prev();
    }
  }, { passive: true });
});

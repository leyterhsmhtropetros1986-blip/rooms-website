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

  /* Keyboard: Escape / arrows */
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape")     { e.preventDefault(); close(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev();  }
    if (e.key === "ArrowRight") { e.preventDefault(); next();  }
  });
});

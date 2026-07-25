/* Lightbox for the gallery section */
(function () {
  "use strict";

  const lightbox      = document.getElementById("lightbox");
  const lbImage       = document.getElementById("lightboxImage");
  const lbCaption     = document.getElementById("lightboxCaption");
  const lbCounter     = document.getElementById("lightboxCounter");
  const lbClose       = document.getElementById("lightboxClose");
  const lbPrev        = document.getElementById("lightboxPrev");
  const lbNext        = document.getElementById("lightboxNext");

  if (!lightbox || !lbImage) return;

  const items   = Array.from(document.querySelectorAll(".gallery-item"));
  let current   = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    const img = items[current].querySelector("img");
    if (!img) return;

    lbImage.src           = img.src;
    lbImage.alt           = img.alt;
    lbCaption.textContent = img.alt;
    lbCounter.textContent = (current + 1) + " / " + items.length;
  }

  function open(index) {
    show(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lbClose.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    if (items[current]) items[current].focus();
  }

  items.forEach(function (item, i) {
    item.addEventListener("click", function () { open(i); });
  });

  lbClose.addEventListener("click", close);

  lbPrev.addEventListener("click", function () { show(current - 1); });
  lbNext.addEventListener("click", function () { show(current + 1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape")      close();
    if (e.key === "ArrowLeft")   show(current - 1);
    if (e.key === "ArrowRight")  show(current + 1);
  });
})();

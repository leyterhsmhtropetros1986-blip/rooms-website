(function () {
  "use strict";

  var galleryButtons = Array.from(document.querySelectorAll("#premiumGallery .premium-gallery-card"));
  var lightbox = document.getElementById("premiumLightbox");
  var lightboxImage = document.getElementById("premiumLightboxImage");
  var closeButton = document.getElementById("premiumLightboxClose");
  var prevButton = document.getElementById("premiumLightboxPrev");
  var nextButton = document.getElementById("premiumLightboxNext");

  if (!galleryButtons.length || !lightbox || !lightboxImage || !closeButton || !prevButton || !nextButton) {
    return;
  }

  var currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + galleryButtons.length) % galleryButtons.length;
    var sourceImage = galleryButtons[currentIndex].querySelector("img");
    if (!sourceImage) return;

    lightboxImage.src = sourceImage.src;
    lightboxImage.alt = sourceImage.alt;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("premium-lightbox-open");
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("premium-lightbox-open");
    if (galleryButtons[currentIndex]) galleryButtons[currentIndex].focus();
  }

  galleryButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  prevButton.addEventListener("click", function (event) {
    event.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", function (event) {
    event.stopPropagation();
    showImage(currentIndex + 1);
  });

  closeButton.addEventListener("click", function (event) {
    event.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    }
  });
})();

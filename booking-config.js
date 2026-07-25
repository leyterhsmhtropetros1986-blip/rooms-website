/**
 * Asteria Apartments — Site Configuration
 * =========================================
 * This is the SINGLE file to manage all configurable links and media.
 *
 * BOOKING PLATFORMS
 * -----------------
 *   bookingCom — paste your full Booking.com property URL
 *   airbnb     — paste your full Airbnb listing URL
 *   direct     — leave as "#booking" to scroll to the on-site enquiry form,
 *                or replace with an external booking form / Calendly URL
 *
 * Set a booking URL to "" (empty string) to hide that platform card.
 *
 * VIDEO
 * -----
 *   videoUrl   — embed URL for a YouTube, Vimeo, or direct video file.
 *                Leave as "" to hide the video section entirely.
 *
 *                YouTube embed example:
 *                  "https://www.youtube.com/embed/VIDEO_ID"
 *                Vimeo embed example:
 *                  "https://player.vimeo.com/video/VIDEO_ID"
 *                Direct MP4 example:
 *                  "videos/asteria-tour.mp4"
 *
 *   videoType  — set to "youtube", "vimeo", or "mp4".
 *                If left as "" the script will auto-detect from the URL.
 *
 *   videoTitle — accessible title for the video iframe/player.
 *
 * Examples:
 *   bookingCom: "https://www.booking.com/hotel/gr/asteria-apartments.html",
 *   airbnb:     "https://www.airbnb.com/rooms/123456789",
 *   videoUrl:   "https://www.youtube.com/embed/dQw4w9WgXcQ",
 */
const BOOKING_CONFIG = {
  bookingCom: "",   // TODO: add your Booking.com listing URL
  airbnb:     "",   // TODO: add your Airbnb listing URL
  direct:     "#booking",

  /* ── Video configuration ─────────────────────────────────── */
  videoUrl:   "",   // TODO: add embed URL to activate the video section
  videoType:  "",   // "youtube" | "vimeo" | "mp4" | "" (auto-detect)
  videoTitle: "Asteria Apartments — Virtual Tour",
};

/* ── Apply URLs to platform cards ──────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".platform-card[data-platform]");

  cards.forEach(function (card) {
    const platform = card.getAttribute("data-platform");
    const url = BOOKING_CONFIG[platform];

    if (url === "" || url == null) {
      /* Hide cards whose URL has not been configured yet */
      card.style.display = "none";
    } else {
      card.href = url;
    }
  });

  /* If all platform cards are hidden, hide the whole section */
  const section = document.getElementById("book-online");
  if (section) {
    const visible = section.querySelectorAll(".platform-card:not([style*='display: none'])");
    if (visible.length === 0) {
      section.style.display = "none";
    }
  }

  /* ── Video section ────────────────────────────────────────── */
  const videoSection = document.getElementById("video-section");
  if (!videoSection) return;

  const rawUrl = (BOOKING_CONFIG.videoUrl || "").trim();

  if (!rawUrl) {
    /* No video configured — placeholder stays visible */
    return;
  }

  /* Auto-detect type if not set */
  let type = (BOOKING_CONFIG.videoType || "").trim().toLowerCase();
  if (!type) {
    if (rawUrl.includes("youtube.com") || rawUrl.includes("youtu.be")) {
      type = "youtube";
    } else if (rawUrl.includes("vimeo.com")) {
      type = "vimeo";
    } else {
      type = "mp4";
    }
  }

  const container = videoSection.querySelector(".video-embed-container");
  if (!container) return;

  const title = BOOKING_CONFIG.videoTitle || "Asteria Apartments — Video";

  if (type === "mp4") {
    const video       = document.createElement("video");
    video.src         = rawUrl;
    video.controls    = true;
    video.className   = "video-player";
    video.setAttribute("aria-label", title);
    container.innerHTML = "";
    container.appendChild(video);
  } else {
    const iframe             = document.createElement("iframe");
    iframe.src               = rawUrl;
    iframe.title             = title;
    iframe.className         = "video-iframe";
    iframe.allowFullscreen   = true;
    iframe.loading           = "lazy";
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    iframe.setAttribute("allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    container.innerHTML = "";
    container.appendChild(iframe);
  }

  /* Remove placeholder once a real embed is injected */
  const placeholder = videoSection.querySelector(".video-placeholder");
  if (placeholder) placeholder.remove();
});

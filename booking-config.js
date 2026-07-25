/**
 * Booking Platform Configuration
 * ================================
 * Edit the URLs in BOOKING_CONFIG below to connect your real listing pages.
 * This is the SINGLE place to manage all external booking links —
 * the same values are used everywhere on the site automatically.
 *
 * How to configure:
 *   bookingCom — paste your full Booking.com property URL
 *   airbnb     — paste your full Airbnb listing URL
 *   direct     — leave as "#booking" to scroll to the on-site enquiry form,
 *                or replace with an external booking form / Calendly URL
 *
 * Set a value to "" (empty string) to hide that platform card.
 *
 * Example:
 *   bookingCom: "https://www.booking.com/hotel/gr/asteria-apartments.html",
 *   airbnb:     "https://www.airbnb.com/rooms/123456789",
 */
const BOOKING_CONFIG = {
  bookingCom: "",   // TODO: add your Booking.com listing URL
  airbnb:     "",   // TODO: add your Airbnb listing URL
  direct:     "#booking",
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
});

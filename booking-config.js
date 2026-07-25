/**
 * ASTERIA APARTMENTS — Booking Platform Configuration
 * =====================================================
 * All external booking platform URLs in one place.
 * Set a URL to an empty string ("") to hide that platform's card.
 *
 * HOW TO UPDATE
 * ─────────────
 * Replace the URL strings below. The booking section on the
 * homepage will automatically show or hide each card.
 *
 * Example:
 *   bookingCom: "https://www.booking.com/hotel/gr/your-property.html"
 *   airbnb:     "https://www.airbnb.gr/rooms/your-listing-id"
 *   direct:     "#booking"   ← links to the on-page booking form
 */

/* global BOOKING_CONFIG */
var BOOKING_CONFIG = {
  /**
   * Booking.com property page URL.
   * Leave empty to hide the Booking.com card.
   */
  bookingCom: "",

  /**
   * Airbnb listing URL.
   * Leave empty to hide the Airbnb card.
   */
  airbnb: "",

  /**
   * Direct booking URL — can be an on-page anchor or external form.
   * Default: scrolls to the on-page booking form.
   */
  direct: "#booking",
};

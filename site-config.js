/**
 * ASTERIA APARTMENTS — Site Configuration
 * =========================================
 * Single source of truth for all images and editable site content.
 *
 * HOW TO REPLACE AN IMAGE
 * ───────────────────────
 * 1. Upload the new image to the `images/` folder.
 * 2. Update the matching property below.
 * 3. The homepage picks up the change automatically.
 *
 * FUTURE: ADMIN IMAGE UPLOAD
 * ──────────────────────────
 * When the admin dashboard supports image upload, this config
 * will be served from the backend instead of being a static file.
 *
 * Required backend endpoint:
 *   GET  /api/site-config          → returns this object as JSON
 *   POST /api/site-config/images   → upload image, returns { url }
 *   PUT  /api/site-config          → persist updated config to DB/storage
 *
 * The frontend renderer (site-renderer in script.js) will fetch
 * from the API when available and fall back to these defaults.
 *
 * ENVIRONMENT VARIABLES REQUIRED (future backend)
 * ────────────────────────────────────────────────
 *   STORAGE_PROVIDER=local|s3|cloudinary
 *   S3_BUCKET=your-bucket-name          (if S3)
 *   CLOUDINARY_CLOUD_NAME=...           (if Cloudinary)
 *   CLOUDINARY_API_KEY=...              (if Cloudinary)
 *   CLOUDINARY_API_SECRET=...           (if Cloudinary)
 */

/* global SITE_CONFIG */
var EXTERIOR_HERO_IMAGE = "images/exterior-01.jpg";

var SITE_CONFIG = {

  /* ── Background / hero images ──────────────────────────────── */
  images: {
    /** Full-screen hero background */
    hero:     EXTERIOR_HERO_IMAGE,

    /** About section — shown beside the text */
    about:    EXTERIOR_HERO_IMAGE,

    /** Offers section — darkened background */
    offers:   EXTERIOR_HERO_IMAGE,

    /** Footer — very dark overlay applied on top */
    footer:   "images/exterior-05.jpg",

    /** Location section image */
    location: "images/exterior-05.jpg",

    /** Gallery items — order controls display order */
    gallery: [
      { src: "images/exterior-01.jpg", alt: "Πρόσοψη του Asteria Apartments με τον εξωτερικό χώρο" },
      { src: "images/exterior-02.jpg", alt: "Εξωτερικό καθιστικό του καταλύματος στο Νιμπορειό" },
      { src: "images/exterior-03.jpg", alt: "Κήπος και είσοδος των διαμερισμάτων" },
      { src: "images/exterior-04.jpg", alt: "Μπαλκόνια με θέα στον εξωτερικό χώρο του καταλύματος" },
      { src: "images/exterior-05.jpg", alt: "Απογευματινή άποψη του εξωτερικού χώρου του Asteria Apartments" },
    ],

    /** Room cards — must match room order in HTML */
    rooms: [
      { src: "images/exterior-02.jpg", alt: "Εξωτερικό καθιστικό του καταλύματος στο Νιμπορειό" },
      { src: "images/exterior-03.jpg", alt: "Κήπος και είσοδος των διαμερισμάτων" },
      { src: "images/exterior-04.jpg", alt: "Μπαλκόνια με θέα στον εξωτερικό χώρο του καταλύματος" },
    ],
  },

  /* ── Contact details ────────────────────────────────────────── */
  contact: {
    phone:        "+30 694 788 3098",
    phoneHref:    "tel:+306947883098",
    whatsapp:     "+30 693 696 0328",
    whatsappHref: "https://wa.me/306936960328",
    viber:        "+30 693 696 0328",
    viberHref:    "viber://chat?number=%2B306936960328",
    email:        "info@example.gr",
    location:     "Νιμπορειό Ευβοίας, Νότια Εύβοια",
    hours:        "Καθημερινά 09:00–21:00",
    mapsUrl:      "https://maps.app.goo.gl/kTvWVXG8Cv5SHYaw6",
  },

  /* ── Social links (set to empty string to hide) ─────────────── */
  social: {
    instagram: "",
    facebook:  "",
    tiktok:    "",
  },
};

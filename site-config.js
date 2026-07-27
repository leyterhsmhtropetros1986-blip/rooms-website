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
    /** Full-screen hero background — the property's "entrance" shot */
    hero:     EXTERIOR_HERO_IMAGE,

    /** About section — shown beside the text */
    about:    EXTERIOR_HERO_IMAGE,

    /** Offers section — darkened background */
    offers:   EXTERIOR_HERO_IMAGE,

    /** Footer — very dark overlay applied on top */
    footer:   "images/exterior-05.jpg",

    /** Location section image */
    location: "images/exterior-05.jpg",

    /** Gallery items, grouped into categories — each category renders as
     * its own scrollable row. Order within a category controls display
     * order; the category key must match a data-gallery-category
     * attribute in the HTML. */
    gallery: {
      rooms: [
        { src: "images/bedroom-mirror.jpg",           alt: "Υπνοδωμάτιο με καθρέφτη και θέα προς την τραπεζαρία" },
        { src: "images/bedroom-balcony.jpg",          alt: "Φωτεινό υπνοδωμάτιο με πρόσβαση σε βεράντα" },
        { src: "images/bedroom-wardrobe.jpg",         alt: "Υπνοδωμάτιο με ντουλάπα, κλιματισμό και πρόσβαση σε βεράντα" },
        { src: "images/bathroom-modern.jpg",          alt: "Σύγχρονο μπάνιο με μαύρο νιπτήρα και ντουζιέρα με κρύσταλλο" },
        { src: "images/bathroom-balcony-collage.jpg", alt: "Μπάνιο και βεράντα με θέα στη θάλασσα" },
      ],
      exterior: [
        { src: "images/exterior-01.jpg",           alt: "Πρόσοψη του Asteria Apartments με τον εξωτερικό χώρο" },
        { src: "images/exterior-02.jpg",           alt: "Εξωτερικό καθιστικό του καταλύματος στο Νιμπορειό" },
        { src: "images/exterior-03.jpg",           alt: "Κήπος και είσοδος των διαμερισμάτων" },
        { src: "images/exterior-04.jpg",           alt: "Μπαλκόνια με θέα στον εξωτερικό χώρο του καταλύματος" },
        { src: "images/exterior-05.jpg",           alt: "Απογευματινή άποψη του εξωτερικού χώρου του Asteria Apartments" },
        { src: "images/balcony-sea-view.jpg",      alt: "Βεράντα με τραπέζι, καρέκλες και θέα στη θάλασσα" },
        { src: "images/veranda.jpg",               alt: "Σκεπαστή βεράντα με τραπέζι για χαλάρωση και φαγητό" },
        { src: "images/door-numbers.jpg",          alt: "Φωτισμένες πινακίδες με τους αριθμούς των διαμερισμάτων" },
        { src: "images/garden-aerial-collage.jpg", alt: "Κήπος του καταλύματος με θέα στη θάλασσα και στα δέντρα" },
        { src: "images/garden-dining.jpg",         alt: "Σκιερός κήπος με τραπέζι για φαγητό κάτω από τα δέντρα" },
        { src: "images/garden-view.jpg",           alt: "Κήπος με αμπέλι και θέα στο σπίτι" },
        { src: "images/garden-flowers.jpg",        alt: "Έντονα ροζ γεράνια στον κήπο του καταλύματος" },
      ],
      beach: [
        { src: "images/beach-view.jpg",    alt: "Κοντινή παραλία με ξαπλώστρα και κρυστάλλινα νερά" },
        { src: "images/beach-rowboat.jpg", alt: "Παραδοσιακή βάρκα σε αμμώδη παραλία με γαλάζια νερά" },
        { src: "images/beach-pebbles.jpg", alt: "Παραλία με γαλάζια βότσαλα και κρυστάλλινα νερά" },
        { src: "images/beach-harbor.jpg",  alt: "Μικρό λιμανάκι με βάρκες κοντά στην παραλία" },
      ],
    },

    /** Room cards — must match room order in HTML (real interior photos,
     * never exterior shots). Each room now has a small carousel of
     * "images" instead of a single photo — one bedroom shot plus the
     * two shared bathroom photos. */
    rooms: [
      {
        images: [
          { src: "images/bedroom-mirror.jpg",           alt: "Υπνοδωμάτιο με καθρέφτη και θέα προς την τραπεζαρία" },
          { src: "images/bathroom-modern.jpg",          alt: "Σύγχρονο μπάνιο με μαύρο νιπτήρα και ντουζιέρα με κρύσταλλο" },
          { src: "images/bathroom-balcony-collage.jpg", alt: "Μπάνιο και βεράντα με θέα στη θάλασσα" },
        ],
      },
      {
        images: [
          { src: "images/bedroom-balcony.jpg",          alt: "Φωτεινό υπνοδωμάτιο με πρόσβαση σε βεράντα" },
          { src: "images/bathroom-modern.jpg",          alt: "Σύγχρονο μπάνιο με μαύρο νιπτήρα και ντουζιέρα με κρύσταλλο" },
          { src: "images/bathroom-balcony-collage.jpg", alt: "Μπάνιο και βεράντα με θέα στη θάλασσα" },
        ],
      },
      {
        images: [
          { src: "images/bedroom-wardrobe.jpg",         alt: "Υπνοδωμάτιο με ντουλάπα, κλιματισμό και πρόσβαση σε βεράντα" },
          { src: "images/bathroom-modern.jpg",          alt: "Σύγχρονο μπάνιο με μαύρο νιπτήρα και ντουζιέρα με κρύσταλλο" },
          { src: "images/bathroom-balcony-collage.jpg", alt: "Μπάνιο και βεράντα με θέα στη θάλασσα" },
        ],
      },
    ],
  },

  /* ── Contact details ────────────────────────────────────────── */
  contact: {
    phone:        "+30 694 788 3098",
    phoneHref:    "tel:+306947883098",
    /* Digits only, no spaces/plus — used raw in wa.me URLs by the
     * booking form (premium-features.js). A formatted value here
     * (e.g. "+30 693 ...") breaks the WhatsApp deep link. */
    whatsapp:     "306932069632",
    whatsappHref: "https://wa.me/306936960328",
    viber:        "+30 693 696 0328",
    viberHref:    "viber://chat?number=%2B306936960328",
    email:        "info@example.gr",
    location:     "Νιμπορειό Ευβοίας, Νότια Εύβοια",
    hours:        "Καθημερινά 09:00–21:00",
    mapsUrl:      "https://www.google.com/maps/search/?api=1&query=38.123177,24.215265",
  },

  /* ── Social links (set to empty string to hide) ─────────────── */
  social: {
    instagram: "",
    facebook:  "",
    tiktok:    "",
  },

  /* ── Hiking trail, shown on the "Πεζοπορία" (Hiking) card ─────
   * Both fields are optional — leave either as "" to hide its link.
   *
   *   mapUrl → link to view the route on a map (Google Maps,
   *            Wikiloc, AllTrails, komoot, etc. — anything with a
   *            shareable URL works).
   *   gpxUrl → path to a downloadable .gpx track file for GPS
   *            devices / hiking apps. Upload the .gpx file into a
   *            "trails/" folder next to "images/" and point here,
   *            e.g. "trails/paralia-loop.gpx".
   */
  hiking: {
    mapUrl: "",
    gpxUrl: "",
  },
};

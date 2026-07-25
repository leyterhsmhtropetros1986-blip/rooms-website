/**
 * ASTERIA APARTMENTS — Bilingual EL / EN Support
 * ================================================
 * Usage in HTML:
 *   data-i18n="key"             → sets textContent
 *   data-i18n-html="key"        → sets innerHTML  (for <br>, &amp; etc.)
 *   data-i18n-placeholder="key" → sets placeholder
 *   data-i18n-aria="key"        → sets aria-label
 *   data-i18n-title="key"       → sets title attribute
 *   data-i18n-alt="key"         → sets alt attribute (img)
 *
 * Language stored in localStorage under key "asteria_lang".
 * Default language: "el" (Greek).
 */

/* global window, document, localStorage */
"use strict";

var TRANSLATIONS = {
  el: {
    /* ── Page ─────────────────────────────────────────────────── */
    "page.title": "Asteria Apartments | Πολυτελής Διαμονή στη Νότια Εύβοια",

    /* ── Skip link ─────────────────────────────────────────────── */
    "skip": "Μετάβαση στο κύριο περιεχόμενο",

    /* ── Navigation ────────────────────────────────────────────── */
    "nav.about":    "Το κατάλυμα",
    "nav.rooms":    "Δωμάτια",
    "nav.amenities":"Παροχές",
    "nav.gallery":  "Φωτογραφίες",
    "nav.offers":   "Προσφορές",
    "nav.location": "Τοποθεσία",
    "nav.contact":  "Επικοινωνία",
    "nav.book":     "Κράτηση",
    "nav.menu.open":  "Άνοιγμα μενού πλοήγησης",
    "nav.menu.close": "Κλείσιμο μενού πλοήγησης",

    /* ── Hero ──────────────────────────────────────────────────── */
    "hero.eyebrow":   "Αυθεντική φιλοξενία · Νότια Εύβοια",
    "hero.title":     "Ηρεμία,<br>άνεση &amp;<br>αξέχαστες στιγμές",
    "hero.lead":      "Boutique κατάλυμα στο Νιμπορειό Ευβοίας — προσεγμένα δωμάτια, ζεστή φιλοξενία και ιδανική τοποθεσία για ξεκούραστες διακοπές.",
    "hero.btn.rooms": "Ανακαλύψτε τα δωμάτια",
    "hero.btn.book":  "Έλεγχος διαθεσιμότητας",
    "hero.stat1":     "Τύποι δωματίων",
    "hero.stat2":     "Ιδιωτικά μπάνια",
    "hero.stat3":     "Επικοινωνία",
    "hero.stats.aria":"Στατιστικά καταλύματος",
    "hero.scroll":    "Ανακαλύψτε",
    "hero.scroll.aria":"Μετάβαση στην επόμενη ενότητα",

    /* ── About ─────────────────────────────────────────────────── */
    "about.label": "Το κατάλυμα",
    "about.title": "Μια εμπειρία<br>διαμονής με<br>έμφαση στη λεπτομέρεια",
    "about.lead":  "Το Asteria Apartments δημιουργήθηκε για επισκέπτες που αναζητούν καθαριότητα, άνεση και φιλική εξυπηρέτηση.",
    "about.body":  "Κάθε δωμάτιο είναι προσεγμένο ώστε να σας προσφέρει όλα όσα χρειάζεστε — είτε ταξιδεύετε ως ζευγάρι, οικογένεια ή παρέα.",
    "about.f1.name": "Καθαριότητα",
    "about.f1.desc": "Προσεγμένοι χώροι και υψηλά πρότυπα υγιεινής",
    "about.f2.name": "Άνεση",
    "about.f2.desc": "Σύγχρονες παροχές για ευχάριστη διαμονή",
    "about.f3.name": "Φιλοξενία",
    "about.f3.desc": "Προσωπική εξυπηρέτηση πριν και κατά τη διαμονή",
    "about.f4.name": "Τοποθεσία",
    "about.f4.desc": "Παραθαλάσσιο σημείο με εύκολη πρόσβαση",
    "about.badge.village": "Νιμπορειό",
    "about.badge.region":  "Νότια Εύβοια",
    "about.img.alt": "Εξωτερική άποψη του Asteria Apartments",

    /* ── Rooms ─────────────────────────────────────────────────── */
    "rooms.label": "Διαμονή",
    "rooms.title": "Επιλέξτε<br>το δωμάτιό σας",
    "rooms.lead":  "Τρεις κατηγορίες δωματίων σχεδιασμένες για ζευγάρια, οικογένειες και παρέες — με όλες τις παροχές που χρειάζεστε.",
    "rooms.from":    "Από",
    "rooms.enquire": "Επικοινωνήστε",
    "rooms.book":    "Κράτηση",

    "room1.badge":    "Για 2 επισκέπτες",
    "room1.capacity": "Άνετη διαμονή για δύο",
    "room1.name":     "Deluxe δίκλινο",
    "room1.desc":     "Κομψό και άνετο δωμάτιο, ιδανικό για ζευγάρια που αναζητούν ξεκούραση και πρακτικές παροχές.",
    "room1.tag1":     "🛏 Διπλό κρεβάτι",
    "room1.tag2":     "🚿 Ιδιωτικό μπάνιο",
    "room1.tag3":     "❄️ A/C",
    "room1.tag4":     "📶 Wi-Fi",
    "room1.tag5":     "📺 TV",
    "room1.tag6":     "🌿 Μπαλκόνι",

    "room2.badge":    "Δημοφιλής επιλογή",
    "room2.capacity": "Έως 3 επισκέπτες",
    "room2.name":     "Superior τρίκλινο",
    "room2.desc":     "Ευρύχωρη επιλογή για μικρές οικογένειες ή παρέες, με άνετη διαρρύθμιση και όλες τις βασικές παροχές.",
    "room2.tag1":     "🛏 Διπλό + μονό",
    "room2.tag2":     "🚿 Ιδιωτικό μπάνιο",
    "room2.tag3":     "❄️ A/C",
    "room2.tag4":     "🧊 Ψυγείο",
    "room2.tag5":     "📶 Wi-Fi",
    "room2.tag6":     "🌿 Μπαλκόνι",

    "room3.badge":    "Για οικογένειες",
    "room3.capacity": "Έως 4 επισκέπτες",
    "room3.name":     "Family δωμάτιο",
    "room3.desc":     "Ευρύχωρη και πρακτική επιλογή για οικογένειες, με άνετα κρεβάτια και λειτουργική διαρρύθμιση.",
    "room3.tag1":     "🛏 Οικογενειακή διαρρύθμιση",
    "room3.tag2":     "🚿 Ιδιωτικό μπάνιο",
    "room3.tag3":     "❄️ A/C",
    "room3.tag4":     "📺 TV",
    "room3.tag5":     "🧊 Ψυγείο",
    "room3.tag6":     "🗄 Αποθήκευση",

    /* ── Amenities ─────────────────────────────────────────────── */
    "amenities.label": "Παροχές",
    "amenities.title": "Όλα όσα χρειάζεστε για μια άνετη διαμονή",
    "amenities.lead":  "Οι χώροι μας είναι πλήρως εξοπλισμένοι με πρακτικές παροχές που κάνουν τη διαμονή σας πιο ευχάριστη.",
    "am1.name": "Δωρεάν Wi-Fi",
    "am1.desc": "Γρήγορη σύνδεση στο διαδίκτυο σε όλους τους χώρους.",
    "am2.name": "Κλιματισμός",
    "am2.desc": "Ιδανική θερμοκρασία καθ' όλη τη διάρκεια της διαμονής.",
    "am3.name": "Ιδιωτικό μπάνιο",
    "am3.desc": "Καθαρός, σύγχρονος και πλήρως εξοπλισμένος χώρος.",
    "am4.name": "Τηλεόραση",
    "am4.desc": "Ψυχαγωγία και ενημέρωση μέσα στο δωμάτιό σας.",
    "am5.name": "Χώρος στάθμευσης",
    "am5.desc": "Εύκολη πρόσβαση και δωρεάν στάθμευση κοντά στο κατάλυμα.",
    "am6.name": "Ψυγείο",
    "am6.desc": "Πρακτική παροχή για ποτά, τρόφιμα και καθημερινές ανάγκες.",
    "am7.name": "Μπαλκόνι",
    "am7.desc": "Ιδιωτικός εξωτερικός χώρος για στιγμές χαλάρωσης.",
    "am8.name": "Καθαριότητα",
    "am8.desc": "Τακτική καθαριότητα για άνετη και ασφαλή διαμονή.",

    /* ── Gallery ───────────────────────────────────────────────── */
    "gallery.label":    "Gallery",
    "gallery.title":    "Γνωρίστε<br>τους χώρους μας",
    "gallery.lead":     "Περιηγηθείτε στις φωτογραφίες και ανακαλύψτε την ατμόσφαιρα του Asteria Apartments.",
    "gallery.grid.aria":"Φωτογραφίες εξωτερικών χώρων",
    "gallery.btn1.aria":"Άνοιγμα φωτογραφίας 1",
    "gallery.btn2.aria":"Άνοιγμα φωτογραφίας 2",
    "gallery.btn3.aria":"Άνοιγμα φωτογραφίας 3",
    "gallery.btn4.aria":"Άνοιγμα φωτογραφίας 4",
    "gallery.btn5.aria":"Άνοιγμα φωτογραφίας 5",
    "gallery.img1.alt": "Πρόσοψη του Asteria Apartments με τον εξωτερικό χώρο",
    "gallery.img2.alt": "Εξωτερικό καθιστικό του καταλύματος στο Νιμπορειό",
    "gallery.img3.alt": "Κήπος και είσοδος των διαμερισμάτων",
    "gallery.img4.alt": "Μπαλκόνια με θέα στον εξωτερικό χώρο του καταλύματος",
    "gallery.img5.alt": "Απογευματινή άποψη του εξωτερικού χώρου του Asteria Apartments",

    /* ── Offers ────────────────────────────────────────────────── */
    "offers.label": "Προσφορές",
    "offers.title": "Ειδικές προσφορές για αξέχαστες διακοπές",
    "offers.lead":  "Επικοινωνήστε μαζί μας για τρέχουσες τιμές και ειδικές προσφορές.",
    "offers.cta":   "Μάθετε περισσότερα",
    "offer1.badge": "Ζευγάρια",
    "offer1.desc":  "Ιδανική επιλογή για ζευγάρια που αναζητούν ρομαντική απόδραση στη Νότια Εύβοια.",
    "offer1.li1":   "Deluxe δίκλινο δωμάτιο",
    "offer1.li2":   "Πρωινό στο δωμάτιο",
    "offer1.li3":   "Late check-out",
    "offer2.badge": "Οικογένειες",
    "offer2.desc":  "Ευρύχωρη διαμονή για όλη την οικογένεια, με παιδόφιλο περιβάλλον και εξυπηρέτηση.",
    "offer2.li1":   "Family δωμάτιο",
    "offer2.li2":   "Ελεύθερη στάθμευση",
    "offer2.li3":   "Συμβουλές για εξορμήσεις",
    "offer3.badge": "Παρέες",
    "offer3.desc":  "Κρατήστε περισσότερα δωμάτια ταυτόχρονα και απολαύστε ειδική τιμή για ομαδικές κρατήσεις.",
    "offer3.li1":   "Πολλαπλά δωμάτια",
    "offer3.li2":   "Ειδική τιμή ομάδας",
    "offer3.li3":   "Άμεση επικοινωνία",

    /* ── Reviews ───────────────────────────────────────────────── */
    "reviews.label":             "Αξιολογήσεις",
    "reviews.title":             "Οι εμπειρίες<br>των επισκεπτών μας",
    "reviews.lead":              "Πραγματικές αξιολογήσεις από τους επισκέπτες μας. Κάθε κριτική εγκρίνεται πριν δημοσιευθεί.",
    "reviews.stars.aria":        "Πέντε αστέρια",
    "reviews.placeholder.title": "Προσθέστε πραγματικές κριτικές",
    "reviews.placeholder.desc":  "Δεν δημοσιεύουμε κατασκευασμένες αξιολογήσεις. Αυτή η ενότητα είναι έτοιμη να συνδεθεί με εγκεκριμένες κριτικές από Google, Booking.com ή Airbnb.",
    "reviews.write.btn":         "Γράψτε μια κριτική",
    "reviewform.title":          "Μοιραστείτε την εμπειρία σας",
    "reviewform.lead":           "Η κριτική σας θα εξεταστεί από τον διαχειριστή πριν δημοσιευθεί. Εκτιμούμε κάθε αυθεντική γνώμη.",
    "reviewform.name.label":     "Όνομα",
    "reviewform.name.ph":        "π.χ. Μαρία Παπαδοπούλου",
    "reviewform.email.label":    "Email",
    "reviewform.email.optional": "(προαιρετικό)",
    "reviewform.rating.label":   "Βαθμολογία",
    "reviewform.rating.aria":    "Επιλέξτε αριθμό αστεριών",
    "reviewform.star5.title":    "5 αστέρια",
    "reviewform.star4.title":    "4 αστέρια",
    "reviewform.star3.title":    "3 αστέρια",
    "reviewform.star2.title":    "2 αστέρια",
    "reviewform.star1.title":    "1 αστέρι",
    "reviewform.date.label":     "Ημερομηνία διαμονής",
    "reviewform.text.label":     "Κριτική",
    "reviewform.text.ph":        "Πείτε μας για την εμπειρία διαμονής σας…",
    "reviewform.consent":        "Συμφωνώ με την αποθήκευση των στοιχείων μου για σκοπούς επαλήθευσης και δημοσίευσης της κριτικής μου, σύμφωνα με την πολιτική απορρήτου.",
    "reviewform.notice":         "ℹ️ Οι κριτικές δεν δημοσιεύονται αυτόματα. Κάθε αξιολόγηση εξετάζεται από τον διαχειριστή πριν εμφανιστεί δημόσια.",
    "reviewform.submit":         "Αποστολή κριτικής",

    /* ── Booking ───────────────────────────────────────────────── */
    "booking.label":        "Άμεσο αίτημα",
    "booking.title":        "Ελέγξτε διαθεσιμότητα",
    "booking.lead":         "Συμπληρώστε τις ημερομηνίες και στείλτε αίτημα μέσω WhatsApp.",
    "booking.arrival":      "Άφιξη",
    "booking.arrival.aria": "Ημερομηνία άφιξης",
    "booking.departure":      "Αναχώρηση",
    "booking.departure.aria": "Ημερομηνία αναχώρησης",
    "booking.adults":      "Ενήλικες",
    "booking.adults.aria": "Αριθμός ενηλίκων",
    "booking.adult1": "1 ενήλικας",
    "booking.adult2": "2 ενήλικες",
    "booking.adult3": "3 ενήλικες",
    "booking.adult4": "4 ενήλικες",
    "booking.adult5": "5 ενήλικες",
    "booking.adult6": "6 ενήλικες",
    "booking.children":      "Παιδιά",
    "booking.children.aria": "Αριθμός παιδιών",
    "booking.child0": "Χωρίς παιδιά",
    "booking.child1": "1 παιδί",
    "booking.child2": "2 παιδιά",
    "booking.child3": "3 παιδιά",
    "booking.child4": "4 παιδιά",
    "booking.room":      "Δωμάτιο",
    "booking.room.aria": "Τύπος δωματίου",
    "booking.room0": "Χωρίς προτίμηση",
    "booking.room1": "Deluxe δίκλινο",
    "booking.room2": "Superior τρίκλινο",
    "booking.room3": "Family δωμάτιο",
    "booking.submit":           "Αποστολή αιτήματος →",
    "booking.platforms.aria":   "Πλατφόρμες κράτησης",
    "booking.summary.default":  "Επιλέξτε ημερομηνίες για να εμφανιστούν οι διανυκτερεύσεις.",

    /* ── Location ──────────────────────────────────────────────── */
    "location.label": "Τοποθεσία",
    "location.title": "Ιδανικό σημείο για να εξερευνήσετε τη Νότια Εύβοια",
    "location.lead":  "Το Asteria Apartments βρίσκεται στο Νιμπορειό Ευβοίας, σε ήσυχο παραθαλάσσιο σημείο με εύκολη πρόσβαση και εντυπωσιακή φύση.",
    "loc.h0.name": "Παραλία",
    "loc.h0.desc": "Μικρή απόσταση από τη θάλασσα",
    "loc.h1.name": "Εστίαση",
    "loc.h1.desc": "Κοντά σε ταβέρνες, καφέ και αγορά",
    "loc.h2.name": "Πρόσβαση",
    "loc.h2.desc": "Εύκολη πρόσβαση με αυτοκίνητο",
    "loc.h3.name": "Εξορμήσεις",
    "loc.h3.desc": "Βάση για ημερήσιες εξορμήσεις στην Εύβοια",
    "loc.btn1": "📍 Άνοιγμα στο Google Maps",
    "loc.btn2": "Οδηγίες πλοήγησης →",
    "loc.card.label":  "Τοποθεσία",
    "loc.card.name":   "Νιμπορειό Ευβοίας",
    "loc.card.region": "Νότια Εύβοια, Ελλάδα",
    "loc.map.title":   "Χάρτης Νιμπορειού Ευβοίας",

    /* ── Nearby ────────────────────────────────────────────────── */
    "nearby.label": "Γύρω από το κατάλυμα",
    "nearby.title": "Ανακαλύψτε τη Νότια Εύβοια",
    "nearby.lead":  "Χρησιμοποιήστε το κατάλυμα ως βάση για θάλασσα, φαγητό, βόλτες και ημερήσιες εξορμήσεις.",
    "nearby1.name": "Παραλίες",
    "nearby1.desc": "Εξερευνήστε τις παραλίες και τους ήσυχους όρμους της περιοχής.",
    "nearby2.name": "Τοπική γαστρονομία",
    "nearby2.desc": "Ανακαλύψτε ταβέρνες και τοπικές γεύσεις της Νότιας Εύβοιας.",
    "nearby3.name": "Πεζοπορία",
    "nearby3.desc": "Απολαύστε διαδρομές στη φύση και σημεία με εντυπωσιακή θέα.",
    "nearby4.name": "Εξορμήσεις",
    "nearby4.desc": "Οργανώστε εύκολα κοντινές επισκέψεις σε χωριά και αξιοθέατα.",

    /* ── Contact ───────────────────────────────────────────────── */
    "contact.label": "Επικοινωνία",
    "contact.title": "Κάντε το πρώτο βήμα για τη διαμονή σας",
    "contact.lead":  "Επικοινωνήστε απευθείας μαζί μας για τιμές, διαθέσιμες ημερομηνίες και οποιαδήποτε πληροφορία χρειάζεστε.",
    "contact.btn.call":  "📞 Καλέστε μας",
    "contact.links.aria":"Τρόποι επικοινωνίας",
    "contact.row1.name": "Τηλέφωνο",
    "contact.row2.name": "WhatsApp / Viber",
    "contact.row3.name": "Email",
    "contact.row4.name": "Τοποθεσία",
    "contact.row4.val":  "Νιμπορειό Ευβοίας, Νότια Εύβοια",
    "contact.hours.title": "Ώρες επικοινωνίας",
    "contact.hours.desc":  "Είμαστε πάντα διαθέσιμοι για να σας βοηθήσουμε.",
    "contact.hours.mf":    "Δευτέρα – Παρασκευή",
    "contact.hours.ss":    "Σαββατοκύριακο",
    "contact.hours.wa":    "WhatsApp / Viber",
    "contact.hours.always":"Πάντα διαθέσιμοι",
    "contact.email.btn":   "Αποστολή email",

    /* ── Footer ────────────────────────────────────────────────── */
    "footer.brand":          "Boutique κατάλυμα στο Νιμπορειό Ευβοίας — άνεση, καθαριότητα και αυθεντική ελληνική φιλοξενία.",
    "footer.nav.title":      "Πλοήγηση",
    "footer.nav.aria":       "Πλοήγηση",
    "footer.contact.title":  "Επικοινωνία",
    "footer.contact.aria":   "Επικοινωνία",
    "footer.location1":      "Νιμπορειό Ευβοίας",
    "footer.location2":      "Νότια Εύβοια, Ελλάδα",
    "footer.newsletter.title":"Newsletter",
    "footer.newsletter.desc": "Εγγραφείτε για να λαμβάνετε ειδικές προσφορές και νέα από το κατάλυμα.",
    "footer.newsletter.ph":   "email@example.com",
    "footer.newsletter.aria": "Email για newsletter",
    "footer.newsletter.btn":  "Εγγραφή",
    "footer.newsletter.notice":"* Η εγγραφή ενεργοποιείται μόλις διαμορφωθεί το backend.",
    "footer.social.aria":     "Κοινωνικά δίκτυα",
    "footer.copyright":       "© 2026 Asteria Apartments. Όλα τα δικαιώματα διατηρούνται.",
    "footer.legal.aria":      "Νομικό πλαίσιο",
    "footer.legal1":          "Πολιτική απορρήτου",
    "footer.legal2":          "Όροι χρήσης",
    "footer.legal3":          "Πολιτική ακύρωσης",

    /* ── Floating dock ─────────────────────────────────────────── */
    "dock.aria":       "Γρήγορη επικοινωνία",
    "dock.call.aria":  "Τηλεφωνική κλήση",
    "dock.call.title": "Τηλέφωνο",
    "dock.wa.aria":    "WhatsApp",
    "dock.viber.aria": "Viber",

    /* ── Scroll-to-top ─────────────────────────────────────────── */
    "scrolltop.aria":  "Επιστροφή στην κορυφή",
    "scrolltop.title": "Επιστροφή στην κορυφή",

    /* ── Lightbox ──────────────────────────────────────────────── */
    "lightbox.aria":       "Προβολή φωτογραφίας",
    "lightbox.close.aria": "Κλείσιμο",
    "lightbox.prev.aria":  "Προηγούμενη φωτογραφία",
    "lightbox.next.aria":  "Επόμενη φωτογραφία",
    "lightbox.dialog.aria":"Προβολή φωτογραφίας",

    /* ── Extra aliases to match HTML data-i18n keys ─────────────── */
    "contact.nav.aria":          "Τρόποι επικοινωνίας",
    "contact.btn.wa":            "WhatsApp",
    "contact.btn.viber":         "Viber",
    "contact.row1.label":        "Τηλέφωνο",
    "contact.row2.label":        "WhatsApp / Viber",
    "contact.row3.label":        "Email",
    "contact.row4.label":        "Τοποθεσία",
    "contact.row4.value":        "Νιμπορειό Ευβοίας, Νότια Εύβοια",
    "contact.hours.row1.day":    "Δευτέρα – Παρασκευή",
    "contact.hours.row1.time":   "09:00 – 21:00",
    "contact.hours.row2.day":    "Σαββατοκύριακο",
    "contact.hours.row2.time":   "09:00 – 21:00",
    "contact.hours.row3.day":    "WhatsApp / Viber",
    "contact.hours.row3.time":   "Πάντα διαθέσιμοι",
    "footer.brand.desc":         "Boutique κατάλυμα στο Νιμπορειό Ευβοίας — άνεση, καθαριότητα και αυθεντική ελληνική φιλοξενία.",
    "footer.nav1.title":         "Πλοήγηση",
    "footer.nav1.aria":          "Πλοήγηση",
    "footer.nav2.title":         "Επικοινωνία",
    "footer.nav2.aria":          "Επικοινωνία",
    "footer.loc1":               "Νιμπορειό Ευβοίας",
    "footer.loc2":               "Νότια Εύβοια, Ελλάδα",
    "footer.newsletter.email.aria": "Email για newsletter",
    "footer.copy":               "© 2026 Asteria Apartments. Όλα τα δικαιώματα διατηρούνται.",
    "dock.wa.title":             "WhatsApp",
    "dock.viber.title":          "Viber",
  },

  en: {
    /* ── Page ─────────────────────────────────────────────────── */
    "page.title": "Asteria Apartments | Premium Stay in Southern Euboea",

    /* ── Skip link ─────────────────────────────────────────────── */
    "skip": "Skip to main content",

    /* ── Navigation ────────────────────────────────────────────── */
    "nav.about":    "About",
    "nav.rooms":    "Rooms",
    "nav.amenities":"Amenities",
    "nav.gallery":  "Gallery",
    "nav.offers":   "Offers",
    "nav.location": "Location",
    "nav.contact":  "Contact",
    "nav.book":     "Book",
    "nav.menu.open":  "Open navigation menu",
    "nav.menu.close": "Close navigation menu",

    /* ── Hero ──────────────────────────────────────────────────── */
    "hero.eyebrow":    "Authentic hospitality · Southern Euboea",
    "hero.title":      "Serenity,<br>comfort &amp;<br>unforgettable moments",
    "hero.lead":       "Boutique accommodation in Nymforeio, Euboea — thoughtfully appointed rooms, warm hospitality and the perfect location for a restful holiday.",
    "hero.btn.rooms":  "Explore the rooms",
    "hero.btn.book":   "Check availability",
    "hero.stat1":      "Room types",
    "hero.stat2":      "Private bathrooms",
    "hero.stat3":      "Support",
    "hero.stats.aria": "Property statistics",
    "hero.scroll":     "Discover",
    "hero.scroll.aria":"Go to next section",

    /* ── About ─────────────────────────────────────────────────── */
    "about.label": "About",
    "about.title": "A stay experience<br>with attention<br>to every detail",
    "about.lead":  "Asteria Apartments was created for guests seeking cleanliness, comfort and friendly service.",
    "about.body":  "Every room is thoughtfully equipped to give you everything you need — whether you're travelling as a couple, a family or a group.",
    "about.f1.name": "Cleanliness",
    "about.f1.desc": "Spotless spaces and high hygiene standards",
    "about.f2.name": "Comfort",
    "about.f2.desc": "Modern amenities for a pleasant stay",
    "about.f3.name": "Hospitality",
    "about.f3.desc": "Personal service before and during your stay",
    "about.f4.name": "Location",
    "about.f4.desc": "Seaside setting with easy access",
    "about.badge.village": "Nymforeio",
    "about.badge.region":  "Southern Euboea",
    "about.img.alt": "Exterior view of Asteria Apartments",

    /* ── Rooms ─────────────────────────────────────────────────── */
    "rooms.label": "Accommodation",
    "rooms.title": "Choose<br>your room",
    "rooms.lead":  "Three room categories designed for couples, families and groups — with all the amenities you need.",
    "rooms.from":    "From",
    "rooms.enquire": "Enquire",
    "rooms.book":    "Book",

    "room1.badge":    "For 2 guests",
    "room1.capacity": "Comfortable stay for two",
    "room1.name":     "Deluxe Double",
    "room1.desc":     "Elegant and comfortable room, ideal for couples seeking rest and practical amenities.",
    "room1.tag1":     "🛏 Double bed",
    "room1.tag2":     "🚿 Private bathroom",
    "room1.tag3":     "❄️ A/C",
    "room1.tag4":     "📶 Wi-Fi",
    "room1.tag5":     "📺 TV",
    "room1.tag6":     "🌿 Balcony",

    "room2.badge":    "Most popular",
    "room2.capacity": "Up to 3 guests",
    "room2.name":     "Superior Triple",
    "room2.desc":     "Spacious option for small families or groups, with a comfortable layout and all essential amenities.",
    "room2.tag1":     "🛏 Double + single",
    "room2.tag2":     "🚿 Private bathroom",
    "room2.tag3":     "❄️ A/C",
    "room2.tag4":     "🧊 Fridge",
    "room2.tag5":     "📶 Wi-Fi",
    "room2.tag6":     "🌿 Balcony",

    "room3.badge":    "For families",
    "room3.capacity": "Up to 4 guests",
    "room3.name":     "Family Room",
    "room3.desc":     "Spacious and practical option for families, with comfortable beds and a functional layout.",
    "room3.tag1":     "🛏 Family layout",
    "room3.tag2":     "🚿 Private bathroom",
    "room3.tag3":     "❄️ A/C",
    "room3.tag4":     "📺 TV",
    "room3.tag5":     "🧊 Fridge",
    "room3.tag6":     "🗄 Storage",

    /* ── Amenities ─────────────────────────────────────────────── */
    "amenities.label": "Amenities",
    "amenities.title": "Everything you need for a comfortable stay",
    "amenities.lead":  "Our spaces are fully equipped with practical amenities that make your stay more enjoyable.",
    "am1.name": "Free Wi-Fi",
    "am1.desc": "Fast internet connection throughout the property.",
    "am2.name": "Air Conditioning",
    "am2.desc": "Perfect temperature throughout your stay.",
    "am3.name": "Private Bathroom",
    "am3.desc": "Clean, modern and fully equipped bathroom.",
    "am4.name": "TV",
    "am4.desc": "Entertainment and information in your room.",
    "am5.name": "Parking",
    "am5.desc": "Easy access and free parking near the property.",
    "am6.name": "Refrigerator",
    "am6.desc": "Practical amenity for drinks, food and everyday needs.",
    "am7.name": "Balcony",
    "am7.desc": "Private outdoor space for moments of relaxation.",
    "am8.name": "Housekeeping",
    "am8.desc": "Regular cleaning for a comfortable and safe stay.",

    /* ── Gallery ───────────────────────────────────────────────── */
    "gallery.label":    "Gallery",
    "gallery.title":    "Explore<br>our spaces",
    "gallery.lead":     "Browse the photos and discover the atmosphere of Asteria Apartments.",
    "gallery.grid.aria":"Photos of exterior spaces",
    "gallery.btn1.aria":"Open photo 1",
    "gallery.btn2.aria":"Open photo 2",
    "gallery.btn3.aria":"Open photo 3",
    "gallery.btn4.aria":"Open photo 4",
    "gallery.btn5.aria":"Open photo 5",
    "gallery.img1.alt": "Front facade of Asteria Apartments and exterior grounds",
    "gallery.img2.alt": "Outdoor lounge area of the property in Nymforeio",
    "gallery.img3.alt": "Garden and entrance of the apartments",
    "gallery.img4.alt": "Balconies overlooking the exterior grounds",
    "gallery.img5.alt": "Evening view of the Asteria Apartments exterior",

    /* ── Offers ────────────────────────────────────────────────── */
    "offers.label": "Offers",
    "offers.title": "Special offers for an unforgettable holiday",
    "offers.lead":  "Contact us for current prices and special offers.",
    "offers.cta":   "Learn more",
    "offer1.badge": "Couples",
    "offer1.desc":  "The perfect choice for couples seeking a romantic getaway in Southern Euboea.",
    "offer1.li1":   "Deluxe Double room",
    "offer1.li2":   "Breakfast in room",
    "offer1.li3":   "Late check-out",
    "offer2.badge": "Families",
    "offer2.desc":  "Spacious accommodation for the whole family, with a family-friendly environment and service.",
    "offer2.li1":   "Family room",
    "offer2.li2":   "Free parking",
    "offer2.li3":   "Day-trip recommendations",
    "offer3.badge": "Groups",
    "offer3.desc":  "Book multiple rooms simultaneously and enjoy a special group rate.",
    "offer3.li1":   "Multiple rooms",
    "offer3.li2":   "Special group rate",
    "offer3.li3":   "Direct communication",

    /* ── Reviews ───────────────────────────────────────────────── */
    "reviews.label":             "Reviews",
    "reviews.title":             "Our guests'<br>experiences",
    "reviews.lead":              "Genuine reviews from our guests. Every review is approved before it is published.",
    "reviews.stars.aria":        "Five stars",
    "reviews.placeholder.title": "Add real reviews",
    "reviews.placeholder.desc":  "We do not publish fabricated reviews. This section is ready to be connected with approved reviews from Google, Booking.com or Airbnb.",
    "reviews.write.btn":         "Write a review",
    "reviewform.title":          "Share your experience",
    "reviewform.lead":           "Your review will be checked by the administrator before it is published. We appreciate every genuine opinion.",
    "reviewform.name.label":     "Name",
    "reviewform.name.ph":        "e.g. Maria Smith",
    "reviewform.email.label":    "Email",
    "reviewform.email.optional": "(optional)",
    "reviewform.rating.label":   "Rating",
    "reviewform.rating.aria":    "Select number of stars",
    "reviewform.star5.title":    "5 stars",
    "reviewform.star4.title":    "4 stars",
    "reviewform.star3.title":    "3 stars",
    "reviewform.star2.title":    "2 stars",
    "reviewform.star1.title":    "1 star",
    "reviewform.date.label":     "Date of stay",
    "reviewform.text.label":     "Review",
    "reviewform.text.ph":        "Tell us about your stay experience…",
    "reviewform.consent":        "I agree to the storage of my details for verification and publication of my review, in accordance with the privacy policy.",
    "reviewform.notice":         "ℹ️ Reviews are not published automatically. Each review is checked by the administrator before it appears publicly.",
    "reviewform.submit":         "Submit review",

    /* ── Booking ───────────────────────────────────────────────── */
    "booking.label":        "Direct enquiry",
    "booking.title":        "Check availability",
    "booking.lead":         "Fill in your dates and send an enquiry via WhatsApp.",
    "booking.arrival":      "Arrival",
    "booking.arrival.aria": "Arrival date",
    "booking.departure":      "Departure",
    "booking.departure.aria": "Departure date",
    "booking.adults":      "Adults",
    "booking.adults.aria": "Number of adults",
    "booking.adult1": "1 adult",
    "booking.adult2": "2 adults",
    "booking.adult3": "3 adults",
    "booking.adult4": "4 adults",
    "booking.adult5": "5 adults",
    "booking.adult6": "6 adults",
    "booking.children":      "Children",
    "booking.children.aria": "Number of children",
    "booking.child0": "No children",
    "booking.child1": "1 child",
    "booking.child2": "2 children",
    "booking.child3": "3 children",
    "booking.child4": "4 children",
    "booking.room":      "Room",
    "booking.room.aria": "Room type",
    "booking.room0": "No preference",
    "booking.room1": "Deluxe Double",
    "booking.room2": "Superior Triple",
    "booking.room3": "Family Room",
    "booking.submit":          "Send enquiry →",
    "booking.platforms.aria":  "Booking platforms",
    "booking.summary.default": "Select dates to see the number of nights.",

    /* ── Location ──────────────────────────────────────────────── */
    "location.label": "Location",
    "location.title": "The perfect base for exploring Southern Euboea",
    "location.lead":  "Asteria Apartments is located in Nymforeio, Euboea — a quiet seaside spot with easy access and stunning natural surroundings.",
    "loc.h0.name": "Beach",
    "loc.h0.desc": "Short distance from the sea",
    "loc.h1.name": "Dining",
    "loc.h1.desc": "Near tavernas, cafés and local market",
    "loc.h2.name": "Access",
    "loc.h2.desc": "Easy access by car",
    "loc.h3.name": "Day trips",
    "loc.h3.desc": "Base for day trips around Euboea",
    "loc.btn1": "📍 Open in Google Maps",
    "loc.btn2": "Get directions →",
    "loc.card.label":  "Location",
    "loc.card.name":   "Nymforeio, Euboea",
    "loc.card.region": "Southern Euboea, Greece",
    "loc.map.title":   "Map of Nymforeio, Euboea",

    /* ── Nearby ────────────────────────────────────────────────── */
    "nearby.label": "Around the property",
    "nearby.title": "Discover Southern Euboea",
    "nearby.lead":  "Use the property as a base for beaches, food, walks and day trips.",
    "nearby1.name": "Beaches",
    "nearby1.desc": "Explore the beaches and quiet coves of the area.",
    "nearby2.name": "Local cuisine",
    "nearby2.desc": "Discover tavernas and local flavours of Southern Euboea.",
    "nearby3.name": "Hiking",
    "nearby3.desc": "Enjoy nature trails and spots with stunning views.",
    "nearby4.name": "Day trips",
    "nearby4.desc": "Easily organise short visits to nearby villages and sights.",

    /* ── Contact ───────────────────────────────────────────────── */
    "contact.label": "Contact",
    "contact.title": "Take the first step towards your stay",
    "contact.lead":  "Contact us directly for prices, available dates and any information you need.",
    "contact.btn.call":  "📞 Call us",
    "contact.links.aria":"Ways to contact us",
    "contact.row1.name": "Phone",
    "contact.row2.name": "WhatsApp / Viber",
    "contact.row3.name": "Email",
    "contact.row4.name": "Location",
    "contact.row4.val":  "Nymforeio, Euboea, Southern Euboea",
    "contact.hours.title": "Contact hours",
    "contact.hours.desc":  "We are always available to help you.",
    "contact.hours.mf":    "Monday – Friday",
    "contact.hours.ss":    "Weekend",
    "contact.hours.wa":    "WhatsApp / Viber",
    "contact.hours.always":"Always available",
    "contact.email.btn":   "Send email",

    /* ── Footer ────────────────────────────────────────────────── */
    "footer.brand":          "Boutique accommodation in Nymforeio, Euboea — comfort, cleanliness and authentic Greek hospitality.",
    "footer.nav.title":      "Navigation",
    "footer.nav.aria":       "Navigation",
    "footer.contact.title":  "Contact",
    "footer.contact.aria":   "Contact",
    "footer.location1":      "Nymforeio, Euboea",
    "footer.location2":      "Southern Euboea, Greece",
    "footer.newsletter.title":"Newsletter",
    "footer.newsletter.desc": "Subscribe to receive special offers and news from the property.",
    "footer.newsletter.ph":   "email@example.com",
    "footer.newsletter.aria": "Email for newsletter",
    "footer.newsletter.btn":  "Subscribe",
    "footer.newsletter.notice":"* Subscription will be activated once the backend is configured.",
    "footer.social.aria":     "Social networks",
    "footer.copyright":       "© 2026 Asteria Apartments. All rights reserved.",
    "footer.legal.aria":      "Legal",
    "footer.legal1":          "Privacy policy",
    "footer.legal2":          "Terms of use",
    "footer.legal3":          "Cancellation policy",

    /* ── Floating dock ─────────────────────────────────────────── */
    "dock.aria":       "Quick contact",
    "dock.call.aria":  "Phone call",
    "dock.call.title": "Phone",
    "dock.wa.aria":    "WhatsApp",
    "dock.viber.aria": "Viber",

    /* ── Scroll-to-top ─────────────────────────────────────────── */
    "scrolltop.aria":  "Back to top",
    "scrolltop.title": "Back to top",

    /* ── Lightbox ──────────────────────────────────────────────── */
    "lightbox.aria":       "Photo viewer",
    "lightbox.close.aria": "Close",
    "lightbox.prev.aria":  "Previous photo",
    "lightbox.next.aria":  "Next photo",
    "lightbox.dialog.aria":"Photo viewer",

    /* ── Extra aliases to match HTML data-i18n keys ─────────────── */
    "contact.nav.aria":          "Contact options",
    "contact.btn.wa":            "WhatsApp",
    "contact.btn.viber":         "Viber",
    "contact.row1.label":        "Phone",
    "contact.row2.label":        "WhatsApp / Viber",
    "contact.row3.label":        "Email",
    "contact.row4.label":        "Location",
    "contact.row4.value":        "Nymforeio, Euboea, Southern Euboea",
    "contact.hours.row1.day":    "Monday – Friday",
    "contact.hours.row1.time":   "09:00 – 21:00",
    "contact.hours.row2.day":    "Weekend",
    "contact.hours.row2.time":   "09:00 – 21:00",
    "contact.hours.row3.day":    "WhatsApp / Viber",
    "contact.hours.row3.time":   "Always available",
    "footer.brand.desc":         "Boutique accommodation in Nymforeio, Euboea — comfort, cleanliness and authentic Greek hospitality.",
    "footer.nav1.title":         "Navigation",
    "footer.nav1.aria":          "Navigation",
    "footer.nav2.title":         "Contact",
    "footer.nav2.aria":          "Contact",
    "footer.loc1":               "Nymforeio, Euboea",
    "footer.loc2":               "Southern Euboea, Greece",
    "footer.newsletter.email.aria": "Email for newsletter",
    "footer.copy":               "© 2026 Asteria Apartments. All rights reserved.",
    "dock.wa.title":             "WhatsApp",
    "dock.viber.title":          "Viber",
  },
};

(function () {
  var STORAGE_KEY = "asteria_lang";
  var currentLang = "el";

  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "el") currentLang = stored;
  } catch (e) { /* localStorage blocked */ }

  /* ── translation helper ─────────────────────────────── */
  function t(lang, key) {
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined)
      ? TRANSLATIONS[lang][key]
      : (TRANSLATIONS.el[key] !== undefined ? TRANSLATIONS.el[key] : key);
  }

  /* ── apply all translations for a given language ────── */
  function applyLang(lang) {
    if (lang !== "el" && lang !== "en") lang = "el";
    currentLang = lang;

    document.documentElement.setAttribute("lang", lang);
    document.title = t(lang, "page.title");

    /* textContent */
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(lang, el.getAttribute("data-i18n"));
    });

    /* innerHTML — for elements that contain <br> or &amp; */
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(lang, el.getAttribute("data-i18n-html"));
    });

    /* placeholder */
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(lang, el.getAttribute("data-i18n-placeholder"));
    });

    /* aria-label */
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(lang, el.getAttribute("data-i18n-aria")));
    });

    /* title attribute */
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.setAttribute("title", t(lang, el.getAttribute("data-i18n-title")));
    });

    /* alt attribute (img) */
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(lang, el.getAttribute("data-i18n-alt")));
    });

    /* iframe title */
    document.querySelectorAll("[data-i18n-iframe-title]").forEach(function (el) {
      el.setAttribute("title", t(lang, el.getAttribute("data-i18n-iframe-title")));
    });

    /* update the toggle button */
    var btn = document.getElementById("langToggle");
    if (btn) {
      var other = lang === "el" ? "en" : "el";
      btn.textContent = other === "en" ? "EN" : "ΕΛ";
      btn.setAttribute("lang", other);
      btn.setAttribute(
        "aria-label",
        lang === "el" ? "Switch to English" : "Αλλαγή σε Ελληνικά"
      );
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  /* ── wire everything up on DOM ready ────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    applyLang(currentLang);

    var btn = document.getElementById("langToggle");
    if (btn) {
      btn.addEventListener("click", function () {
        applyLang(currentLang === "el" ? "en" : "el");
      });
    }
  });

  /* expose helper so other scripts can read current language */
  window.i18nT = function (key) { return t(currentLang, key); };
  window.i18nApply = applyLang;
})();

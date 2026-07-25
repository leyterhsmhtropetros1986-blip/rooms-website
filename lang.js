/**
 * Asteria Apartments — Bilingual Support (Greek / English)
 * =========================================================
 * Add  data-i18n="key"         to any element whose textContent should be translated.
 * Add  data-i18n-aria="key"    to any element whose aria-label should be translated.
 * Add  data-i18n-ph="key"      to any input/textarea whose placeholder should be translated.
 * Add  data-i18n-title="key"   to any element whose title attribute should be translated.
 *
 * The current language is stored in localStorage under "asteria-lang".
 * Default language is Greek ("el").
 * =========================================================
 */

/* ── Translation dictionaries ─────────────────────────────── */

const LANG = {

  el: {
    // Accessibility
    "skip": "Μετάβαση στο κύριο περιεχόμενο",

    // Navigation
    "nav.home":      "Αρχική",
    "nav.about":     "Το κατάλυμα",
    "nav.rooms":     "Δωμάτια",
    "nav.amenities": "Παροχές",
    "nav.gallery":   "Φωτογραφίες",
    "nav.location":  "Τοποθεσία",
    "nav.book":      "Κράτηση",
    "nav.aria":      "Κύριο μενού",
    "lang.toggle.aria": "Switch to English",
    "lang.toggle.label": "EN",

    // Hero
    "hero.eyebrow":     "Αυθεντική φιλοξενία",
    "hero.title":       "Ηρεμία, άνεση και ξεχωριστές στιγμές διαμονής",
    "hero.desc":        "Απολαύστε προσεγμένους χώρους, σύγχρονες παροχές και μια ζεστή εμπειρία φιλοξενίας σε ιδανική τοποθεσία.",
    "hero.cta1":        "Ανακαλύψτε τα δωμάτια",
    "hero.cta2":        "Έλεγχος διαθεσιμότητας",
    "hero.hl1.title":   "Άνετοι χώροι",
    "hero.hl1.desc":    "Σχεδιασμένοι για ξεκούραση",
    "hero.hl2.title":   "Προνομιακή τοποθεσία",
    "hero.hl2.desc":    "Κοντά σε θάλασσα και αγορά",
    "hero.hl3.title":   "Άμεση επικοινωνία",
    "hero.hl3.desc":    "Τηλέφωνο, WhatsApp και email",
    "hero.scroll":      "Ανακαλύψτε περισσότερα",
    "hero.scroll.aria": "Μετάβαση στην επόμενη ενότητα",

    // Booking form
    "book.label":          "Άμεσο αίτημα",
    "book.title":          "Ελέγξτε διαθεσιμότητα",
    "book.desc":           "Συμπληρώστε τις ημερομηνίες σας και στείλτε έτοιμο αίτημα μέσω WhatsApp.",
    "book.arrival":        "Άφιξη",
    "book.departure":      "Αναχώρηση",
    "book.adults":         "Ενήλικες",
    "book.children":       "Παιδιά",
    "book.roomtype":       "Τύπος δωματίου",
    "book.opt.nopref":     "Δεν έχω προτίμηση",
    "book.opt.deluxe":     "Deluxe δίκλινο",
    "book.opt.superior":   "Superior τρίκλινο",
    "book.opt.family":     "Family δωμάτιο",
    "book.submit":         "Αποστολή αιτήματος",
    "book.summary":        "Επιλέξτε ημερομηνίες για να εμφανιστούν οι διανυκτερεύσεις.",
    "book.adults.1":       "1 ενήλικας",
    "book.adults.2":       "2 ενήλικες",
    "book.adults.3":       "3 ενήλικες",
    "book.adults.4":       "4 ενήλικες",
    "book.adults.5":       "5 ενήλικες",
    "book.adults.6":       "6 ενήλικες",
    "book.children.0":     "Χωρίς παιδιά",
    "book.children.1":     "1 παιδί",
    "book.children.2":     "2 παιδιά",
    "book.children.3":     "3 παιδιά",
    "book.children.4":     "4 παιδιά",

    // About
    "about.label":       "Το κατάλυμα",
    "about.title":       "Μια εμπειρία διαμονής με έμφαση στη λεπτομέρεια",
    "about.lead":        "Το Asteria Apartments δημιουργήθηκε για επισκέπτες που αναζητούν καθαριότητα, άνεση και φιλική εξυπηρέτηση.",
    "about.body":        "Κάθε δωμάτιο είναι προσεγμένο ώστε να σας προσφέρει όλα όσα χρειάζεστε για μια ξεκούραστη διαμονή, είτε ταξιδεύετε ως ζευγάρι, οικογένεια ή παρέα.",
    "about.f1.title":    "Καθαριότητα",
    "about.f1.desc":     "Προσεγμένοι χώροι και υψηλά πρότυπα υγιεινής",
    "about.f2.title":    "Άνεση",
    "about.f2.desc":     "Σύγχρονες παροχές για ευχάριστη διαμονή",
    "about.f3.title":    "Φιλοξενία",
    "about.f3.desc":     "Προσωπική εξυπηρέτηση πριν και κατά τη διαμονή",
    "about.badge.title": "Ιδανική επιλογή",
    "about.badge.desc":  "για ζευγάρια και οικογένειες",
    "about.img.alt":     "Εξωτερική άποψη του καταλύματος",

    // Rooms
    "rooms.label": "Διαμονή",
    "rooms.title": "Επιλέξτε το δωμάτιο που σας ταιριάζει",
    "rooms.desc":  "Άνετοι και λειτουργικοί χώροι, σχεδιασμένοι για διαφορετικές ανάγκες και αριθμό επισκεπτών.",

    "room1.badge":    "Για 2 επισκέπτες",
    "room1.capacity": "Άνετη διαμονή για δύο",
    "room1.name":     "Deluxe δίκλινο",
    "room1.desc":     "Κομψό και άνετο δωμάτιο, ιδανικό για ζευγάρια που αναζητούν ξεκούραση και πρακτικές παροχές.",
    "room1.f1":       "Διπλό κρεβάτι",
    "room1.f2":       "Ιδιωτικό μπάνιο",
    "room1.f3":       "Κλιματισμός",
    "room1.f4":       "Δωρεάν Wi-Fi",
    "room1.f5":       "Τηλεόραση",
    "room1.f6":       "Μπαλκόνι",
    "room1.cta":      "Έλεγχος διαθεσιμότητας",
    "room1.img.alt":  "Δίκλινο δωμάτιο με διπλό κρεβάτι",

    "room2.badge":    "Δημοφιλής επιλογή",
    "room2.capacity": "Έως 3 επισκέπτες",
    "room2.name":     "Superior τρίκλινο",
    "room2.desc":     "Ευρύχωρη επιλογή για μικρές οικογένειες ή παρέες, με άνετη διαρρύθμιση και όλες τις βασικές παροχές.",
    "room2.f1":       "Διπλό και μονό κρεβάτι",
    "room2.f2":       "Ιδιωτικό μπάνιο",
    "room2.f3":       "Κλιματισμός",
    "room2.f4":       "Ψυγείο",
    "room2.f5":       "Δωρεάν Wi-Fi",
    "room2.f6":       "Ιδιωτικό μπαλκόνι",
    "room2.cta":      "Έλεγχος διαθεσιμότητας",
    "room2.img.alt":  "Τρίκλινο δωμάτιο για οικογένεια ή παρέα",

    "room3.badge":    "Για οικογένειες",
    "room3.capacity": "Έως 4 επισκέπτες",
    "room3.name":     "Family δωμάτιο",
    "room3.desc":     "Ευρύχωρη και πρακτική επιλογή για οικογένειες, με άνετα κρεβάτια και λειτουργική διαρρύθμιση.",
    "room3.f1":       "Οικογενειακή διαρρύθμιση",
    "room3.f2":       "Ιδιωτικό μπάνιο",
    "room3.f3":       "Κλιματισμός",
    "room3.f4":       "Τηλεόραση",
    "room3.f5":       "Ψυγείο",
    "room3.f6":       "Χώρος αποθήκευσης",
    "room3.cta":      "Έλεγχος διαθεσιμότητας",
    "room3.img.alt":  "Οικογενειακό δωμάτιο για τέσσερις επισκέπτες",

    // Amenities
    "amen.label":       "Παροχές",
    "amen.title":       "Όλα όσα χρειάζεστε για μια άνετη διαμονή",
    "amen.desc":        "Οι χώροι μας είναι εξοπλισμένοι με πρακτικές παροχές που κάνουν τη διαμονή σας πιο ξεκούραστη.",
    "amen.wifi.name":   "Δωρεάν Wi-Fi",
    "amen.wifi.desc":   "Γρήγορη σύνδεση στο διαδίκτυο σε όλους τους χώρους.",
    "amen.ac.name":     "Κλιματισμός",
    "amen.ac.desc":     "Ιδανική θερμοκρασία καθ' όλη τη διάρκεια της διαμονής.",
    "amen.bath.name":   "Ιδιωτικό μπάνιο",
    "amen.bath.desc":   "Καθαρός, σύγχρονος και πλήρως εξοπλισμένος χώρος.",
    "amen.tv.name":     "Τηλεόραση",
    "amen.tv.desc":     "Ψυχαγωγία και ενημέρωση μέσα στο δωμάτιό σας.",
    "amen.park.name":   "Χώρος στάθμευσης",
    "amen.park.desc":   "Εύκολη πρόσβαση και στάθμευση κοντά στο κατάλυμα.",
    "amen.fridge.name": "Ψυγείο",
    "amen.fridge.desc": "Πρακτική παροχή για ποτά, τρόφιμα και καθημερινές ανάγκες.",
    "amen.balc.name":   "Μπαλκόνι",
    "amen.balc.desc":   "Ιδιωτικός εξωτερικός χώρος για στιγμές χαλάρωσης.",
    "amen.clean.name":  "Τακτική καθαριότητα",
    "amen.clean.desc":  "Προσεγμένοι χώροι για άνετη και ασφαλή διαμονή.",

    // Gallery
    "gall.label": "Gallery",
    "gall.title": "Γνωρίστε τους χώρους μας",
    "gall.desc":  "Περιηγηθείτε στις φωτογραφίες και ανακαλύψτε την ατμόσφαιρα του καταλύματος.",
    "gall.img1.aria": "Προβολή εξωτερικού χώρου",
    "gall.img2.aria": "Προβολή δίκλινου δωματίου",
    "gall.img3.aria": "Προβολή τρίκλινου δωματίου",
    "gall.img4.aria": "Προβολή οικογενειακού δωματίου",
    "gall.img5.aria": "Προβολή τοποθεσίας καταλύματος",

    // Video
    "video.label":       "Βίντεο",
    "video.title":       "Δείτε το κατάλυμα",
    "video.desc":        "Ξεναγηθείτε ψηφιακά και νιώστε την ατμόσφαιρα πριν φτάσετε.",
    "video.placeholder": "Βίντεο μη διαθέσιμο. Ρυθμίστε το videoUrl στο booking-config.js.",

    // Offers
    "offers.label":            "Προσφορές",
    "offers.title":            "Ειδικές προσφορές",
    "offers.desc":             "Εκμεταλλευτείτε τις ειδικές τιμές και πακέτα για αξέχαστες διαμονές.",
    "offers.none":             "Δεν υπάρχουν ενεργές προσφορές αυτή τη στιγμή. Επικοινωνήστε μαζί μας για τις καλύτερες τιμές.",
    "offers.contact.btn":      "Επικοινωνήστε μαζί μας",
    "offers.ex1.badge":        "ΠΑΡΑΔΕΙΓΜΑ — TODO",
    "offers.ex1.title":        "Πρώιμη Κράτηση",
    "offers.ex1.desc":         "Κλείστε 30+ ημέρες νωρίτερα και απολαύστε έκπτωση στη διαμονή σας.",
    "offers.ex1.validity":     "TODO: Ημερομηνίες ισχύος",
    "offers.ex1.benefit":      "TODO: Ποσοστό έκπτωσης",
    "offers.ex1.cta":          "Κρατήστε τώρα",
    "offers.ex2.badge":        "ΠΑΡΑΔΕΙΓΜΑ — TODO",
    "offers.ex2.title":        "Παραμονή 7+ νυχτών",
    "offers.ex2.desc":         "Για μεγαλύτερες διαμονές επικοινωνήστε μαζί μας για ειδική τιμή.",
    "offers.ex2.cta":          "Ρωτήστε μας",

    // Stay information
    "stay.label":          "Πρακτικές πληροφορίες",
    "stay.title":          "Χρήσιμα για τη διαμονή σας",
    "stay.checkin.label":  "Check-in",
    "stay.checkin.val":    "15:00 – 21:00",
    "stay.checkout.label": "Check-out",
    "stay.checkout.val":   "έως 11:00",
    "stay.cancel.label":   "Ακύρωση",
    "stay.cancel.val":     "TODO: Πολιτική ακύρωσης",
    "stay.smoking.label":  "Κάπνισμα",
    "stay.smoking.val":    "Απαγορεύεται στους εσωτερικούς χώρους",
    "stay.pets.label":     "Κατοικίδια",
    "stay.pets.val":       "TODO: Πολιτική κατοικιδίων",
    "stay.parking.label":  "Στάθμευση",
    "stay.parking.val":    "Διαθέσιμος χώρος κοντά στο κατάλυμα",
    "stay.wifi.label":     "Wi-Fi",
    "stay.wifi.val":       "Δωρεάν σε όλους τους χώρους",
    "stay.access.label":   "Προσβασιμότητα",
    "stay.access.val":     "TODO: Πληροφορίες προσβασιμότητας",
    "stay.phone.label":    "Τηλέφωνο",
    "stay.wa.label":       "WhatsApp",
    "stay.address.label":  "Διεύθυνση",
    "stay.address.val":    "Νιμπορειό Ευβοίας, Νότια Εύβοια",

    // FAQ
    "faq.label": "FAQ",
    "faq.title": "Συχνές ερωτήσεις",
    "faq.desc":  "Βρείτε απαντήσεις στις πιο συχνές ερωτήσεις για τη διαμονή σας.",
    "faq.q1":    "Ποιες είναι οι ώρες check-in και check-out;",
    "faq.a1":    "Το check-in γίνεται από τις 15:00 έως τις 21:00. Το check-out έως τις 11:00. Εάν χρειάζεστε διαφορετικές ώρες, επικοινωνήστε μαζί μας εκ των προτέρων.",
    "faq.q2":    "Πώς κάνω κράτηση;",
    "faq.a2":    "Μπορείτε να κάνετε κράτηση μέσω WhatsApp, τηλεφώνου ή email. Επίσης μέσω Booking.com ή Airbnb όταν οι πλατφόρμες ενεργοποιηθούν.",
    "faq.q3":    "Ποια είναι η πολιτική ακύρωσης;",
    "faq.a3":    "TODO: Συμπληρώστε την πολιτική ακύρωσης.",
    "faq.q4":    "Υπάρχει χώρος στάθμευσης;",
    "faq.a4":    "Ναι, υπάρχει διαθέσιμος χώρος στάθμευσης κοντά στο κατάλυμα.",
    "faq.q5":    "Υπάρχει δωρεάν Wi-Fi;",
    "faq.a5":    "Ναι, προσφέρουμε δωρεάν Wi-Fi σε όλους τους χώρους.",
    "faq.q6":    "Επιτρέπονται τα κατοικίδια;",
    "faq.a6":    "TODO: Συμπληρώστε την πολιτική για κατοικίδια.",
    "faq.q7":    "Γίνονται δεκτά παιδιά;",
    "faq.a7":    "Ναι, το κατάλυμα είναι κατάλληλο για οικογένειες με παιδιά.",
    "faq.q8":    "Ποιοι τρόποι πληρωμής γίνονται δεκτοί;",
    "faq.a8":    "TODO: Συμπληρώστε αποδεκτούς τρόπους πληρωμής.",
    "faq.q9":    "Πού ακριβώς βρίσκεστε;",
    "faq.a9":    "Στο Νιμπορειό Ευβοίας, Νότια Εύβοια. Ακριβείς οδηγίες παρέχονται μετά την κράτηση.",
    "faq.q10":   "Υπάρχει πρόσβαση για ΑμεΑ;",
    "faq.a10":   "TODO: Συμπληρώστε πληροφορίες προσβασιμότητας.",

    // Location section
    "loc.label":       "Τοποθεσία",
    "loc.title":       "Σε ιδανικό σημείο για να εξερευνήσετε την περιοχή",
    "loc.body":        "Το Asteria Apartments βρίσκεται στο Νιμπορειό Ευβοίας, στη Νότια Εύβοια, σε ήσυχο παραθαλάσσιο σημείο με εύκολη πρόσβαση. Είναι ιδανική επιλογή για ζευγάρια, οικογένειες και επισκέπτες που αναζητούν χαλαρωτικές διακοπές.",
    "loc.li1":         "Μικρή απόσταση από τη θάλασσα",
    "loc.li2":         "Κοντά σε εστιατόρια, καφέ και αγορά",
    "loc.li3":         "Εύκολη πρόσβαση με αυτοκίνητο",
    "loc.li4":         "Κατάλληλη βάση για ημερήσιες εξορμήσεις",
    "loc.gmaps.btn":   "📍 Άνοιγμα στο Google Maps",
    "loc.dir.link":    "Οδηγίες πλοήγησης →",
    "loc.card.label":  "Τοποθεσία",
    "loc.card.title":  "Νιμπορειό Ευβοίας, Νότια Εύβοια",
    "loc.card.desc":   "Ήσυχο σημείο με εύκολη πρόσβαση",
    "loc.img.alt":     "Η τοποθεσία του καταλύματος",

    // Map section
    "map.label": "Χάρτης",
    "map.title": "Βρείτε μας στο Νιμπορειό Ευβοίας",
    "map.desc":  "Ανοίξτε τον διαδραστικό χάρτη, δείτε την περιοχή και ζητήστε οδηγίες πλοήγησης απευθείας από το κινητό σας.",
    "map.btn":   "Άνοιγμα στο Google Maps",
    "map.iframe.title": "Χάρτης Νιμπορειού Ευβοίας",

    // Nearby
    "near.label":  "Γύρω από το κατάλυμα",
    "near.title":  "Ανακαλύψτε τη Νότια Εύβοια",
    "near.desc":   "Χρησιμοποιήστε το κατάλυμα ως βάση για θάλασσα, φαγητό, βόλτες και μικρές ημερήσιες εξορμήσεις.",
    "near.1.title":"Παραλίες",
    "near.1.desc": "Εξερευνήστε τις παραλίες και τους ήσυχους όρμους της περιοχής.",
    "near.2.title":"Τοπική γαστρονομία",
    "near.2.desc": "Ανακαλύψτε ταβέρνες και τοπικές γεύσεις της Νότιας Εύβοιας.",
    "near.3.title":"Πεζοπορία",
    "near.3.desc": "Απολαύστε διαδρομές στη φύση και όμορφα σημεία με θέα.",
    "near.4.title":"Εξορμήσεις",
    "near.4.desc": "Οργανώστε εύκολα κοντινές επισκέψεις σε χωριά και αξιοθέατα.",

    // Book online (platforms)
    "online.label":        "Κράτηση Online",
    "online.title":        "Κλείστε το δωμάτιό σας",
    "online.desc":         "Βρείτε μας στις κορυφαίες πλατφόρμες κράτησης ή επικοινωνήστε απευθείας για τις καλύτερες τιμές και προσωπική εξυπηρέτηση.",
    "online.booking.aria": "Κρατήστε μέσω Booking.com (ανοίγει σε νέα καρτέλα)",
    "online.booking.name": "Booking.com",
    "online.booking.desc": "Κρατήστε μέσω Booking.com",
    "online.airbnb.aria":  "Κρατήστε μέσω Airbnb (ανοίγει σε νέα καρτέλα)",
    "online.airbnb.name":  "Airbnb",
    "online.airbnb.desc":  "Κρατήστε μέσω Airbnb",
    "online.direct.name":  "Άμεση κράτηση",
    "online.direct.desc":  "Επικοινωνήστε απευθείας — χαμηλότερες τιμές",
    "online.note":         "Τα links για Booking.com και Airbnb ενεργοποιούνται μόλις ρυθμιστούν στο booking-config.js.",

    // Reviews
    "rev.label":        "Αξιολογήσεις",
    "rev.title":        "Μοιραστείτε την εμπειρία σας",
    "rev.desc":         "Η γνώμη σας είναι πολύτιμη. Υποβάλετε την κριτική σας και, μετά από έλεγχο, θα εμφανιστεί στη σελίδα μας.",
    "rev.google.note":  "Έχετε κριτικές στο Google ή Booking.com; Επικοινωνήστε μαζί μας για να τις συνδέσουμε.",
    "rev.notice":       "Οι κριτικές δεν δημοσιεύονται αυτόματα. Κάθε αξιολόγηση ελέγχεται από τη διαχείριση πριν εμφανιστεί δημόσια.",
    "rev.name.label":   "Το όνομά σας *",
    "rev.name.ph":      "π.χ. Μαρία Π.",
    "rev.rating.label": "Βαθμολογία *",
    "rev.text.label":   "Η κριτική σας *",
    "rev.text.ph":      "Μοιραστείτε την εμπειρία σας από τη διαμονή σας…",
    "rev.submit":       "Υποβολή κριτικής",
    "rev.ok.title":     "Ευχαριστούμε!",
    "rev.ok.desc":      "Η κριτική σας παραλήφθηκε και θα εμφανιστεί αφού ελεγχθεί από τη διαχείριση.",

    // Contact
    "contact.label":        "Επικοινωνία",
    "contact.title":        "Κάντε το πρώτο βήμα για τη διαμονή σας",
    "contact.desc":         "Επικοινωνήστε απευθείας μαζί μας για τιμές, διαθέσιμες ημερομηνίες και οποιαδήποτε πληροφορία χρειάζεστε.",
    "contact.call":         "Καλέστε μας",
    "contact.wa":           "Μήνυμα στο WhatsApp",
    "contact.viber":        "Μήνυμα στο Viber",
    "contact.card.title":   "Στοιχεία επικοινωνίας",
    "contact.phone.label":  "Τηλέφωνο",
    "contact.viber.label":  "Viber / WhatsApp",
    "contact.email.label":  "Email",
    "contact.loc.label":    "Τοποθεσία",
    "contact.loc.val":      "Νιμπορειό Ευβοίας, Νότια Εύβοια",
    "contact.hours.label":  "Ώρες επικοινωνίας",
    "contact.hours.val":    "Καθημερινά 09:00–21:00",
    "contact.email.btn":    "Αποστολή email",

    // Footer
    "footer.brand.desc": "Άνετη διαμονή, ζεστή φιλοξενία και όμορφες εμπειρίες.",
    "footer.menu":       "Μενού",
    "footer.contact":    "Επικοινωνία",
    "footer.useful":     "Χρήσιμα",
    "footer.about":      "Το κατάλυμα",
    "footer.rooms":      "Δωμάτια",
    "footer.amenities":  "Παροχές",
    "footer.gallery":    "Gallery",
    "footer.maps":       "Google Maps",
    "footer.privacy":    "Πολιτική απορρήτου",
    "footer.terms":      "Όροι χρήσης",
    "footer.cancel":     "Πολιτική ακύρωσης",
    "footer.copyright":  "© 2026 Asteria Apartments. Όλα τα δικαιώματα διατηρούνται.",
    "footer.tagline":    "Designed for memorable stays.",

    // Lightbox
    "lightbox.close":   "Κλείσιμο",
    "lightbox.prev":    "Προηγούμενη φωτογραφία",
    "lightbox.next":    "Επόμενη φωτογραφία",
    "lightbox.aria":    "Προβολή φωτογραφίας",

    // Page title
    "_page.title": "Asteria Apartments | Ενοικιαζόμενα Δωμάτια",

    // WhatsApp message (used by premium-features.js)
    "_wa.message": "Καλησπέρα! Θα ήθελα να ρωτήσω για διαθεσιμότητα.",
  },

  en: {
    // Accessibility
    "skip": "Skip to main content",

    // Navigation
    "nav.home":      "Home",
    "nav.about":     "About",
    "nav.rooms":     "Rooms",
    "nav.amenities": "Amenities",
    "nav.gallery":   "Gallery",
    "nav.location":  "Location",
    "nav.book":      "Book",
    "nav.aria":      "Main navigation",
    "lang.toggle.aria": "Αλλαγή σε Ελληνικά",
    "lang.toggle.label": "GR",

    // Hero
    "hero.eyebrow":     "Authentic hospitality",
    "hero.title":       "Tranquillity, comfort and exceptional stays",
    "hero.desc":        "Enjoy thoughtfully designed spaces, modern amenities and warm hospitality in an ideal location.",
    "hero.cta1":        "Explore the rooms",
    "hero.cta2":        "Check availability",
    "hero.hl1.title":   "Comfortable spaces",
    "hero.hl1.desc":    "Designed for relaxation",
    "hero.hl2.title":   "Prime location",
    "hero.hl2.desc":    "Near the sea and local amenities",
    "hero.hl3.title":   "Direct contact",
    "hero.hl3.desc":    "Phone, WhatsApp and email",
    "hero.scroll":      "Discover more",
    "hero.scroll.aria": "Go to the next section",

    // Booking form
    "book.label":        "Direct enquiry",
    "book.title":        "Check availability",
    "book.desc":         "Fill in your dates and send a ready-made enquiry via WhatsApp.",
    "book.arrival":      "Arrival",
    "book.departure":    "Departure",
    "book.adults":       "Adults",
    "book.children":     "Children",
    "book.roomtype":     "Room type",
    "book.opt.nopref":   "No preference",
    "book.opt.deluxe":   "Deluxe Double",
    "book.opt.superior": "Superior Triple",
    "book.opt.family":   "Family room",
    "book.submit":       "Send enquiry",
    "book.summary":      "Select dates to see the number of nights.",
    "book.adults.1":     "1 adult",
    "book.adults.2":     "2 adults",
    "book.adults.3":     "3 adults",
    "book.adults.4":     "4 adults",
    "book.adults.5":     "5 adults",
    "book.adults.6":     "6 adults",
    "book.children.0":   "No children",
    "book.children.1":   "1 child",
    "book.children.2":   "2 children",
    "book.children.3":   "3 children",
    "book.children.4":   "4 children",

    // About
    "about.label":       "About",
    "about.title":       "A stay experience with attention to detail",
    "about.lead":        "Asteria Apartments was created for guests seeking cleanliness, comfort and friendly service.",
    "about.body":        "Every room is thoughtfully appointed to provide everything you need for a restful stay, whether you are travelling as a couple, family or group.",
    "about.f1.title":    "Cleanliness",
    "about.f1.desc":     "Immaculate spaces and high hygiene standards",
    "about.f2.title":    "Comfort",
    "about.f2.desc":     "Modern amenities for a pleasant stay",
    "about.f3.title":    "Hospitality",
    "about.f3.desc":     "Personal service before and during your stay",
    "about.badge.title": "Ideal choice",
    "about.badge.desc":  "for couples and families",
    "about.img.alt":     "Exterior view of the property",

    // Rooms
    "rooms.label": "Accommodation",
    "rooms.title": "Choose the room that suits you",
    "rooms.desc":  "Comfortable and functional spaces designed for different needs and party sizes.",

    "room1.badge":    "For 2 guests",
    "room1.capacity": "Comfortable stay for two",
    "room1.name":     "Deluxe Double",
    "room1.desc":     "Elegant and comfortable room, ideal for couples seeking rest and practical amenities.",
    "room1.f1":       "Double bed",
    "room1.f2":       "Private bathroom",
    "room1.f3":       "Air conditioning",
    "room1.f4":       "Free Wi-Fi",
    "room1.f5":       "TV",
    "room1.f6":       "Balcony",
    "room1.cta":      "Check availability",
    "room1.img.alt":  "Double room with double bed",

    "room2.badge":    "Popular choice",
    "room2.capacity": "Up to 3 guests",
    "room2.name":     "Superior Triple",
    "room2.desc":     "Spacious option for small families or groups, with a comfortable layout and all essential amenities.",
    "room2.f1":       "Double and single bed",
    "room2.f2":       "Private bathroom",
    "room2.f3":       "Air conditioning",
    "room2.f4":       "Fridge",
    "room2.f5":       "Free Wi-Fi",
    "room2.f6":       "Private balcony",
    "room2.cta":      "Check availability",
    "room2.img.alt":  "Triple room for families or groups",

    "room3.badge":    "For families",
    "room3.capacity": "Up to 4 guests",
    "room3.name":     "Family Room",
    "room3.desc":     "Spacious and practical choice for families, with comfortable beds and a functional layout.",
    "room3.f1":       "Family layout",
    "room3.f2":       "Private bathroom",
    "room3.f3":       "Air conditioning",
    "room3.f4":       "TV",
    "room3.f5":       "Fridge",
    "room3.f6":       "Storage space",
    "room3.cta":      "Check availability",
    "room3.img.alt":  "Family room for four guests",

    // Amenities
    "amen.label":       "Amenities",
    "amen.title":       "Everything you need for a comfortable stay",
    "amen.desc":        "Our spaces are equipped with practical amenities to make your stay more enjoyable.",
    "amen.wifi.name":   "Free Wi-Fi",
    "amen.wifi.desc":   "Fast internet connection throughout all areas.",
    "amen.ac.name":     "Air conditioning",
    "amen.ac.desc":     "Ideal temperature throughout your stay.",
    "amen.bath.name":   "Private bathroom",
    "amen.bath.desc":   "Clean, modern and fully equipped.",
    "amen.tv.name":     "TV",
    "amen.tv.desc":     "Entertainment and news in your room.",
    "amen.park.name":   "Parking",
    "amen.park.desc":   "Easy access and parking near the property.",
    "amen.fridge.name": "Fridge",
    "amen.fridge.desc": "Practical amenity for drinks, food and daily needs.",
    "amen.balc.name":   "Balcony",
    "amen.balc.desc":   "Private outdoor space for moments of relaxation.",
    "amen.clean.name":  "Regular cleaning",
    "amen.clean.desc":  "Well-maintained spaces for a comfortable and safe stay.",

    // Gallery
    "gall.label": "Gallery",
    "gall.title": "Discover our spaces",
    "gall.desc":  "Browse the photos and discover the atmosphere of the property.",
    "gall.img1.aria": "View exterior",
    "gall.img2.aria": "View double room",
    "gall.img3.aria": "View triple room",
    "gall.img4.aria": "View family room",
    "gall.img5.aria": "View property location",

    // Video
    "video.label":       "Video",
    "video.title":       "See the property",
    "video.desc":        "Take a virtual tour and feel the atmosphere before you arrive.",
    "video.placeholder": "Video not configured. Set videoUrl in booking-config.js.",

    // Offers
    "offers.label":       "Offers",
    "offers.title":       "Special offers",
    "offers.desc":        "Take advantage of special rates and packages for an unforgettable stay.",
    "offers.none":        "No active offers at the moment. Contact us for the best rates.",
    "offers.contact.btn": "Contact us",
    "offers.ex1.badge":   "EXAMPLE — TODO",
    "offers.ex1.title":   "Early Booking",
    "offers.ex1.desc":    "Book 30+ days in advance and enjoy a discount on your stay.",
    "offers.ex1.validity":"TODO: Validity dates",
    "offers.ex1.benefit": "TODO: Discount percentage",
    "offers.ex1.cta":     "Book now",
    "offers.ex2.badge":   "EXAMPLE — TODO",
    "offers.ex2.title":   "Stay 7+ nights",
    "offers.ex2.desc":    "For longer stays, contact us for a special rate.",
    "offers.ex2.cta":     "Ask us",

    // Stay information
    "stay.label":          "Practical information",
    "stay.title":          "Useful for your stay",
    "stay.checkin.label":  "Check-in",
    "stay.checkin.val":    "15:00 – 21:00",
    "stay.checkout.label": "Check-out",
    "stay.checkout.val":   "by 11:00",
    "stay.cancel.label":   "Cancellation",
    "stay.cancel.val":     "TODO: Cancellation policy",
    "stay.smoking.label":  "Smoking",
    "stay.smoking.val":    "Not permitted indoors",
    "stay.pets.label":     "Pets",
    "stay.pets.val":       "TODO: Pets policy",
    "stay.parking.label":  "Parking",
    "stay.parking.val":    "Parking available near the property",
    "stay.wifi.label":     "Wi-Fi",
    "stay.wifi.val":       "Free throughout the property",
    "stay.access.label":   "Accessibility",
    "stay.access.val":     "TODO: Accessibility information",
    "stay.phone.label":    "Phone",
    "stay.wa.label":       "WhatsApp",
    "stay.address.label":  "Address",
    "stay.address.val":    "Nimborio, South Evia, Greece",

    // FAQ
    "faq.label": "FAQ",
    "faq.title": "Frequently asked questions",
    "faq.desc":  "Find answers to the most common questions about your stay.",
    "faq.q1":    "What are the check-in and check-out times?",
    "faq.a1":    "Check-in is from 15:00 to 21:00. Check-out is by 11:00. If you need different times, please contact us in advance.",
    "faq.q2":    "How do I make a booking?",
    "faq.a2":    "You can book via WhatsApp, phone or email. Also via Booking.com or Airbnb once those platforms are activated.",
    "faq.q3":    "What is the cancellation policy?",
    "faq.a3":    "TODO: Please fill in the cancellation policy.",
    "faq.q4":    "Is parking available?",
    "faq.a4":    "Yes, parking is available near the property.",
    "faq.q5":    "Is Wi-Fi free?",
    "faq.a5":    "Yes, we offer free Wi-Fi throughout all areas.",
    "faq.q6":    "Are pets allowed?",
    "faq.a6":    "TODO: Please fill in the pets policy.",
    "faq.q7":    "Are children welcome?",
    "faq.a7":    "Yes, the property is suitable for families with children.",
    "faq.q8":    "What payment methods are accepted?",
    "faq.a8":    "TODO: Please fill in accepted payment methods.",
    "faq.q9":    "Where exactly are you located?",
    "faq.a9":    "In Nimborio, South Evia, Greece. Exact directions are provided after booking.",
    "faq.q10":   "Is the property accessible for people with disabilities?",
    "faq.a10":   "TODO: Please fill in accessibility information.",

    // Location section
    "loc.label":      "Location",
    "loc.title":      "Ideally positioned to explore the area",
    "loc.body":       "Asteria Apartments is located in Nimborio, South Evia, in a quiet seaside spot with easy access. It is an ideal choice for couples, families and visitors seeking relaxing holidays.",
    "loc.li1":        "Short distance from the sea",
    "loc.li2":        "Close to restaurants, cafés and shops",
    "loc.li3":        "Easy access by car",
    "loc.li4":        "Perfect base for day trips",
    "loc.gmaps.btn":  "📍 Open in Google Maps",
    "loc.dir.link":   "Get directions →",
    "loc.card.label": "Location",
    "loc.card.title": "Nimborio, South Evia",
    "loc.card.desc":  "Quiet spot with easy access",
    "loc.img.alt":    "The property location",

    // Map section
    "map.label": "Map",
    "map.title": "Find us in Nimborio, Evia",
    "map.desc":  "Open the interactive map, see the area and get directions straight from your phone.",
    "map.btn":   "Open in Google Maps",
    "map.iframe.title": "Map of Nimborio, Evia",

    // Nearby
    "near.label":  "Around the property",
    "near.title":  "Discover South Evia",
    "near.desc":   "Use the property as a base for the sea, food, walks and short day trips.",
    "near.1.title":"Beaches",
    "near.1.desc": "Explore the beaches and quiet coves of the area.",
    "near.2.title":"Local cuisine",
    "near.2.desc": "Discover tavernas and local flavours of South Evia.",
    "near.3.title":"Hiking",
    "near.3.desc": "Enjoy nature trails and beautiful viewpoints.",
    "near.4.title":"Day trips",
    "near.4.desc": "Easily organise visits to nearby villages and sights.",

    // Book online (platforms)
    "online.label":        "Book Online",
    "online.title":        "Book your room",
    "online.desc":         "Find us on leading booking platforms or contact us directly for the best rates and personal service.",
    "online.booking.aria": "Book via Booking.com (opens in new tab)",
    "online.booking.name": "Booking.com",
    "online.booking.desc": "Book via Booking.com",
    "online.airbnb.aria":  "Book via Airbnb (opens in new tab)",
    "online.airbnb.name":  "Airbnb",
    "online.airbnb.desc":  "Book via Airbnb",
    "online.direct.name":  "Book direct",
    "online.direct.desc":  "Contact us directly — best rates guaranteed",
    "online.note":         "Booking.com and Airbnb links activate once configured in booking-config.js.",

    // Reviews
    "rev.label":        "Reviews",
    "rev.title":        "Share your experience",
    "rev.desc":         "Your opinion matters. Submit your review and, after moderation, it will appear on our page.",
    "rev.google.note":  "Have reviews on Google or Booking.com? Contact us to link them.",
    "rev.notice":       "Reviews are not published automatically. Each submission is reviewed by management before appearing publicly.",
    "rev.name.label":   "Your name *",
    "rev.name.ph":      "e.g. Maria P.",
    "rev.rating.label": "Rating *",
    "rev.text.label":   "Your review *",
    "rev.text.ph":      "Share your experience from your stay…",
    "rev.submit":       "Submit review",
    "rev.ok.title":     "Thank you!",
    "rev.ok.desc":      "Your review has been received and will appear once reviewed by management.",

    // Contact
    "contact.label":        "Contact",
    "contact.title":        "Take the first step towards your stay",
    "contact.desc":         "Contact us directly for rates, available dates and any information you need.",
    "contact.call":         "Call us",
    "contact.wa":           "WhatsApp message",
    "contact.viber":        "Viber message",
    "contact.card.title":   "Contact details",
    "contact.phone.label":  "Phone",
    "contact.viber.label":  "Viber / WhatsApp",
    "contact.email.label":  "Email",
    "contact.loc.label":    "Location",
    "contact.loc.val":      "Nimborio, South Evia",
    "contact.hours.label":  "Contact hours",
    "contact.hours.val":    "Daily 09:00–21:00",
    "contact.email.btn":    "Send email",

    // Footer
    "footer.brand.desc": "Comfortable stays, warm hospitality and beautiful experiences.",
    "footer.menu":       "Menu",
    "footer.contact":    "Contact",
    "footer.useful":     "Useful links",
    "footer.about":      "About",
    "footer.rooms":      "Rooms",
    "footer.amenities":  "Amenities",
    "footer.gallery":    "Gallery",
    "footer.maps":       "Google Maps",
    "footer.privacy":    "Privacy policy",
    "footer.terms":      "Terms of use",
    "footer.cancel":     "Cancellation policy",
    "footer.copyright":  "© 2026 Asteria Apartments. All rights reserved.",
    "footer.tagline":    "Designed for memorable stays.",

    // Lightbox
    "lightbox.close": "Close",
    "lightbox.prev":  "Previous photo",
    "lightbox.next":  "Next photo",
    "lightbox.aria":  "Photo viewer",

    // Page title
    "_page.title": "Asteria Apartments | Rooms & Hospitality",

    // WhatsApp message
    "_wa.message": "Hello! I would like to enquire about availability.",
  }
};

/* ── Core apply function ──────────────────────────────────────── */

function applyLanguage(lang) {
  const dict = LANG[lang] || LANG.el;

  /* textContent */
  document.querySelectorAll("[data-i18n]").forEach(function(el) {
    var key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  /* aria-label */
  document.querySelectorAll("[data-i18n-aria]").forEach(function(el) {
    var key = el.getAttribute("data-i18n-aria");
    if (dict[key] !== undefined) {
      el.setAttribute("aria-label", dict[key]);
    }
  });

  /* placeholder */
  document.querySelectorAll("[data-i18n-ph]").forEach(function(el) {
    var key = el.getAttribute("data-i18n-ph");
    if (dict[key] !== undefined) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  /* title attribute */
  document.querySelectorAll("[data-i18n-title]").forEach(function(el) {
    var key = el.getAttribute("data-i18n-title");
    if (dict[key] !== undefined) {
      el.setAttribute("title", dict[key]);
    }
  });

  /* alt attribute (images) */
  document.querySelectorAll("[data-i18n-alt]").forEach(function(el) {
    var key = el.getAttribute("data-i18n-alt");
    if (dict[key] !== undefined) {
      el.setAttribute("alt", dict[key]);
    }
  });

  /* iframe title */
  document.querySelectorAll("[data-i18n-iframe-title]").forEach(function(el) {
    var key = el.getAttribute("data-i18n-iframe-title");
    if (dict[key] !== undefined) {
      el.setAttribute("title", dict[key]);
    }
  });

  /* Page title */
  if (dict["_page.title"]) {
    document.title = dict["_page.title"];
  }

  /* html lang attribute */
  document.documentElement.lang = lang;

  /* Toggle button text */
  var btn = document.getElementById("langToggle");
  if (btn) {
    btn.textContent = dict["lang.toggle.label"] || (lang === "el" ? "EN" : "GR");
    btn.setAttribute("aria-label", dict["lang.toggle.aria"] || "");
    btn.setAttribute("lang", lang === "el" ? "en" : "el");
  }

  /* Update booking summary placeholder to match language */
  var summary = document.getElementById("bookingSummary");
  if (summary && summary.dataset.empty !== "false") {
    summary.textContent = dict["book.summary"] || "";
  }
}

/* ── Toggle function ──────────────────────────────────────────── */

function toggleLanguage() {
  var current = (document.documentElement.lang === "en") ? "en" : "el";
  var next    = (current === "el") ? "en" : "el";
  applyLanguage(next);
  try { localStorage.setItem("asteria-lang", next); } catch (e) { /* storage blocked */ }
}

/* ── Init on DOM ready ────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", function() {
  /* Read saved preference; fall back to Greek */
  var saved = "el";
  try { saved = localStorage.getItem("asteria-lang") || "el"; } catch (e) {}
  /* Only apply English if explicitly set; Greek is the default HTML */
  if (saved === "en") {
    applyLanguage("en");
  }

  /* Wire up toggle button */
  var btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", toggleLanguage);
  }
});

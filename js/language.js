document.addEventListener("DOMContentLoaded", () => {
  const languageToggle = document.getElementById("languageToggle");

  if (!languageToggle) {
    console.error("Language toggle button not found.");
    return;
  }

  const translations = {
    el: {
      home: "Αρχική",
      property: "Το κατάλυμα",
      rooms: "Δωμάτια",
      amenities: "Παροχές",
      gallery: "Φωτογραφίες",
      location: "Τοποθεσία",
      booking: "Κράτηση"
    },
    en: {
      home: "Home",
      property: "The property",
      rooms: "Rooms",
      amenities: "Amenities",
      gallery: "Gallery",
      location: "Location",
      booking: "Book now"
    }
  };

  let currentLanguage = localStorage.getItem("siteLanguage") || "el";

  function applyLanguage(language) {
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (translations[language][key]) {
        element.textContent = translations[language][key];
      }
    });

    languageToggle.textContent = language === "el" ? "EN" : "EL";
    localStorage.setItem("siteLanguage", language);
  }

  languageToggle.addEventListener("click", (event) => {
    event.preventDefault();

    currentLanguage = currentLanguage === "el" ? "en" : "el";
    applyLanguage(currentLanguage);
  });

  applyLanguage(currentLanguage);
});

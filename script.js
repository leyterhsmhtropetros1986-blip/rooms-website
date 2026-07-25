document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const navigation = document.getElementById("navigation");

  if (!menuButton || !navigation) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Άνοιγμα μενού");
    });
  });

  /* ── Scroll-spy: highlight active nav link ──────────────────── */

  const navLinks = Array.from(navigation.querySelectorAll('a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length === 0 || !("IntersectionObserver" in window)) return;

  function setActive(id) {
    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${id}`;
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
});
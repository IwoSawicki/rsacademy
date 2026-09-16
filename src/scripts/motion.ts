import { initFitText } from "./fit-text";
import { initMenu } from "./menu";
import { initReviews } from "./reviews";
import { initParallax } from "./parallax";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Elemente mit [data-reveal] beim Eintritt in den Viewport einblenden. */
function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>(
    "[data-reveal], [data-word-reveal]",
  );
  if (reduced) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}

/** Zahlen von 0 auf den Zielwert hochzählen, sobald sichtbar. */
function initCounters() {
  const counters = document.querySelectorAll<HTMLElement>("[data-counter]");

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.counter ?? 0);
    if (reduced) {
      el.textContent = String(target);
      return;
    }

    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((el) => observer.observe(el));
}

/** Akkordeons (Leistungen + FAQ): immer nur eines offen pro Liste. */
function initAccordions() {
  document.querySelectorAll<HTMLButtonElement>("[data-accordion]").forEach((button) => {
    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      const list = button.closest("ul");

      list?.querySelectorAll<HTMLButtonElement>("[data-accordion]").forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        const panel = other.parentElement?.querySelector<HTMLElement>(
          "[data-accordion-panel]",
        );
        if (panel) panel.style.gridTemplateRows = "0fr";
      });

      if (isOpen) return;

      button.setAttribute("aria-expanded", "true");
      const panel = button.parentElement?.querySelector<HTMLElement>(
        "[data-accordion-panel]",
      );
      if (panel) panel.style.gridTemplateRows = "1fr";
    });
  });
}

/** Kontaktformular: noch kein Backend angebunden. */
function initContactForm() {
  document.querySelectorAll<HTMLFormElement>("[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      // TODO: Zielendpunkt des Originals ist im Clone nicht enthalten.
    });
  });
}

function init() {
  initFitText();
  initReveal();
  initParallax();
  initCounters();
  initAccordions();
  initReviews();
  initContactForm();
}

// Das Menü muss sofort bedienbar sein, unabhängig vom Ladebildschirm
initMenu();

if (document.getElementById("preloader")) {
  document.addEventListener("preloader:done", init, { once: true });
} else {
  init();
}

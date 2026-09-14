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

/** Bewertungs-Slider im Hero. */
function initReviewSlider() {
  document.querySelectorAll<HTMLElement>("[data-review-slider]").forEach((root) => {
    const slides = root.querySelectorAll<HTMLElement>("[data-review-slide]");
    const dots = root.querySelectorAll<HTMLElement>("[data-review-dot]");
    const prev = root.querySelector<HTMLButtonElement>("[data-review-prev]");
    const next = root.querySelector<HTMLButtonElement>("[data-review-next]");
    if (slides.length < 2) return;

    let index = 0;

    const show = (to: number) => {
      index = (to + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle("opacity-100", active);
        slide.classList.toggle("opacity-0", !active);
        slide.classList.toggle("pointer-events-none", !active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("opacity-100", i === index);
        dot.classList.toggle("opacity-30", i !== index);
      });
      prev?.classList.toggle("opacity-30", index === 0);
      prev?.classList.toggle("opacity-100", index !== 0);
    };

    prev?.addEventListener("click", () => show(index - 1));
    next?.addEventListener("click", () => show(index + 1));
    show(0);
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
  initReveal();
  initCounters();
  initAccordions();
  initReviewSlider();
  initContactForm();
}

if (document.getElementById("preloader")) {
  document.addEventListener("preloader:done", init, { once: true });
} else {
  init();
}

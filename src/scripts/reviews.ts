/**
 * Bewertungs-Stack im Hero.
 * Drei Karten rotieren durch drei Positionen — exakt die Werte aus dem Clone:
 *   vorne:  relativ,  z-index 3, scale 1
 *   mitte:  absolut,  z-index 2, bottom -14px, scale 0.95
 *   hinten: absolut,  z-index 1, bottom -28px, scale 0.9
 * Der Wechsel läuft automatisch und lässt sich über die Pfeile steuern.
 */
const SLOTS = [
  { z: "3", bottom: "0px", scale: 1, absolute: false },
  { z: "2", bottom: "-14px", scale: 0.95, absolute: true },
  { z: "1", bottom: "-28px", scale: 0.9, absolute: true },
];

const INTERVAL = 3400;

export function initReviews() {
  document.querySelectorAll<HTMLElement>("[data-review-stack]").forEach((root) => {
    const cards = [...root.querySelectorAll<HTMLElement>("[data-review-card]")];
    const dots = root.querySelectorAll<HTMLElement>("[data-review-dot]");
    const prev = root.querySelector<HTMLButtonElement>("[data-review-prev]");
    const next = root.querySelector<HTMLButtonElement>("[data-review-next]");
    if (cards.length < 2) return;

    let front = 0;
    let timer = 0;

    const render = () => {
      cards.forEach((card, i) => {
        const slot = SLOTS[(i - front + cards.length) % cards.length] ?? SLOTS.at(-1)!;
        card.style.position = slot.absolute ? "absolute" : "relative";
        card.style.inset = slot.absolute ? "auto 0 auto 0" : "";
        card.style.bottom = slot.bottom;
        card.style.zIndex = slot.z;
        card.style.transform = `scale(${slot.scale})`;
        card.setAttribute("aria-hidden", String(i !== front));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("opacity-100", i === front);
        dot.classList.toggle("opacity-30", i !== front);
      });
    };

    const go = (to: number) => {
      front = (to + cards.length) % cards.length;
      render();
    };

    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => go(front + 1), INTERVAL);
    };

    const nudge = (step: number) => {
      go(front + step);
      start();
    };

    prev?.addEventListener("click", () => nudge(-1));
    next?.addEventListener("click", () => nudge(1));
    root.addEventListener("mouseenter", () => window.clearInterval(timer));
    root.addEventListener("mouseleave", start);

    render();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
  });
}

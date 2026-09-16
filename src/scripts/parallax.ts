/**
 * Scroll-gebundene Verschiebung.
 *
 * Die Einleitung startet im Original bei `translateY(-150px) scale(0.95)`
 * und läuft beim Hereinscrollen auf den Normalzustand — das ist keine
 * Einblendung, sondern an die Scrollposition gekoppelt.
 *
 * Fortschritt 0 -> 1, während die Oberkante des Elements vom unteren
 * Bildschirmrand bis zur Mitte wandert.
 */
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function initParallax() {
  const nodes = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
  if (!nodes.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((el) => (el.style.transform = "none"));
    return;
  }

  const update = () => {
    const viewport = window.innerHeight;
    for (const el of nodes) {
      const shift = Number(el.dataset.parallaxShift ?? -150);
      const from = Number(el.dataset.parallaxScale ?? 0.95);
      const rect = el.getBoundingClientRect();

      const progress = clamp((viewport - rect.top) / (viewport * 0.5));
      const y = shift * (1 - progress);
      const scale = from + (1 - from) * progress;
      el.style.transform = `translateY(${y.toFixed(2)}px) scale(${scale.toFixed(4)})`;
    }
  };

  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

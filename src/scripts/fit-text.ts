/**
 * Misst jeden [data-fit-text]-Block nach und setzt die viewBox auf die
 * tatsächliche Textgröße, damit der Text die Container-Breite exakt füllt.
 *
 * Der Text im foreignObject ist in viewBox-Einheiten gesetzt, seine Größe in
 * diesen Einheiten ist also konstant. Aus gemessener Pixelbreite geteilt durch
 * den aktuellen Maßstab ergibt sich die passende viewBox — ein Durchgang reicht.
 */
function fit(svg: SVGSVGElement) {
  const text = svg.querySelector<HTMLElement>("foreignObject > p");
  const box = svg.viewBox.baseVal;
  if (!text || !box.width) return;

  const scale = svg.getBoundingClientRect().width / box.width;
  if (!scale) return;

  const rect = text.getBoundingClientRect();
  const width = rect.width / scale;
  const height = rect.height / scale;
  if (!width || !height) return;

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
}

export function initFitText() {
  const nodes = document.querySelectorAll<SVGSVGElement>("[data-fit-text]");
  if (!nodes.length) return;

  const run = () => nodes.forEach(fit);

  run();
  // Nach dem Laden der Webfonts stimmen die Metriken erst richtig
  document.fonts?.ready.then(run);

  let frame = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(run);
  });
}

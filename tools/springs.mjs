/**
 * Übersetzt die Feder-Parameter des Originals (aus dem appear-animations-JSON
 * im Clone) in CSS-`linear()`-Kurven. Damit läuft die Animation exakt wie bei
 * Framer Motion, statt über eine geratene cubic-bezier.
 *
 * Federgleichung: m·x'' = -k·(x-1) - c·x'
 */
const SPRINGS = {
  'hero': { stiffness: 120, damping: 25, mass: 0.3 },
  'hero-phone': { stiffness: 130, damping: 27, mass: 0.3 },
  'reveal': { stiffness: 121, damping: 27, mass: 0.3 },
};

function simulate({ stiffness, damping, mass }, steps = 60) {
  const dt = 1 / 1000;
  let x = 0, v = 0;
  const trace = [];
  const restDelta = 0.0005, restSpeed = 0.01;

  for (let t = 0; t < 10000; t++) {
    const a = (-stiffness * (x - 1) - damping * v) / mass;
    v += a * dt;
    x += v * dt;
    trace.push(x);
    if (Math.abs(1 - x) < restDelta && Math.abs(v) < restSpeed) break;
  }

  const duration = trace.length / 1000;
  const points = Array.from({ length: steps }, (_, i) => {
    const idx = Math.min(trace.length - 1, Math.round((i / (steps - 1)) * (trace.length - 1)));
    return Math.round(trace[idx] * 10000) / 10000;
  });
  return { duration, easing: `linear(${points.join(',')})` };
}

for (const [name, spec] of Object.entries(SPRINGS)) {
  const { duration, easing } = simulate(spec);
  console.log(`  --spring-${name}-duration: ${duration.toFixed(3)}s;`);
  console.log(`  --spring-${name}: ${easing};`);
}

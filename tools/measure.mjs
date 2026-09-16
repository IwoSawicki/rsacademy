/**
 * Stellt Original (:8090) und Nachbau (:4321) Element für Element gegenüber.
 *
 * Die Paare stehen in tools/pairs.json: links der Selektor im Clone, rechts
 * das `data-measure`-Attribut im Nachbau. Verglichen werden Breite, Höhe,
 * horizontale Position, Innenabstand, Abstand, Radius und Hintergrund.
 *
 *   node tools/measure.mjs [breite]
 *
 * Damit Textbreiten vergleichbar sind, wird auf beiden Seiten dieselbe
 * Schrift erzwungen — in dieser Umgebung sind die Webfonts nicht erreichbar,
 * und unterschiedliche Fallbacks würden sonst falsche Abweichungen erzeugen.
 */
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const WIDTH = Number(process.argv[2] ?? 1440);
const { paare: PAIRS } = JSON.parse(
  await readFile(new URL('./pairs.json', import.meta.url), 'utf8'),
);

/**
 * Beide Seiten in den Endzustand bringen. Wichtig: das Original hält die
 * Startwerte der Einblendungen als Inline-Styles — auch dort, wo die Deckkraft
 * schon 1 ist, aber noch ein `transform: scale(...)` gesetzt ist. Ohne das
 * Zurücksetzen misst man den animierten Zwischenzustand statt des Layouts.
 */
const PREP = `
  [style*="transform"], [style*="opacity"], [data-framer-appear-id],
  .framer-text span, [data-reveal], [data-star-pop] {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
  #preloader { display: none !important; }
  /* Gleiche Schrift auf beiden Seiten: die Webfonts sind hier nicht
     erreichbar, unterschiedliche Fallbacks ergäben falsche Textbreiten. */
  * { font-family: "DejaVu Sans", Arial, sans-serif !important; }
`;

const FIELDS = ['w', 'h', 'x', 'padding', 'gap', 'borderRadius', 'backgroundColor'];

/** Zusätzliche Eigenschaften für Paare mit "detail": true. */
const DETAIL = ['backdropFilter', 'opacity', 'borderWidth', 'boxShadow'];

async function collect(url, key) {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: 900 } });
  await page.goto(url, { waitUntil: 'load' });
  await page.addStyleTag({ content: PREP });
  await page.waitForTimeout(2200);
  const data = await page.evaluate(({ pairs, key, detail }) => {
    const out = {};
    for (const pair of pairs) {
      const sel = key === 'orig' ? pair.orig : `[data-measure="${pair.mine}"]`;
      const el = [...document.querySelectorAll(sel)].find(
        (n) => n.offsetParent || getComputedStyle(n).position === 'fixed',
      );
      if (!el) { out[pair.name] = null; continue; }
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const entry = {
        w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.left),
        padding: cs.padding, gap: cs.gap,
        borderRadius: cs.borderRadius, backgroundColor: cs.backgroundColor,
      };
      if (pair.detail) for (const k of detail) {
        // Tailwind stapelt leere Schatten vor den echten — für den Vergleich
        // nur die sichtbaren Anteile behalten.
        entry[k] = k === 'boxShadow'
          ? cs[k].split(/,(?![^(]*\))/).map((x) => x.trim())
              .filter((x) => x && !/rgba\(0, 0, 0, 0\) 0px 0px 0px 0px/.test(x)).join(', ') || 'none'
          : cs[k];
      }
      out[pair.name] = entry;
    }
    out.__height = document.body.scrollHeight;
    return out;
  }, { pairs: PAIRS, key, detail: DETAIL });
  await page.close();
  return data;
}

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const orig = await collect('http://127.0.0.1:8090/', 'orig');
const mine = await collect('http://127.0.0.1:4321/', 'mine');
await browser.close();

const TOL = 6;
let diffs = 0, missing = 0;

console.log(`\nBreite ${WIDTH}px — Seitenhöhe Original ${orig.__height}, Nachbau ${mine.__height}\n`);
console.log('Element                     Feld              Original            Nachbau');
console.log('-'.repeat(82));

for (const { name } of PAIRS) {
  const a = orig[name], b = mine[name];
  if (!a || !b) {
    console.log(`${name.padEnd(27)} ${!a ? 'im Original nicht gefunden' : 'im Nachbau nicht ausgezeichnet'}`);
    missing++;
    continue;
  }
  for (const f of [...FIELDS, ...(PAIRS.find((x) => x.name === name)?.detail ? DETAIL : [])]) {
    const av = a[f], bv = b[f];
    const bad = typeof av === 'number'
      ? Math.abs(av - bv) > TOL
      : String(av) !== String(bv);
    if (bad) {
      console.log(`${name.padEnd(27)} ${f.padEnd(17)} ${String(av).padEnd(19)} ${bv}`);
      diffs++;
    }
  }
}
console.log('-'.repeat(82));
console.log(`${diffs} Abweichungen, ${missing} Paare ohne Treffer.`);

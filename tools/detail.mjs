/**
 * Liest die Detaileigenschaften einzelner Elemente aus beiden Seiten aus.
 *   node tools/detail.mjs <breite> orig|mine <selektor> [selektor...]
 */
import { chromium } from 'playwright';

const [width, side, ...sels] = process.argv.slice(2);
const url = side === 'orig' ? 'http://127.0.0.1:8090/' : 'http://127.0.0.1:4321/';

const PROPS = [
  'backgroundColor', 'backdropFilter', 'borderRadius', 'opacity', 'boxShadow',
  'padding', 'gap', 'width', 'height', 'border', 'color', 'fontSize', 'fontWeight',
  'objectFit', 'filter', 'overflow',
];

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: Number(width), height: 900 } });
await p.goto(url, { waitUntil: 'load' });
await p.addStyleTag({ content: `
  [style*="transform"],[style*="opacity"],[data-framer-appear-id],.framer-text span,[data-reveal],[data-star-pop]{opacity:1!important;transform:none!important;filter:none!important}
  #preloader{display:none!important}
` });
await p.waitForTimeout(2000);

const rows = await p.evaluate(({ sels, props }) => sels.map((s) => {
  const el = [...document.querySelectorAll(s)].find((n) => n.offsetParent || getComputedStyle(n).position === 'fixed');
  if (!el) return [s, null];
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const out = { box: `${Math.round(r.width)}x${Math.round(r.height)}` };
  for (const k of props) {
    const v = cs[k];
    if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px') out[k] = v;
  }
  return [s, out];
}), { sels, props: PROPS });

for (const [s, v] of rows) {
  console.log(`\n${side}  ${s}`);
  if (!v) { console.log('   nicht gefunden'); continue; }
  for (const [k, val] of Object.entries(v)) console.log(`   ${k.padEnd(17)} ${val}`);
}
await b.close();

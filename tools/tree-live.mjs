/**
 * Gibt den sichtbaren DOM-Baum unterhalb eines Selektors aus, mit Maßen.
 *   node tools/tree-live.mjs <breite> orig|mine <selektor> [tiefe]
 */
import { chromium } from 'playwright';
const [width, side, sel, depth = '4'] = process.argv.slice(2);
const url = side === 'orig' ? 'http://127.0.0.1:8090/' : 'http://127.0.0.1:4321/';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: Number(width), height: 900 } });
await p.goto(url, { waitUntil: 'load' });
await p.addStyleTag({ content: `
  [style*="transform"],[style*="opacity"],[data-framer-appear-id],.framer-text span,[data-reveal],[data-star-pop],[data-parallax]{opacity:1!important;transform:none!important}
  #preloader{display:none!important}` });
await p.waitForTimeout(2000);
const lines = await p.evaluate(({ sel, max }) => {
  const root = [...document.querySelectorAll(sel)].find((n) => n.offsetParent);
  if (!root) return ['nicht gefunden'];
  const out = [];
  const walk = (el, d) => {
    if (d > max) return;
    for (const c of el.children) {
      if (!c.offsetParent && getComputedStyle(c).position !== 'fixed') continue;
      const r = c.getBoundingClientRect();
      const cs = getComputedStyle(c);
      const name = c.getAttribute('data-framer-name') || c.getAttribute('data-measure') || '';
      const cls = (c.className.baseVal ?? c.className ?? '').toString().split(' ').find((x) => /^framer-[\w-]+$/.test(x)) || c.tagName.toLowerCase();
      const text = [...c.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').slice(0, 26);
      out.push(`${'  '.repeat(d)}${cls} ${name ? `[${name}] ` : ''}${Math.round(r.width)}x${Math.round(r.height)} gap=${cs.gap} pad=${cs.padding}${text ? ` "${text}"` : ''}`);
      walk(c, d + 1);
    }
  };
  walk(root, 0);
  return out;
}, { sel, max: Number(depth) });
lines.forEach((l) => console.log(l));
await b.close();

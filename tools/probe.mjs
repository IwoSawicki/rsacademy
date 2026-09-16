import { chromium } from 'playwright';
const SEL = process.argv.slice(3);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: Number(process.argv[2] ?? 1440), height: 900 } });
await p.goto('http://127.0.0.1:8090/', { waitUntil: 'load' });
await p.addStyleTag({ content: `[data-framer-appear-id],[style*="opacity:0"]{opacity:1!important;transform:none!important}` });
await p.waitForTimeout(1800);
const rows = await p.evaluate((sels) => sels.map((s) => {
  const el = document.querySelector(s);
  if (!el) return [s, 'FEHLT'];
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  return [s, `${Math.round(r.width)}x${Math.round(r.height)} @x=${Math.round(r.left)} pad=${cs.padding} radius=${cs.borderRadius} bg=${cs.backgroundColor} gridCol=${cs.gridColumn}`];
}), SEL);
rows.forEach(([a, c]) => console.log(a.padEnd(26), c));
await b.close();

import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [n, w, h] of [['hero-desktop',1440,900],['hero-phone',390,844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto('http://127.0.0.1:4321/', { waitUntil: 'load' });
  await p.waitForTimeout(3200);
  await p.screenshot({ path: new URL(`../docs/shots/${n}.png`, import.meta.url).pathname });
  await p.close();
}
await b.close();

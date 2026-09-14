import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://127.0.0.1:4321/', { waitUntil: 'load' });
await p.waitForTimeout(3000);
await p.screenshot({ path: new URL('../docs/shots/hero-desktop.png', import.meta.url).pathname });
await b.close();

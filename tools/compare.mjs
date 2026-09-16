/**
 * Rendert Original (:8090) und Nachbau (:4321) bei identischen Breiten
 * und legt die Screenshots nebeneinander in docs/compare/ ab.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const OUT = new URL('../docs/compare/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

const REVEAL = `
  [data-framer-appear-id], .framer-text span { opacity: 1 !important; transform: none !important; filter: none !important; }
  [style*="opacity:0.001"], [style*="opacity:0"] { opacity: 1 !important; transform: none !important; }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
  #preloader { display: none !important; }
`;

const VIEWS = [['desktop', 1440], ['tablet', 1024], ['phone', 390]];
const TARGETS = [['orig', 'http://127.0.0.1:8090/'], ['mine', 'http://127.0.0.1:4321/']];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const [view, width] of VIEWS) {
  for (const [name, url] of TARGETS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url, { waitUntil: 'load' });
    await page.addStyleTag({ content: REVEAL });
    await page.waitForTimeout(2500);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    await page.addStyleTag({ content: REVEAL });
    await page.waitForTimeout(400);
    const height = await page.evaluate(() => document.body.scrollHeight);
    await page.screenshot({ path: `${OUT}${view}-${name}.png`, fullPage: true });
    console.log(`${view.padEnd(8)} ${name.padEnd(5)} height=${height}`);
    await page.close();
  }
}
await browser.close();

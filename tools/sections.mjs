/**
 * Stellt jede Section einzeln gegenüber: schneidet auf beiden Seiten denselben
 * Bereich aus und legt die Bilder als docs/compare/<section>-{orig,mine}.png ab.
 *
 *   node tools/sections.mjs [breite]
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const WIDTH = Number(process.argv[2] ?? 1440);
const OUT = new URL('../docs/compare/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

/** Section -> Selektor im Original, data-measure im Nachbau */
const SECTIONS = [
  ['hero',        '[data-framer-name="First screen"]', 'hero-screen'],
  ['einleitung',  '.framer-1xayq43',                   'intro-container'],
  ['kurse',       '.framer-oh8nsj',                    'kurse-container'],
  ['numbers',     '.framer-sl8twl',                    'numbers-container'],
  ['bento',       '.framer-1injmib',                   'bento-grid'],
  ['leistungen',  '.framer-1x8odko',                   'leistungen-container'],
  ['faq',         '.framer-pcuxg5',                    'faq-container'],
  ['kontakt',     '.framer-1ozc41g',                   'kontakt-container'],
  ['footer',      '.framer-trcty',                     'footer-top'],
];

const PREP = `
  [style*="transform"],[style*="opacity"],[data-framer-appear-id],.framer-text span,
  [data-reveal],[data-star-pop],[data-parallax]{opacity:1!important;transform:none!important;filter:none!important}
  #preloader{display:none!important}
`;

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const [side, url] of [['orig', 'http://127.0.0.1:8090/'], ['mine', 'http://127.0.0.1:4321/']]) {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: 900 } });
  await page.goto(url, { waitUntil: 'load' });
  await page.addStyleTag({ content: PREP });
  await page.waitForTimeout(2200);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.addStyleTag({ content: PREP });
  await page.waitForTimeout(800);

  for (const [name, origSel, mineKey] of SECTIONS) {
    const sel = side === 'orig' ? origSel : `[data-measure="${mineKey}"]`;
    const el = await page.$(sel);
    if (!el) { console.log(`${name.padEnd(12)} ${side}: nicht gefunden`); continue; }
    try {
      await el.screenshot({ path: `${OUT}${name}-${side}.png` });
      const box = await el.boundingBox();
      console.log(`${name.padEnd(12)} ${side}: ${Math.round(box.width)}x${Math.round(box.height)}`);
    } catch (e) {
      console.log(`${name.padEnd(12)} ${side}: ${e.message.split('\n')[0]}`);
    }
  }
  await page.close();
}
await browser.close();

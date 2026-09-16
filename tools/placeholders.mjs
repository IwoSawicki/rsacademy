/**
 * Erzeugt neutrale SVG-Platzhalter unter public/images/.
 * Ersetzen, sobald die Originalbilder aus dem Framer-CDN vorliegen —
 * Dateinamen und Seitenverhältnisse entsprechen den Originalen.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../public/images/', import.meta.url));

/** name, Breite, Höhe, Grundton, Beschriftung */
const FILES = [
  ['hero-bg', 1920, 1080, '#1c1c1c', 'Hero'],
  ['portrait', 944, 1500, '#242424', 'Portrait'],
  ['leistungen-bg', 1600, 900, '#1c1c1c', 'Leistungen'],
  ['faq', 800, 1000, '#d8d8d8', 'FAQ'],
  ['avatar', 512, 512, '#c8c8c8', ''],
  ['kurs-absturzsicherheit', 600, 400, '#cfcfcf', 'Absturzsicherheit PSAgA'],
  ['kurs-hab-international', 600, 400, '#cfcfcf', 'HAB International'],
  ['kurs-bauarbeitenverordnung', 600, 400, '#cfcfcf', 'Bauarbeitenverordnung'],
  ['kurs-hallenkran', 600, 400, '#cfcfcf', 'Hallenkran / Portalkran'],
  ['kurs-personaltraining', 600, 400, '#cfcfcf', 'Personaltraining'],
  ['kurs-lasten-anschlagen', 600, 400, '#cfcfcf', 'Lasten anschlagen'],
  ['kurs-baumaschinen', 600, 400, '#cfcfcf', 'Baumaschinen M1'],
  ['kurs-gabelstapler-grundkurs', 600, 400, '#cfcfcf', 'Gabelstapler Grundkurs'],
  ['kurs-gabelstapler-refresh', 600, 400, '#cfcfcf', 'Gabelstapler Refresh'],
];

/** Heller Ton wird dunkel beschriftet, dunkler hell. */
const isDark = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
};

const svg = (w, h, tone, label) => {
  const ink = isDark(tone) ? '#ffffff' : '#0a0a0a';
  const size = Math.round(Math.min(w, h) / 14);
  const text = label
    ? `<text x="50%" y="50%" fill="${ink}" fill-opacity=".45" font-family="Inter, system-ui, sans-serif"
       font-size="${size}" font-weight="600" letter-spacing="-.04em"
       text-anchor="middle" dominant-baseline="middle">${label}</text>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <defs>
    <pattern id="p" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="28" stroke="${ink}" stroke-opacity=".05" stroke-width="10"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="${tone}"/>
  <rect width="${w}" height="${h}" fill="url(#p)"/>
  ${text}
</svg>
`;
};

/** Favicon-Platzhalter: Monogramm auf dunklem Grund. */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img">
  <rect width="64" height="64" rx="12" fill="#0a0a0a"/>
  <text x="50%" y="52%" fill="#ffffff" font-family="Inter, system-ui, sans-serif"
    font-size="26" font-weight="600" letter-spacing="-.04em"
    text-anchor="middle" dominant-baseline="middle">RS</text>
</svg>
`;

await mkdir(OUT, { recursive: true });
await writeFile(`${OUT}favicon.svg`, favicon, 'utf8');
await Promise.all(
  FILES.map(([name, w, h, tone, label]) =>
    writeFile(`${OUT}${name}.svg`, svg(w, h, tone, label), 'utf8'),
  ),
);
console.log(`${FILES.length + 1} Platzhalter geschrieben nach public/images/`);

# Abgleich mit dem Original

Das SSR-HTML im Clone enthält das **komplette CSS inline**. Damit lässt sich das
Original lokal rendern und Element für Element gegen den Nachbau messen — statt
Werte aus dem Quelltext zu lesen und zu schätzen.

## Verfahren

```bash
# 1. Original aufbereiten (einmalig, siehe unten) und ausliefern
node tools/serve-original.mjs <pfad-zum-aufbereiteten-clone>   # :8090

# 2. Nachbau bauen und ausliefern
npm run build && npx astro preview --port 4321                 # :4321

# 3. Messen
node tools/measure.mjs 1440
node tools/measure.mjs 1024
node tools/measure.mjs 390

# 4. Optisch gegenüberstellen
node tools/compare.mjs        # legt docs/compare/<breite>-{orig,mine}.png ab

# 5. Einzelne Elemente im Original nachschlagen
node tools/probe.mjs 1440 ".framer-1b8ph4g" ".framer-lahi66"
```

### Original aufbereiten

`reference/rsacademy.ch/index.html` in einen Ordner kopieren und dort:

- `https://fonts.gstatic.com/` → `/fonts.gstatic.com/` ersetzen und
  `reference/fonts.gstatic.com/` danebenlegen
- die `<script type="module">`-Tags entfernen, damit die SSR-Ausgabe stehen bleibt

## Wie die Paare zustande kommen

`tools/pairs.json` hält die Zuordnung: links der Framer-Selektor im Clone,
rechts ein `data-measure`-Attribut im Nachbau.

```json
{ "name": "Hero BG", "orig": ".framer-1b8ph4g", "mine": "hero-bg" }
```

Verglichen werden Breite, Höhe, horizontale Position, Innenabstand, Abstand,
Radius und Hintergrundfarbe. Toleranz 6px.

Neue Bereiche prüfen: Selektor im Clone suchen, Paar in `pairs.json` eintragen,
`data-measure` im Bauteil ergänzen.

## Zwei Fallstricke, die die Messung verfälschen

1. **Animierte Zwischenzustände.** Das Original hält die Startwerte der
   Einblendungen als Inline-Styles — teils mit `opacity: 1`, aber noch mit
   `transform: scale(0.95)`. Wer die nicht zurücksetzt, misst den animierten
   Zustand. `measure.mjs` neutralisiert deshalb jeden Inline-`transform`.
   (Genau das hatte mich einmal zu einem falschen Container-Maß verleitet.)

2. **Unterschiedliche Fallback-Schriften.** In dieser Umgebung sind weder
   Google Fonts noch das Framer-CDN erreichbar, beide Seiten fallen also auf
   Systemschriften zurück — aber auf unterschiedliche, weil die
   `font-family`-Ketten sich unterscheiden. Das erzeugt Textbreiten-Abweichungen
   von rund 10%. `measure.mjs` erzwingt deshalb auf beiden Seiten dieselbe
   Schrift. Höhenunterschiede, die aus Zeilenumbrüchen stammen, bleiben davon
   trotzdem teilweise betroffen.

## Was die Messung nicht abdeckt

- **Animationsverläufe.** Die Parameter stehen im Clone (siehe `analyse.md`),
  der zeitliche Ablauf wird aber nicht automatisch verglichen.
- **Hover- und Klickzustände.** Nur der Ruhezustand wird gemessen.
- **Bilder.** Solange Platzhalter im Einsatz sind, weichen Höhen ab, die vom
  Bildinhalt abhängen.
- **`gap` bei ungleicher Verschachtelung.** Sitzt das `data-measure` eine Ebene
  neben dem Original-Element, meldet das Werkzeug `normal` gegen einen Wert.
  Das sind Artefakte der Zuordnung, keine Layoutfehler — erkennbar daran, dass
  Breite, Höhe und Position übereinstimmen.

## Aktueller Stand

Protokolle: `abgleich-1440.txt`, `abgleich-1024.txt`, `abgleich-390.txt`.

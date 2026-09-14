# Analyse des Originals — rsacademy.ch (Startseite)

Quelle: `reference/rsacademy.ch/index.html` (638 KB, Framer-SSR-Export).

## Breakpoints

Aus `data-framer-hydrate-v2` und den Media Queries verifiziert:

| Stufe | Media Query |
|---|---|
| Desktop | `min-width: 1200px` |
| Tablet | `min-width: 810px` und `max-width: 1199.98px` |
| Phone | `max-width: 809.98px` |

In Tailwind abgebildet als `--breakpoint-tablet: 810px` und `--breakpoint-desktop: 1200px`.

## Farb-Tokens

| Token im Original | Wert | Verwendung |
|---|---|---|
| `--token-90ab9b9d…` | `#ffffff` | Paper |
| `--token-88d5059b…` | `#0a0a0a` | Ink (Text, dunkle Flächen) |
| `--token-eea70a16…` | `#f5f5f5` | Surface (Seitenhintergrund) |
| `--token-9ee7e1e3…` | `#204496` | Akzent (blau) |
| — | `#090909` | Ink-Soft (Überschriften) |
| — | `rgb(255, 234, 0)` | Sterne |

## Schriften

Inter (Haupt), Geist (Leistungen-Akkordeon), Figtree und Poppins (vereinzelt).
Alle über `fonts.gstatic.com`.

## Text-Presets

Framer-Preset → Klasse in `src/styles/global.css`, Werte je Breakpoint (Desktop/Tablet/Phone):

| Preset | Klasse | Größe D/T/P | Weight | Letter-Spacing | Line-Height |
|---|---|---|---|---|---|
| `1yvd34u` | `.t-display` | 144 / 99 / 50 | 600 | −0.06em | 92% |
| `4vuy4n` | `.t-h1` | 60 / 50 / 32 | 600 | −0.06em | 110% |
| `hik9eh` | `.t-h2` | 38 / 30 / 24 | 600 | −0.05em | 110% |
| `xgn84q` | `.t-h3` | 30 / 28 / 24 | 600 | −0.04em | 125% |
| `1rii1wr` | `.t-lead` | 30 / 28 / 24 | 500 | −0.04em | 120% |
| `1hin0ji` | `.t-subhead` | 26 / 23 / 22 | 500 | −0.04em | 115% |
| `1oueo73` | `.t-quote` | 22 / 20 / 19 | 500 | −0.04em | 1.2em |
| `1qnjizk` | `.t-body-lg` | 18 / 17 / 15 | 500 | −0.04em | 130% |
| `1n1wh7h` | `.t-body` | 16 / 14 / 13 | 500 | −0.04em | 140% |
| `9v8dhs` | `.t-label` | 18 / 15 / 15 | 600 | −0.04em | 1.2em |
| `txwsq6` | `.t-small` | 14 / 13 / 12 | 500 | −0.04em | 1.3em |
| `2s58fc` | `.t-caption` | 12 / 11 / 11 | 500 | −0.04em | 130% |

## Layout-Maße

- Seitenabstand: `36px` Desktop, `30px` Tablet, `20px` Phone (`.section-x`)
- Content-Max-Width: `1000px`, Full-Width-Elemente `1520px`
- Abstand zwischen Sections (`<main>`): `190px` Desktop, `120px` Tablet/Phone
- Header: fixed, max. `1200px`, Padding `19px 36px`, `backdrop-filter: blur(7px)`
- Button: Höhe `58px`, Padding `18px 30px`, Radius `50px`
- Kurs-Karte: Radius `18px`, Bildcontainer `16px`, Bild-Aspect `1.36585`

## Sections in Reihenfolge

1. **Header** — fixed, Logo + Navigation, Burger unterhalb Desktop
2. **Hero** — Vollbild, Hintergrundbild + dunkles Overlay, Firmenname, „Profis in der Höhe", Claim, 3 Bewertungskarten
3. **Einleitung** — Label „Über uns", H1, zwei Fließtexte (Wort-für-Wort-Reveal), Bewertung 4,9 / 320+, Telefon-Button
4. **Kursangebot** — 9 Karten im 2-Spalten-Raster, darunter zwei Buttons
5. **Numbers** — 4 Zähler
6. **Bento** — Portraitkarte Roger Schüle + Textkarte „Wir stehen für Sicherheit am Arbeitsplatz."
7. **Leistungen** — dunkle Karte mit Hintergrundbild, Akkordeon [01]–[04], Button
8. **FAQ** — Label + Headline + Bild, 5 Akkordeon-Einträge
9. **Kontakt** — Formular + dunkle Kontaktkarte
10. **Footer** — E-Mail-Headline, drei Linkspalten, Copyright

## Animationen

| Element | Trigger | Verhalten im Original |
|---|---|---|
| Preloader | Load | Wörter mit `opacity .001`, `blur(5px)`, `translateY(270px)` → eingeblendet, danach Fläche weg |
| Hero-Container | Load | `translateY(400px)` → 0 |
| Bewertungskarten | Load | `opacity 0`, `translateY(50px)` → 0 |
| Einleitung | Scroll | `translateY(-150px) scale(0.95)` → normal |
| Fließtext Einleitung | Scroll | Wort für Wort, je `translateY(10px)` + Fade |
| Kurs-Karte Hover | Hover | Bildcontainer `inset: 4px` → `inset: 0`, Pfeil `rotate(-40deg)` → `0` |
| Button Hover | Hover | Zwei Label-Kopien rollen durch (oben herein, unten heraus) |
| Zähler | Scroll | Hochzählen von 0 |
| Portrait (Bento) | Scroll | `perspective(1200px) translateY(-40px) scale(1.15)` |
| Akkordeon | Klick | Öffnen/Schließen, Plus-Icon dreht |

## Bekannte Lücken

1. **Zielwerte der Zähler** — im Clone steht nur der Startwert `0`; die Zielwerte liegen in
   den Framer-Modulen unter `framerusercontent.com/sites/…/*.mjs`, die der Clone nicht
   enthält. Aktuell Platzhalter in `src/data/site.ts` (`numbers`). **Bitte korrigieren.**
2. **Inhalte der Leistungen-Akkordeons** — das SSR-HTML enthält nur die geschlossenen
   Varianten. Die aufgeklappten Inhalte fehlen, die Einträge sind derzeit ohne Panel.
3. **Bilder** — `framerusercontent.com/` fehlt im Clone und ist aus dieser Umgebung nicht
   erreichbar. Alle Bilder werden per absoluter CDN-URL geladen (`src/data/site.ts`, `CDN`).
4. **Ziel des Kontaktformulars** — im Clone nicht enthalten, Submit ist derzeit ohne Backend.
5. **Hero-Bewertungen** — zwei der drei Karten enthalten im Original noch
   Template-Platzhaltertext („We've partnered with Climafix …"). Wortwörtlich übernommen.

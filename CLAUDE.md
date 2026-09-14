# CLAUDE.md — 1:1 Nachbau von https://rsacademy.ch

> Verbindliche Arbeitsanweisung für Claude Code in diesem Repository.
> Diese Datei hat Vorrang vor allgemeinen Konventionen. Bei Konflikt gilt: **Original schlägt Best Practice.**

---

## 1. Projektziel

Nachbau der **Homepage** von `https://rsacademy.ch` (Framer-Seite) als eigenständiges
**Astro + Tailwind**-Projekt — so nah am Original wie sinnvoll möglich.

Das Ergebnis soll visuell und im Verhalten dem Original entsprechen: gleiche Fonts, Farben,
Proportionen, Rundungen, Breakpoints, Animationen, Hover-States, Scroll-Effekte und Ladeverhalten.

**Sauberer Code hat Vorrang vor der letzten Nachkommastelle.** Werte dürfen auf eine
konsistente Skala gerundet werden (aus `17.6px` darf `16px` oder `18px` werden), solange
das Gesamtbild stimmt. Struktur, Rhythmus und Wirkung müssen passen — nicht jeder Pixel.

**Scope Phase 1:** ausschließlich die Startseite (`/`). Unterseiten nur nach ausdrücklicher Freigabe.

---

## 2. Referenzquelle

| Pfad | Inhalt |
|---|---|
| `reference/` | Der per `wget` gespiegelte Original-Clone. **Read-only. Niemals bearbeiten.** |
| `src/` | Der Nachbau. |
| `docs/` | `plan.md`, Mess-Protokolle, Style-Inventar. |
| `tools/` | Hilfsskripte (Screenshot-Diff, Asset-Extraktion). |

`reference/` ist die **einzige Wahrheit**. Jeder Wert im Nachbau muss aus dem Clone
(HTML, CSS, JS, Fonts) belegbar sein — oder aus einer Live-Messung der Originalseite.

---

## 3. Nicht verhandelbare Vorgaben

### 3.1 Typografie
- Dieselben Schriftfamilien wie im Original: **Inter** (Haupt), **Geist**, **Figtree**, **Poppins**.
  Keine anderen Fonts.
- Die Text-Skala des Originals wird als benannte Klassen in `global.css` gepflegt
  (`.t-display`, `.t-h1`, …) — pro Breakpoint ein Wert. Einzelwerte dürfen gerundet werden.
- Gewichte, `letter-spacing` und `line-height` aus dem Original übernehmen.

### 3.2 Farben
- Exakte Farbwerte aus dem Original (inkl. Alpha). Keine Annäherung, keine Palette-Vereinheitlichung.
- Gradients, `backdrop-filter`, `mix-blend-mode`, Overlays exakt übernehmen.

### 3.3 Layout & Abstände
- Abstände am Original orientieren, gerundet auf eine saubere Skala.
- Breakpoints (aus dem Clone verifiziert): **Desktop ≥ 1200px**, **Tablet 810–1199.98px**,
  **Phone ≤ 809.98px**. Diese drei Stufen gelten verbindlich.
- Container-Max-Widths aus dem Original übernehmen (Content 1000px, Full 1520px).

### 3.4 Rundungen, Rahmen, Schatten
- `border-radius`, `border` und `box-shadow` am Original orientieren (Rundung erlaubt).

### 3.5 Animationen & Interaktion
Alles so exakt wie möglich rekonstruieren:
- **Loading / Entry:** Initial-Fade, Stagger, Delay-Ketten beim ersten Paint.
- **Scroll:** Appear-/Reveal-Effekte, Parallax, Sticky-Verhalten, Scroll-Progress.
- **Hover / Focus / Active:** Farbwechsel, Scale, Translate, Cursor, Underline-Effekte.
- **Transitions:** Framer-Motion-Springs werden als passend gewählte `cubic-bezier()`
  abgebildet. Wirkung und Timing müssen stimmen, die Kurve muss nicht mathematisch
  identisch sein.
- Reduced-Motion-Verhalten des Originals übernehmen, falls vorhanden.
- Video-/Lottie-/Marquee-Elemente: gleiche Geschwindigkeit, Richtung, Loop, Autoplay-Flags.

### 3.6 Inhalte & Assets
- Alle Texte **wortwörtlich** aus dem Original. Keine Umformulierung, keine Korrektur von
  Tippfehlern, kein Lorem ipsum, keine Platzhalter.
- Alle Bilder, Videos, Icons, SVGs aus `reference/` übernehmen — in Originalauflösung und
  mit den originalen `srcset`/`sizes`-Varianten.
- Favicons, Apple-Touch-Icons, OG-/Twitter-Images 1:1.

### 3.7 Markup & Meta
- Semantische Struktur und Heading-Hierarchie wie im Original.
- `<title>`, `meta description`, OG-Tags, `lang`, Canonical 1:1 übernehmen.
- `alt`-Texte, `aria-*`-Attribute und Tab-Reihenfolge wie im Original.

---

## 4. Technik-Stack

**Vom Nutzer festgelegt:**
- **Astro** (v7) als Framework, statischer Build.
- **Tailwind CSS** (v4) über `@tailwindcss/vite`, Tokens in `@theme` in `src/styles/global.css`.
- Vanilla JS für Animationen (IntersectionObserver, Counter, Accordion) — keine Animations-Lib.
- Kein Framer-Runtime, kein Analytics/Tracking.
- Sauberer, lesbarer, komponentisierter Code.

**Bilder:** Der Clone enthält den Ordner `framerusercontent.com/` nicht; die Umgebung
hat keinen Netzzugriff auf diese Domain. Bilder werden vorerst per absoluter CDN-URL
eingebunden. Sobald die Dateien lokal vorliegen, werden sie nach `public/images/`
umgezogen und die URLs ersetzt.

---

## 5. Workflow (verbindlich)

1. Nutzer lädt den `wget`-Clone nach `reference/` hoch.
2. Claude analysiert den Clone **vollständig** (HTML-Struktur, CSS-Variablen, Fonts,
   Breakpoints, Animations-Parameter, Asset-Inventar).
3. Claude dokumentiert Struktur, Tokens und Animationen in **`docs/analyse.md`**.
4. Umsetzung Section für Section, Nutzer reviewt Zwischenstände.
5. Verifikation (siehe §6), dann Commit & Push.

---

## 6. Qualitätssicherung

- **Visueller Diff:** Playwright-Screenshots (Chromium ist vorinstalliert) von Original und
  Nachbau bei **1440 / 1024 / 390 px** Breite, Full-Page, danach Pixel-Diff.
  Zielwert: visuell stimmige Übereinstimmung, keine harte Pixelquote.
- Abweichungen werden in `docs/` protokolliert — **nicht stillschweigend akzeptiert**.
- Keine Fertigmeldung ohne durchgeführte Verifikation.

---

## 7. Verbote

- ❌ Keine Ersatz-Fonts außerhalb von Inter / Geist / Figtree / Poppins.
- ❌ Keine eigenen Design-Verbesserungen oder Umbauten.
- ❌ Keine erfundenen Inhalte, Bilder oder Sections.
- ❌ Keine Sections weglassen, weil sie aufwendig sind.
- ❌ Keine Änderungen in `reference/`.
- ❌ Kein Framer-Analytics/Tracking-Code im Nachbau.

---

## 8. Git

- Entwicklung und Push auf **`main`** (vom Nutzer ausdrücklich so vorgegeben).
- Aussagekräftige Commit-Messages, ein Commit pro abgeschlossenem Schritt.
- Kein Pull Request, außer der Nutzer fragt ausdrücklich danach.

---

## 9. Definition of Done

- [ ] Alle Sections der Homepage vorhanden und in korrekter Reihenfolge
- [ ] Typografie, Farben, Abstände, Rundungen stimmig zum Original
- [ ] Alle Animationen (Load, Scroll, Hover) rekonstruiert
- [ ] Responsive auf allen Original-Breakpoints identisch
- [ ] Bilder lokal unter `public/images/` (sobald verfügbar)
- [ ] Visueller Abgleich auf allen drei Viewports, Protokoll in `docs/`
- [ ] Meta-Tags, Favicons, `alt`-Texte übernommen
- [ ] Auf `main` gepusht

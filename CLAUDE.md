# CLAUDE.md — 1:1 Nachbau von https://rsacademy.ch

> Verbindliche Arbeitsanweisung für Claude Code in diesem Repository.
> Diese Datei hat Vorrang vor allgemeinen Konventionen. Bei Konflikt gilt: **Original schlägt Best Practice.**

---

## 1. Projektziel

Nachbau der **Homepage** von `https://rsacademy.ch` (Framer-Seite) als eigenständiges,
framework-freies Web-Projekt — **pixelgenau, 1:1**.

Das Ergebnis muss im Browser visuell und im Verhalten **ununterscheidbar** vom Original sein:
gleiche Fonts, Schriftgrößen, Zeilenhöhen, Laufweiten, Farben, Abstände, Rundungen, Schatten,
Breakpoints, Animationen, Hover-States, Scroll-Effekte und Ladeverhalten.

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
- **Exakt dieselben Schriftdateien** wie im Original (aus `reference/` übernehmen, self-hosted).
  Keine „ähnlichen" Fonts, kein Google-Fonts-Ersatz, kein System-Font-Fallback als Hauptschrift.
- `font-family`, `font-weight`, `font-style`, `font-size`, `line-height`, `letter-spacing`,
  `text-transform`, `font-feature-settings` werden **1:1 in px / exakten Werten** übernommen.
- Framer setzt Fonts häufig als Variable Fonts mit `font-variation-settings` — diese Werte
  ebenfalls übernehmen.
- Keine Umrechnung in `rem`, wenn das Original `px` nutzt. Keine „aufgeräumten" Werte
  (aus `17.6px` wird **nicht** `18px`).

### 3.2 Farben
- Exakte Farbwerte aus dem Original (inkl. Alpha). Keine Annäherung, keine Palette-Vereinheitlichung.
- Gradients, `backdrop-filter`, `mix-blend-mode`, Overlays exakt übernehmen.

### 3.3 Layout & Abstände
- Alle `margin`, `padding`, `gap`, `width`, `max-width`, `height`, `top/right/bottom/left`
  exakt in den Einheiten des Originals.
- Framer-Breakpoints unverändert übernehmen (aus dem Clone auslesen, typisch:
  Desktop ≥ 1200px, Tablet 810–1199px, Phone ≤ 809px — **verifizieren, nicht annehmen**).
- Container-Breiten, Content-Max-Widths und Section-Höhen exakt.

### 3.4 Rundungen, Rahmen, Schatten
- `border-radius` (inkl. asymmetrischer Werte) exakt.
- `border`, `outline`, `box-shadow` (alle Layer, inkl. Spread und Farbe) exakt.

### 3.5 Animationen & Interaktion
Alles so exakt wie möglich rekonstruieren:
- **Loading / Entry:** Initial-Fade, Stagger, Delay-Ketten beim ersten Paint.
- **Scroll:** Appear-/Reveal-Effekte, Parallax, Sticky-Verhalten, Scroll-Progress.
- **Hover / Focus / Active:** Farbwechsel, Scale, Translate, Cursor, Underline-Effekte.
- **Transitions:** `duration`, `delay`, `easing` **exakt**. Framer nutzt überwiegend
  Framer-Motion-Springs (`type: spring`, `stiffness`, `damping`, `mass`) — diese aus dem
  gebündelten JS auslesen und entweder als Spring nachrechnen oder als exakt gefittete
  `cubic-bezier()` abbilden. Faustregeln wie `ease-in-out 0.3s` sind **nicht** akzeptabel.
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

**Default (sofern in `docs/plan.md` nicht anders freigegeben):**
- Statisches **HTML + CSS + Vanilla JS**, kein Framework, kein Build-Step.
- Kein Tailwind, kein Bootstrap, keine UI-Library — sie erzwingen gerundete Skalenwerte
  und stehen der Pixelgenauigkeit im Weg.
- Fonts und alle Assets **self-hosted** unter `src/assets/`.
- Kein CDN-Request zur Laufzeit, keine Framer-Runtime, kein Framer-Tracking/Analytics.
- Optional erlaubt, wenn nachweislich nötig für Animationstreue: eine einzelne,
  gepinnte Animations-Lib (z. B. Motion One). Nur nach Freigabe in `plan.md`.

Der finale Stack wird in `docs/plan.md` vorgeschlagen und muss vom Nutzer **freigegeben** werden.

---

## 5. Workflow (verbindlich)

1. Nutzer lädt den `wget`-Clone nach `reference/` hoch.
2. Claude analysiert den Clone **vollständig** (HTML-Struktur, CSS-Variablen, Fonts,
   Breakpoints, Animations-Parameter, Asset-Inventar).
3. Claude schreibt **`docs/plan.md`** mit:
   - Section-für-Section-Aufbau der Homepage
   - Design-Token-Inventar (Farben, Fonts, Spacing, Radien, Shadows)
   - Animations-Inventar (Element → Trigger → Parameter)
   - Asset-Liste
   - Stack-Entscheidung + offene Fragen
   - Umsetzungsschritte in Reihenfolge
4. **Stopp. Warten auf Freigabe durch den Nutzer.** Vor Freigabe wird kein Code gebaut.
5. Nach Freigabe: Umsetzung in der in `plan.md` festgelegten Reihenfolge, mit Zwischenständen.
6. Verifikation (siehe §6), dann Commit & Push.

---

## 6. Qualitätssicherung

- **Visueller Diff:** Playwright-Screenshots (Chromium ist vorinstalliert) von Original und
  Nachbau bei **1440 / 1024 / 390 px** Breite, Full-Page, danach Pixel-Diff.
  Zielwert: **< 1 % abweichende Pixel** pro Viewport.
- **Computed-Style-Diff:** Für jedes relevante Element `getComputedStyle()` auf beiden Seiten
  auslesen und vergleichen (font, size, spacing, radius, color).
- Abweichungen werden in `docs/` protokolliert — **nicht stillschweigend akzeptiert**.
- Keine Fertigmeldung ohne durchgeführte Verifikation.

---

## 7. Verbote

- ❌ Keine Ersatz-Fonts, keine „ungefähr passenden" Werte, kein Aufrunden.
- ❌ Keine eigenen Design-Verbesserungen, Umbauten oder „Optimierungen".
- ❌ Keine erfundenen Inhalte, Bilder oder Sections.
- ❌ Keine Sections weglassen, weil sie aufwendig sind.
- ❌ Kein Tailwind / CSS-Framework mit fester Skala.
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
- [ ] Typografie, Farben, Abstände, Rundungen belegt identisch
- [ ] Alle Animationen (Load, Scroll, Hover) rekonstruiert
- [ ] Responsive auf allen Original-Breakpoints identisch
- [ ] Alle Assets self-hosted, keine externen Requests
- [ ] Screenshot-Diff < 1 % auf allen drei Viewports, Protokoll in `docs/`
- [ ] Meta-Tags, Favicons, `alt`-Texte übernommen
- [ ] Auf `main` gepusht

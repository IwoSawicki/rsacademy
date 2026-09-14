# rsacademy.ch — 1:1 Nachbau

Nachbau der Framer-Startseite `https://rsacademy.ch` als statisches Web-Projekt.
Verbindliche Vorgaben: siehe [`CLAUDE.md`](./CLAUDE.md).

## Ordnerstruktur

```
reference/   Original-Clone (wget) — read-only
src/         Nachbau
docs/        plan.md, Mess-Protokolle
tools/       Hilfsskripte (Screenshot-Diff etc.)
```

## Original spiegeln

Aus einem leeren Ordner heraus ausführen, das Ergebnis danach nach `reference/` legen.

```bash
wget \
  --recursive --level=5 \
  --page-requisites \
  --adjust-extension \
  --convert-links \
  --span-hosts \
  --domains=rsacademy.ch,www.rsacademy.ch,framerusercontent.com,app.framerstatic.com,framer.com,fonts.googleapis.com,fonts.gstatic.com \
  --no-parent \
  --execute robots=off \
  --restrict-file-names=windows \
  --timestamping \
  --wait=0.3 --random-wait \
  --tries=5 --timeout=30 \
  --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36" \
  --directory-prefix=rsacademy-clone \
  https://rsacademy.ch/
```

Zusätzlich manuell sichern (wget bekommt das nicht):

```bash
# gerendertes DOM nach JS-Ausführung
# (Browser: Rechtsklick -> Untersuchen -> <html> -> Copy -> Copy outerHTML)
```

Nützlich sind außerdem Full-Page-Screenshots bei 1440 / 1024 / 390 px Breite
als visuelle Referenz.

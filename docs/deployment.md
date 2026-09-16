# Deployment auf Dokploy

## Kurzfassung

| Einstellung | Wert |
|---|---|
| Application Type | **Dockerfile** (nicht Nixpacks) |
| Docker File Path | `Dockerfile` |
| Docker Context Path | `.` |
| **Container Port** | **`80`** |
| Branch | `main` |
| Environment (optional) | `SITE_URL=https://<deine-subdomain>` |

## Schritt für Schritt

1. **Create Application** → Provider **GitHub** → Repository `IwoSawicki/rsacademy`,
   Branch `main`.
2. Reiter **Build** → Build Type **Dockerfile**.
   - Docker File Path: `Dockerfile`
   - Docker Context Path: `.`
   - Docker Build Stage: leer lassen (das finale Stage `runtime` wird automatisch genommen)
3. Reiter **Environment** (optional, aber empfohlen für die Preview-Subdomain):
   ```
   SITE_URL=https://preview.rsacademy.ch
   ```
   Ohne diese Variable zeigen Canonical- und OG-Tags auf `https://rsacademy.ch`.
   Das ist für die Live-Domain richtig, für eine Preview-Subdomain aber irreführend.
4. Reiter **Domains** → **Add Domain**
   - Host: deine Subdomain
   - Path: `/`
   - **Container Port: `80`**
   - HTTPS aktivieren, Certificate Provider **Let's Encrypt**
5. **Deploy**.

Vorher im DNS einen A-Record der Subdomain auf die IP des Dokploy-Servers setzen,
sonst schlägt die Zertifikatsausstellung fehl.

## Warum Dockerfile und nicht Nixpacks

Astro baut hier **statisch** — das Ergebnis ist reines HTML/CSS/JS in `dist/`, es gibt
keinen Node-Server zur Laufzeit. Nixpacks erkennt Astro zwar, sucht danach aber ein
`npm start` und hat ohne Server nichts zu starten. Man müsste künstlich einen
Node-Webserver dazunehmen.

Das Dockerfile baut stattdessen in zwei Stufen: Node kompiliert, nginx liefert aus.
Das Ergebnis ist kleiner, startet schneller und die Caching-Regeln sind
im Repository nachvollziehbar (`nginx.conf`).

## Was das Image tut

- **Stage 1 (`node:22-alpine`)** — `npm ci`, dann `npm run build` → `dist/`
- **Stage 2 (`nginx:1.27-alpine`)** — `dist/` nach `/usr/share/nginx/html`, eigene `nginx.conf`
- Healthcheck auf `http://127.0.0.1/`, Port `80`

## Caching-Verhalten (`nginx.conf`)

| Pfad | Cache |
|---|---|
| `/_astro/*` (gehashte Build-Assets) | 1 Jahr |
| Bilder, Schriften | 30 Tage |
| HTML | `no-cache` — Deployments greifen sofort |

Die Cache-Regeln laufen bewusst über `expires` statt `add_header`: Ein `add_header`
in einem `location`-Block ersetzt in nginx die geerbten Header des `server`-Blocks,
die Security-Header wären damit in genau den Blöcken weg, in denen sie stehen sollten.

`listen [::]:80` fehlt bewusst — in Containern ohne IPv6 startet nginx damit nicht.

## Lokal gegenprüfen

```bash
docker build -t rsacademy .
docker run --rm -p 8080:80 rsacademy
# http://localhost:8080
```

## Bekannte Punkte vor dem Live-Gang

- **Bilder** sind Platzhalter aus `tools/placeholders.mjs` (`public/images/*.svg`).
  Echte Dateien dort ablegen und die Endungen in `src/data/site.ts` anpassen.
- **Zählerwerte** in `src/data/site.ts` (`numbers`) sind geschätzt.
- **Unterseiten** (`/kurse`, `/leistungen`, `/ueber-uns`, `/kontakt`, `/impressum`,
  `/datenschutz`) existieren noch nicht — alle Links darauf landen auf der 404-Seite.
- **Kontaktformular** hat noch keinen Endpunkt, der Submit tut nichts.
- Schriften kommen von Google Fonts. Für vollständige Unabhängigkeit müssten die
  woff2-Dateien nach `public/fonts/` und per `@font-face` eingebunden werden.

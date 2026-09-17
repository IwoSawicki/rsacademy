#!/usr/bin/env bash
# Lädt genau die Bilder der Startseite aus dem Framer-CDN nach public/images/
# und benennt sie so, wie src/data/site.ts sie erwartet.
#
#   bash tools/bilder-holen.sh
#
# Danach in src/data/site.ts die Endungen von .svg auf die echten umstellen
# (die Zuordnung steht unten in derselben Reihenfolge).

set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/images

CDN="https://framerusercontent.com/images"

# Zielname            Quelldatei
BILDER=(
  "hero-bg.jpeg                    sdKYdjisRcIYfDHKUA5tdXAaNUw.jpeg"
  "portrait.png                    l0sZ5WrF3MPGhtMEoZej8D9a0rI.png"
  "leistungen-bg.jpg               vrhxHFTuxnCduP4nljUulqZcuQ.jpg"
  "kontakt-bg.png                  Zke1zY1Red5PK8BQFj7u7XkI0Sc.png"
  "noise.png                       rR6HYXBrMmX4cRpXfXUOvpvpB0.png"
  "google-badge.png                ywIp8LD6nf5tjnjjfvwTJ5T9Rg.png"
  "google-mark.png                 vDdcKoFC0lRIa2ByWfOoAqbDU.png"
  "favicon.jpg                     kKbvV6aYbG10Z6eNPNacmsksJ1g.jpg"
  "kurs-absturzsicherheit.png      kUYQAlNgK1i0V1JYYmZX2EQ0Uk.png"
  "kurs-hab-international.png      Vx2FjUA47RtXguSrqVIHkirTMtg.png"
  "kurs-hallenkran.png             O3zpHDmbeoJAs7G2tfANfDkLqOE.png"
  "kurs-personaltraining.png       gPhkffUQKH5CPV3XNQlZaTvhA.png"
  "kurs-lasten-anschlagen.png      asNPSWBgjKwUJDG85R9FjLsmyBw.png"
  "kurs-baumaschinen.png           2Dtj6FfAdWLKNWOTw9qRh7JPE.png"
  "kurs-gabelstapler-grundkurs.png 1HrmRV3dY9V4EKk8Rz35w2BXs7U.png"
  "kurs-gabelstapler-refresh.png   uVJRxAVLLDvcOqft3JgfFSzeQ.png"
)

for eintrag in "${BILDER[@]}"; do
  read -r ziel quelle <<<"$eintrag"
  echo "→ $ziel"
  curl -fsSL "$CDN/$quelle" -o "public/images/$ziel"
done

echo
echo "Fertig. $(ls -1 public/images/*.png public/images/*.jpg public/images/*.jpeg 2>/dev/null | wc -l) Dateien in public/images/"
du -sh public/images

#!/usr/bin/env bash
# Lädt alle Bilder der Website aus dem Framer-CDN nach public/images/.
#
#   bash tools/bilder-holen.sh
#
# Die Liste ist aus reference/rsacademy.ch/*.html erzeugt — es sind genau die
# Dateien, die auf Start- und Unterseiten vorkommen. Der Ordner des
# Framer-Kontos enthält deutlich mehr, davon wird nichts gebraucht.
#
# Namen mit Seitenpräfix (kurse-01 usw.) sind noch nicht zugeordnet; sie
# bekommen ihren endgültigen Namen, sobald die jeweilige Seite gebaut wird.

set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/images

CDN="https://framerusercontent.com/images"

# Zielname                          Quelldatei
BILDER=(
  "favicon.jpg                        kKbvV6aYbG10Z6eNPNacmsksJ1g.jpg"
  "google-badge.png                   ywIp8LD6nf5tjnjjfvwTJ5T9Rg.png"
  "google-mark.png                    vDdcKoFC0lRIa2ByWfOoAqbDU.png"
  "hero-bg.jpeg                       sdKYdjisRcIYfDHKUA5tdXAaNUw.jpeg"
  "kontakt-bg.png                     Zke1zY1Red5PK8BQFj7u7XkI0Sc.png"
  "kurs-absturzsicherheit.png         kUYQAlNgK1i0V1JYYmZX2EQ0Uk.png"
  "kurs-baumaschinen.png              2Dtj6FfAdWLKNWOTw9qRh7JPE.png"
  "kurs-gabelstapler-grundkurs.png    1HrmRV3dY9V4EKk8Rz35w2BXs7U.png"
  "kurs-gabelstapler-refresh.png      uVJRxAVLLDvcOqft3JgfFSzeQ.png"
  "kurs-hab-international.png         Vx2FjUA47RtXguSrqVIHkirTMtg.png"
  "kurs-hallenkran.png                O3zpHDmbeoJAs7G2tfANfDkLqOE.png"
  "kurs-lasten-anschlagen.png         asNPSWBgjKwUJDG85R9FjLsmyBw.png"
  "kurs-personaltraining.png          gPhkffUQKH5CPV3XNQlZaTvhA.png"
  "kurse-01.png                       0z3o5DnGPKOe9fvJrSFHEnKSI0.png"
  "leistungen-01.jpg                  8o33bJPFca5yCcs4IH52yjhHY.jpg"
  "leistungen-02.jpeg                 SFTjPpOU44HvBbEioDsGRvJAs.jpeg"
  "leistungen-03.jpeg                 33jdBpEcnZxenNLXcnyRUML570.jpeg"
  "leistungen-04.jpeg                 tvdURs74tPb65RpT9KBNDviL0ak.jpeg"
  "leistungen-05.jpeg                 E8TuSn7laMnTEUFRuRiJooQ2AI.jpeg"
  "leistungen-bg.jpg                  vrhxHFTuxnCduP4nljUulqZcuQ.jpg"
  "noise.png                          rR6HYXBrMmX4cRpXfXUOvpvpB0.png"
  "portrait.png                       l0sZ5WrF3MPGhtMEoZej8D9a0rI.png"
  "ueber-uns-01.png                   kndJv6YOrPgu0Q9CpWV5kQ1XMo.png"
  "ueber-uns-02.png                   V72hyXOiHy6DWyY3I1Jq56FJr7M.png"
  "ueber-uns-03.png                   sHJZfRMCV0GFu6xxYO4g3t9u07Q.png"
  "ueber-uns-04.png                   MjyrcH5SzBqqngxTir6rj8Za9qA.png"
  "ueber-uns-05.png                   ogPmt6OiGTcI1vNiEUFLu5mwa4.png"
  "ueber-uns-06.png                   MC5e9edXu0qZiaYq7PTm0qRKqZU.png"
  "ueber-uns-07.png                   e2L5mItAl5y6UUtuXYphbVal8.png"
  "ueber-uns-08.png                   YmIvJHFkMSK0zhvGecRtGlkj8.png"
  "ueber-uns-09.png                   gnoBsdE6xOdBX0Hc45fPAIY6Uc.png"
  "ueber-uns-10.png                   bCZ5juUZSv6dzi8fPsOOYxih6g.png"
  "ueber-uns-11.png                   tgEn1C0sK7mnguC19pfRBVvpFJs.png"
  "ueber-uns-12.png                   WrZozxWsjNt6tzSeKIPhUPEu4U.png"
  "ueber-uns-13.png                   MVYpULrnxSBTUWVUrTgKeBPuAY.png"
  "ueber-uns-14.png                   aSTvyxODUL31JGIsn0JU6KyTwI.png"
)

for eintrag in "${BILDER[@]}"; do
  read -r ziel quelle <<<"$eintrag"
  printf '→ %s\n' "$ziel"
  curl -fsSL "$CDN/$quelle" -o "public/images/$ziel"
done

echo
echo "Fertig: $(ls -1 public/images | grep -v '\.svg$' | wc -l) Bilder in public/images"
du -sh public/images

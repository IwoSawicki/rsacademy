/**
 * Bildpfade.
 *
 * Aktuell stehen unter `public/images/` die Platzhalter aus
 * `tools/placeholders.mjs`. Für die echten Bilder:
 *
 *   bash tools/bilder-holen.sh
 *
 * Das Skript holt genau die 16 Dateien, die die Startseite braucht, und legt
 * sie unter diesen Namen ab. Danach hier die Endungen von `.svg` auf die
 * echten umstellen — die Zuordnung steht im Skript.
 */
const IMG = "/images";

export const contact = {
  phone: "+41 58 350 69 69",
  phoneLabel: "Tel. +41 58 350 69 69",
  phoneHref: "tel:+41583506969",
  mailInfo: "info@rsacademy.ch",
  mailKurs: "kurs@rsacademy.ch",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Kurse", href: "/kurse" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const legal = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export const reviews = [
  {
    name: "— Eno A.",
    text: "Der Unterricht ist strukturiert, verständlich und motivierend aufgebaut. Die Trainer nehmen sich Zeit, erklären alles sauber und gehen individuell auf einen ein.",
  },
  {
    name: "— linceiberico75",
    text: "Erstklassiges Personal, das in seinen jeweiligen Fachgebieten sehr kompetent ist! Ein rundum gelungener Tag – Wissen ist nie umsonst! Ich komme bald wieder, um weitere Kurse zu besuchen.",
  },
  {
    name: "— Emircan C.",
    text: "Sehr gut organisierter Hebebühnenkurs! Der Trainer war kompetent, praxisnah und hat alles verständlich erklärt.",
  },
];

export const kurse = [
  { title: "Absturzsicherheit PSAgA", image: `${IMG}/kurs-absturzsicherheit.svg` },
  {
    // Diese Karte trägt im Original je Breakpoint einen anderen Titel
    title: "HAB International 2 Kategorien, 3a & 3b",
    titlePhone: "Bauarbeiten-verordnung 2022",
    image: `${IMG}/kurs-hab-international.svg`,
  },
  { title: "Hallenkran Portalkran Kategorie C", image: `${IMG}/kurs-hallenkran.svg` },
  { title: "Personaltraining by Rescue & Safety Academy AG", image: `${IMG}/kurs-personaltraining.svg` },
  { title: "Bauarbeitenverordnung verstehen - Lasten richtig anschlagen", image: `${IMG}/kurs-lasten-anschlagen.svg` },
  { title: "Baumaschinen M1 Grundkurs", image: `${IMG}/kurs-baumaschinen.svg` },
  { title: "Gabelstapler Grundkurs 4 Tage", image: `${IMG}/kurs-gabelstapler-grundkurs.svg` },
  { title: "Gabelstapler Refresh", image: `${IMG}/kurs-gabelstapler-refresh.svg` },
];

/**
 * Zielwerte der Zähler.
 * Im Clone stehen nur die Startwerte ("0"); die Zielwerte liegen in den
 * nicht mitgelieferten Framer-Modulen. Bitte gegenprüfen und korrigieren.
 */
export const numbers = [
  { value: 500, suffix: "", label: "Kursteilnehmer monatlich" },
  { value: 38, suffix: "+", label: "Jahre Erfahrung" },
  { value: 98, suffix: "%", label: "Kundenzufriedenheit" },
  { value: 50, suffix: "k+", label: "Zertifizierte Kursteilnehmer" },
];

export const leistungen = [
  { no: "[01]", title: "Höhenarbeiten" },
  { no: "[02]", title: "Spezialisten für Hochregalreparaturen" },
  { no: "[03]", title: "Notfälle" },
  { no: "[04]", title: "Absturzsicherung" },
];

export const faq = [
  {
    q: "Was macht die RS Academy genau?",
    a: "Die RS Academy ist ein spezialisierter Anbieter für Aus- und Weiterbildungen im Bereich Arbeitssicherheit, Rettung und Gesundheitsschutz. Ziel ist es, Unternehmen und Mitarbeitende optimal auf anspruchsvolle und risikobehaftete Arbeitssituationen vorzubereiten.",
  },
  {
    q: "Für wen sind die Kurse geeignet?",
    a: "Die Schulungen richten sich insbesondere an:\n\n-Unternehmen im Bau- und Industriebereich\n-Fachkräfte mit erhöhtem -Sicherheitsrisiko\nVerantwortliche für Arbeitssicherheit\n- Einzelpersonen, die ihre Qualifikation erweitern möchten",
  },
  {
    q: "Wo finden die Kurse statt?",
    a: "Die Kurse werden an bestehenden Ausbildungsstandorten durchgeführt und kontinuierlich weiter ausgebaut. Zusätzlich sind – je nach Schulung – auch individuelle Lösungen direkt bei Unternehmen möglich.",
  },
  {
    q: "Benötige ich Vorkenntnisse?",
    a: "Das hängt vom jeweiligen Kurs ab. Es gibt sowohl Einsteiger- als auch Fortgeschrittenen-Schulungen. Die Anforderungen sind jeweils in der Kursbeschreibung aufgeführt.",
  },
  {
    q: "Wie kann ich einen Kurs buchen?",
    a: "Die Buchung erfolgt bequem online über das Buchungssystem. Dort können Sie verfügbare Termine einsehen und sich direkt anmelden.",
  },
];

export const images = {
  heroBg: `${IMG}/hero-bg.svg`,
  portrait: `${IMG}/portrait.svg`,
  leistungenBg: `${IMG}/leistungen-bg.svg`,
  kontaktBg: `${IMG}/kontakt-bg.svg`,
  noise: `${IMG}/noise.svg`,
  favicon: `${IMG}/favicon.svg`,
};

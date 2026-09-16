/**
 * Bildpfade. Aktuell Platzhalter aus `tools/placeholders.mjs`.
 * Sobald die Originalbilder vorliegen: Dateien nach `public/images/`
 * legen und hier die Endung auf die echte (.png/.jpg) ändern.
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
    text: "Der Unterricht ist strukturiert, verständlich und motivierend aufgebaut. Die Trainer nehmen sich Zeit, erklären alles sauber und gehen individuell auf Fragen ein.",
    image: `${IMG}/avatar.svg`,
  },
  {
    name: "— Reynolds., Happy Client",
    text: "“We’ve partnered with Climafix for over one years to maintain the Air Quality Solutions in our commercial.”",
    image: `${IMG}/avatar.svg`,
  },
  {
    name: "— Thornton., Happy Client",
    text: "“We’ve partnered with Climafix for over two years to maintain the HVAC systems in our commercial.”",
    image: `${IMG}/avatar.svg`,
  },
];

export const kurse = [
  { title: "Absturzsicherheit PSAgA", image: `${IMG}/kurs-absturzsicherheit.svg` },
  { title: "HAB International 2 Kategorien, 3a & 3b", image: `${IMG}/kurs-hab-international.svg` },
  { title: "Bauarbeiten-verordnung 2022", image: `${IMG}/kurs-bauarbeitenverordnung.svg` },
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
    a: "Die RS Academy ist ein spezialisierter Anbieter für Aus- und Weiterbildungen im Bereich Arbeitssicherheit, Rettung und Gesundheitsschutz. Ziel ist es, Menschen praxisnah und verständlich auf reale Situationen vorzubereiten.",
  },
  {
    q: "Für wen sind die Kurse geeignet?",
    a: "Die Schulungen richten sich insbesondere an: -Unternehmen im Bau- und Industriebereich -Fachkräfte mit erhöhtem -Sicherheitsrisiko Verantwortliche für Arbeitssicherheit",
  },
  {
    q: "Wo finden die Kurse statt?",
    a: "Die Kurse werden an bestehenden Ausbildungsstandorten durchgeführt und kontinuierlich weiter ausgebaut. Zusätzlich sind – je nach Schulung – auch individuelle Durchführungen vor Ort möglich.",
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
  faqSide: `${IMG}/faq.svg`,
  favicon: `${IMG}/favicon.svg`,
};

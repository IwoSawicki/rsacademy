/** Die Domain, unter der die Seite am Ende produktiv läuft. */
export const PRODUCTION_HOST = "rsacademy.ch";

/**
 * Läuft dieser Build unter der Live-Domain?
 * Alles andere (Preview-Subdomains, lokale Builds) wird auf `noindex`
 * gesetzt, damit die Preview der echten Domain nicht in den Suchergebnissen
 * Konkurrenz macht.
 */
export function isProduction(site: URL | undefined): boolean {
  return site?.hostname === PRODUCTION_HOST;
}

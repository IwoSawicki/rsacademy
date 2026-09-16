/**
 * Menü im Header.
 *
 * Original: Der Header hat `overflow: hidden` und wächst beim Öffnen von
 * `padding: 19px 36px` auf `19px 36px 36px`; der Menüblock sitzt geschlossen
 * bei `top:-750px` und fährt herunter. Die Punkte blenden dabei gestaffelt ein.
 */
const STAGGER = 70;
const TRAVEL = 90;

export function initMenu() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const toggle = document.getElementById("menu-toggle");
  const shell = document.querySelector<HTMLElement>("[data-menu-shell]");
  const body = document.querySelector<HTMLElement>("[data-menu-body]");
  const items = document.querySelectorAll<HTMLElement>("[data-menu-item]");
  const top = document.querySelector<HTMLElement>("[data-burger-top]");
  const bottom = document.querySelector<HTMLElement>("[data-burger-bottom]");
  if (!header || !toggle || !shell || !body) return;

  let open = false;

  // Ausgangszustand der Punkte setzen, damit sie gestaffelt hereinkommen
  items.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = `translateY(${TRAVEL}px)`;
    item.style.transition =
      "opacity 700ms var(--ease-framer), transform 700ms var(--ease-framer)";
  });

  const setOpen = (next: boolean) => {
    open = next;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");

    shell.style.gridTemplateRows = open ? "1fr" : "0fr";
    body.style.transform = open ? "translateY(0)" : `translateY(-750px)`;
    header.style.paddingBottom = open ? "36px" : "0px";
    document.body.style.overflow = open ? "hidden" : "";

    items.forEach((item, i) => {
      // Beim Schließen laufen die Punkte in umgekehrter Reihenfolge zurück
      const order = open ? i : items.length - 1 - i;
      item.style.transitionDelay = `${order * STAGGER}ms`;
      item.style.opacity = open ? "1" : "0";
      item.style.transform = open ? "translateY(0)" : `translateY(${TRAVEL}px)`;
    });

    if (top) top.style.transform = open ? "translateY(5px) rotate(20deg)" : "";
    if (bottom)
      bottom.style.transform = open ? "translateY(-5px) rotate(-20deg)" : "";
  };

  toggle.addEventListener("click", () => setOpen(!open));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) setOpen(false);
  });
}

/**
 * Menü-Overlay. Im Original fährt der Block von `top:-750px` herunter,
 * die Navigationspunkte blenden dabei gestaffelt ein.
 */
export function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("menu-overlay");
  const body = overlay?.querySelector<HTMLElement>("[data-menu-body]");
  const items = overlay?.querySelectorAll<HTMLElement>("[data-menu-item]");
  const top = document.querySelector<HTMLElement>("[data-burger-top]");
  const bottom = document.querySelector<HTMLElement>("[data-burger-bottom]");
  if (!toggle || !overlay || !body) return;

  let open = false;

  const setOpen = (next: boolean) => {
    open = next;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");

    overlay.classList.toggle("invisible", !open);
    overlay.classList.toggle("opacity-0", !open);
    body.style.transform = open ? "translateY(0)" : "translateY(-750px)";
    document.body.style.overflow = open ? "hidden" : "";

    items?.forEach((item, i) => {
      // Beim Schließen rückwärts staffeln, damit es nicht nachzieht
      item.style.transitionDelay = open ? `${i * 60}ms` : "0ms";
      item.classList.toggle("opacity-0", !open);
      item.classList.toggle("translate-y-[90px]", !open);
    });

    // Burger wird zum Kreuz
    if (top) top.style.transform = open ? "translateY(5px) rotate(20deg)" : "";
    if (bottom)
      bottom.style.transform = open ? "translateY(-5px) rotate(-20deg)" : "";
  };

  body.style.transition = "transform 700ms var(--ease-framer)";
  body.style.transform = "translateY(-750px)";

  toggle.addEventListener("click", () => setOpen(!open));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) setOpen(false);
  });
}

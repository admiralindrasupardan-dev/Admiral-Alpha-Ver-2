/**
 * ALPHA by Admiral — Codex Gateway
 * -------------------------------------------------------------
 * The Codex starts closed. On click, its two panels swing open
 * (3D rotateY) and a glow resolves behind them — then, once that
 * motion has actually happened (not before), the page scrolls
 * smoothly into the Courses section. Clicking again after it's
 * already open just re-triggers the scroll.
 */

document.addEventListener("DOMContentLoaded", () => {
  const codex = document.getElementById("codexTrigger");
  if (!codex) return;

  const target = document.getElementById("courses");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  codex.addEventListener("click", () => {
    const alreadyOpen = codex.classList.contains("is-open");
    codex.classList.add("is-open");

    const scrollDelay = alreadyOpen ? 0 : prefersReducedMotion ? 0 : 950;

    window.setTimeout(() => {
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    }, scrollDelay);
  });
});

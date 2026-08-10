/**
 * ALPHA by Admiral — Preloader
 * -------------------------------------------------------------
 * Counts from 0 to 100, then waits for the visitor to click before
 * revealing the page. On dismiss, adds `.app-ready` to <body>, which
 * unpauses the hero's construction sequence (see experience.css) so
 * it plays once, in full, as the payoff for entering.
 */

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const countEl = document.getElementById("preloaderCount");
  const barEl = document.getElementById("preloaderBarFill");
  const statusEl = document.getElementById("preloaderStatus");
  const enterEl = document.getElementById("preloaderEnter");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.body.style.overflow = "hidden";

  function reveal() {
    document.body.style.overflow = "";
    preloader.classList.add("is-hidden");
    document.body.classList.add("app-ready");
    window.setTimeout(() => {
      preloader.remove();
    }, 800);
  }

  function complete() {
    if (statusEl) statusEl.textContent = "Initialization Complete";
    if (enterEl) {
      enterEl.style.display = "inline-flex";
      requestAnimationFrame(() => enterEl.classList.add("is-visible"));
    }
    preloader.style.cursor = "pointer";
    preloader.addEventListener("click", reveal, { once: true });
  }

  if (prefersReducedMotion) {
    if (countEl) countEl.textContent = "100";
    if (barEl) barEl.style.width = "100%";
    complete();
    return;
  }

  const duration = 2600;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out-ish curve: fast start, settles at the end — mechanical,
    // not linear-robotic, not bouncy.
    const eased = 1 - Math.pow(1 - progress, 2);
    const value = Math.round(eased * 100);

    if (countEl) countEl.textContent = String(value);
    if (barEl) barEl.style.width = `${value}%`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      complete();
    }
  }

  requestAnimationFrame(tick);
});

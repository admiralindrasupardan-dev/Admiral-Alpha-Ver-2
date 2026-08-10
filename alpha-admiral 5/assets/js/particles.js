/**
 * ALPHA by Admiral — Ambient Particles
 * -------------------------------------------------------------
 * Populates .hero__particles with a handful of small gold motes that
 * drift upward, like dust catching light in an archive. Each particle
 * is pure CSS animation (see experience.css); this module only
 * randomizes size/position/timing once on load.
 */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".hero__particles");
  if (!container) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  const COUNT = 30;

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement("span");
    el.className = "hero__particle";

    const size = 2.5 + Math.random() * 3.5;
    const left = Math.random() * 100;
    const duration = 7 + Math.random() * 6;
    const delay = Math.random() * -14;
    const drift = Math.round((Math.random() - 0.5) * 60);

    el.style.setProperty("--p-size", `${size}px`);
    el.style.setProperty("--p-duration", `${duration}s`);
    el.style.setProperty("--p-delay", `${delay}s`);
    el.style.setProperty("--p-drift", `${drift}px`);
    el.style.left = `${left}%`;

    container.appendChild(el);
  }
});

/**
 * ALPHA by Admiral — Scroll Reveal
 * -------------------------------------------------------------
 * Adds .is-visible to any element with .reveal or .reveal-stagger
 * once it enters the viewport. See animations.css for the actual
 * transition definitions.
 */

document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
});

/**
 * ALPHA by Admiral — Compass Interaction
 * -------------------------------------------------------------
 * Gives the hero compass a subtle 3D tilt that follows the cursor,
 * on top of its CSS-driven idle float and slow bezel rotation.
 * Self-contained: safe to remove this file and its <script> tag
 * without affecting any other part of the page.
 */

document.addEventListener("DOMContentLoaded", () => {
  const visual = document.querySelector(".hero__visual");
  const tiltLayer = document.querySelector(".hero__compass-tilt");

  if (!visual || !tiltLayer) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  const maxTilt = 6;

  visual.addEventListener("mousemove", (event) => {
    const rect = visual.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    targetX = py * -maxTilt;
    targetY = px * maxTilt;
  });

  visual.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  function tick() {
    currentX += (targetX - currentX) * 0.07;
    currentY += (targetY - currentY) * 0.07;
    tiltLayer.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(
      2
    )}deg) rotateY(${currentY.toFixed(2)}deg)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
});

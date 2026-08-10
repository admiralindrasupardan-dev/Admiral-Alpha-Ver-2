/**
 * ALPHA by Admiral — Cursor Glow
 * -------------------------------------------------------------
 * A soft light that trails the cursor, like a reading lamp moving
 * over the archive. Intensifies slightly over interactive elements.
 * Desktop/fine-pointer only — never initialized on touch devices.
 */

document.addEventListener("DOMContentLoaded", () => {
  const isFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;
  if (!isFinePointer) return;

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  glow.setAttribute("aria-hidden", "true");
  document.body.appendChild(glow);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let active = false;

  const interactiveSelector = "a, button, .course-card, .index-row, input, textarea";

  window.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!active) {
      active = true;
      glow.classList.add("is-active");
    }
    const hovered = event.target.closest(interactiveSelector);
    glow.classList.toggle("is-hovering", Boolean(hovered));
  });

  document.addEventListener("mouseleave", () => {
    active = false;
    glow.classList.remove("is-active");
  });

  function tick() {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
});

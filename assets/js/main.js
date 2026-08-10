/**
 * ALPHA by Admiral — Shared Site Behaviour
 * -------------------------------------------------------------
 * Small, framework-free interactions shared by every page:
 * header blur-on-scroll, mobile navigation toggle, and the
 * footer's auto-updating year.
 */

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav__toggle");

  // Header gains a blurred background once the page has scrolled.
  if (nav) {
    const setScrollState = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    setScrollState();
    window.addEventListener("scroll", setScrollState, { passive: true });
  }

  // Mobile menu open/close.
  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const willOpen = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", willOpen);
      navToggle.setAttribute("aria-expanded", String(willOpen));
    });

    nav.querySelectorAll(".nav__links a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Footer year.
  const yearEl = document.getElementById("footerYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

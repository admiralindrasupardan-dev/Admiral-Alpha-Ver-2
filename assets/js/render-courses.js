/**
 * ALPHA by Admiral — Course Card Rendering
 * -------------------------------------------------------------
 * Renders ALPHA_COURSES (see courses-data.js) into any container.
 * Kept deliberately framework-free and small: this is the one
 * function future pages/components should reuse rather than
 * re-implementing card markup elsewhere.
 */

function renderCourseCard(course) {
  const isLive = Boolean(course.href);
  const statusLabel = isLive ? "Open" : "Cataloguing";

  const cornerIcon = `
    <svg class="course-card__corner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 16V4H16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  const emptyNote = !isLive
    ? `
    <div class="course-card__empty">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.4"/>
        <path d="M12 8v4l2.5 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
      <span>This entry is still being catalogued.</span>
    </div>`
    : "";

  return `
    <article class="course-card">
      ${cornerIcon}
      <span class="course-card__code">${course.code}</span>
      <h3 class="course-card__title">${course.title}</h3>
      <div class="course-card__meta">
        <span class="chip">${course.context}</span>
        <span class="chip">${course.level}</span>
        <span class="chip">${course.format}</span>
      </div>
      <p class="course-card__blurb">${course.blurb}</p>
      ${emptyNote}
      <div class="course-card__footer">
        <span class="course-card__status">${statusLabel}</span>
        ${
          isLive
            ? `<a class="btn btn--ghost btn--sm" href="${course.href}">View course</a>`
            : `<span class="course-card__status-label">[ Not yet open ]</span>`
        }
      </div>
    </article>`;
}

function renderCourseGrid(containerId, courses) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = courses.map(renderCourseCard).join("");
}

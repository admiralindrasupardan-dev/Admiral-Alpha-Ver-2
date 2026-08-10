# ALPHA by Admiral

**Learn Without Limits.**

A scalable interactive learning platform built for one lecturer teaching
multiple subjects. Version 0.1 is the foundation only — navigation, landing
page, and course dashboard with empty course placeholders. No lesson content,
quizzes, or course materials yet.

---

## Current courses (placeholders)

| Code     | Course                    | Context         |
|----------|---------------------------|------------------|
| EN-BNK   | English for Banking       | University       |
| EN-MGT   | English for Management    | University       |
| EN-PVT   | English Course            | Private lessons  |

---

## Project structure

```
/
├── index.html              Landing page (marketing entry point)
├── dashboard.html          Course Dashboard (all courses, one view)
├── assets/
│   ├── css/
│   │   ├── base.css        Design tokens, reset, typography — edit palette/type here
│   │   ├── components.css  Nav, buttons, chips, course cards, module cards, footer
│   │   ├── animations.css  Keyframes + scroll-reveal utility classes
│   │   ├── landing.css     Landing-page-only layout (hero, module grid, CTA band)
│   │   └── dashboard.css   Dashboard-only layout (page header, stats, card grid)
│   └── js/
│       ├── courses-data.js   ⭐ Single source of truth for every course
│       ├── render-courses.js Shared function that turns course data into cards
│       ├── main.js           Nav scroll state, mobile menu, footer year
│       └── animations.js     Scroll-reveal IntersectionObserver
└── README.md
```

No build step, no framework, no dependencies beyond three Google Fonts.
Every file can be opened directly or served as a static site — ready for
GitHub Pages as-is.

---

## How to extend

### Add a new course
Open `assets/js/courses-data.js` and add one object to the `ALPHA_COURSES`
array:

```js
{
  code: "EN-XYZ",
  title: "Your New Course",
  context: "University",
  level: "Undergraduate",
  format: "Semester Course",
  blurb: "One or two sentences describing the course.",
  href: null, // set to "course-en-xyz.html" once that page exists
}
```

It will automatically appear on the landing page preview and the full
Course Dashboard — no other file needs to change.

### Add a new page (e.g. a course homepage, Teacher Toolkit, Resources)
1. Copy the `<header class="nav">` and `<footer class="footer">` blocks from
   `dashboard.html` so navigation stays consistent.
2. Link the three shared stylesheets (`base.css`, `components.css`,
   `animations.css`) plus a new page-specific stylesheet if the page needs
   its own layout rules.
3. Reuse existing classes (`.course-card`, `.module`, `.btn`, `.chip`)
   before inventing new ones.

### Design tokens
All colors, type, spacing, radius, and shadow values live in
`assets/css/base.css` as CSS custom properties. Changing a token there
updates it everywhere.

---

## Design direction

The visual identity draws on navigation and charting — fitting for
"Admiral" and "ALPHA" (a first bearing, a starting point). A minimal
compass motif appears in the hero and as a small corner mark on cards.
Palette is a cool paper white and deep ink, with a single restrained
brass accent reserved for emphasis. Display type is an italic serif
(Newsreader) paired with Inter for body text and IBM Plex Mono for
course codes and labels — kept deliberately quiet so future course
content stays the visual focus.

---

## Nav Fix + Particle/Type Boost + The Codex Gateway

- **Fixed:** the scrolled-nav background was still hardcoded to the old
  light theme's paper color (`rgba(246,245,241,...)`), missed during
  the dark-theme conversion — this made nav text unreadable on scroll.
  It's the one spot in the whole codebase that used a literal color
  instead of a token, which is exactly why it got missed; now fixed in
  `components.css`.
- **Particles are brighter and more numerous** (18→30, stronger glow,
  higher peak opacity) — `experience.css` / `particles.js`.
- **Headings are bolder** — added Newsreader 600/700 weights and bumped
  h1/h2 to 700, h3 to 600, for a firmer, more assertive presence.
- **The Codex** (`.codex` in `experience.css`, `codex.js`) — a new
  gateway section between the hero and Courses. A closed box with two
  hinged panels; clicking it swings both open via 3D `rotateY`,
  reveals a glow, and — only once that motion has actually played,
  not before — smoothly scrolls into the Courses section. This is a
  literal "closed until opened" object, distinct from the compass
  (which is always visible/assembling) and the preloader (which gates
  the whole page) — three different uses of the same "reveal" idea at
  three different scales.

## Dark Theme

The palette was inverted to a dark "archive" theme, referencing the
mood of dark HUD/menu interfaces (deep surface, warm off-white text,
brass accent as the one warm note) — without copying any specific
product's assets or artwork. This was done almost entirely at the
token level in `base.css`:

- `--color-paper` / `--color-paper-alt`: now near-black graphite
  instead of off-white — token **names** describe role (page
  background), not a literal light/dark value, which is what let most
  components adapt automatically without individual edits.
- `--color-ink` / `--color-ink-soft`: now light off-white/grey instead
  of dark graphite — this is the primary/secondary **text** token.
- `--color-white`: repointed to a dark card-surface tone (`#1b1e25`).
  The name is now a misnomer (kept to avoid touching every usage site)
  — it means "neutral card/panel surface," not literally white.
- `--color-line`, the body grid texture, and a couple of hardcoded
  hover-tint rgba values were flipped from dark-on-light to
  light-on-dark.
- Shadows were rebuilt against near-black at higher opacity — a dark
  shadow at light-theme opacity is invisible on a dark surface.
- The CTA band's text rules needed manual fixes (`landing.css`): they
  referenced `--color-paper`/`--color-white` specifically *because*
  those were the light tokens in the old theme — now that those tokens
  are dark, that particular usage had to be repointed to `--color-ink`.
  This was the one spot where the token architecture's dual-role reuse
  (same token, different structural roles) needed a manual fix rather
  than adapting automatically.
- The compass instrument itself needed **no color changes** — its
  parchment-toned dial face and gold ring already read as a lit object
  sitting on a dark surface, which is the effect wanted.
- The floating preview cards switched from light glass to dark glass
  (translucent dark surface, light border) to match.
- **Preloader now shows the actual brand mark** (the compass/tick icon
  from the nav) above the wordmark, not just text — shown prominently
  at load, the way a product's logo mark typically anchors a loading
  screen.

## Experience Layer — Preloader, Particles, Cursor Glow, Sound

Added on top of the Archive direction, in a new `assets/css/experience.css`
plus four new JS modules, kept separate from core components so they can
be removed independently if needed:

- **Preloader** (`preloader.js`) — counts 0→100 on load, then waits for a
  click before revealing the page. Dismissing it adds `.app-ready` to
  `<body>`, which is what actually starts the hero's construction
  sequence and particles — they stay paused underneath the loader via
  `animation-play-state`, so the sequence plays once, in full, as the
  payoff for entering, regardless of how long the visitor takes on the
  loading screen.
- **Floating preview cards restored** (`.hero-card` in `experience.css`)
  — the "Continue Learning / Weekly Goal / Vocabulary" cards from the
  original hero are back, per direct request. These are intentionally
  kept as a scoped exception: the rest of the site's cards were
  rebuilt earlier to remove glass surfaces on purpose, but this one
  component is a deliberate, requested exception rather than a reversal
  of that decision. Their reveal is also gated on `.app-ready`, not on
  page-load timing, so they always appear in sync with the compass.
- **Ambient particles** (`particles.js`) — 18 small gold motes drifting
  upward through the hero, pure CSS keyframe animation; the JS only
  randomizes size/position/timing once, no per-frame cost.
- **Cursor glow** (`cursor-glow.js`) — a soft light that follows the
  cursor and intensifies over interactive elements. Desktop/fine-pointer
  only; never initialized on touch devices.
- **Click sound** (`sound.js`) — a short mechanical tick synthesized via
  the Web Audio API on every click, site-wide. No audio file shipped;
  the tone is generated on the fly, and the `AudioContext` is created
  lazily on first use to respect browser autoplay policies.

## The Archive — Final Direction

The hero's construction sequence and two component redesigns below
represent a final creative decision, not an additive skin. Two
components were identified as generic-card patterns and replaced
entirely rather than restyled:

- **The compass now assembles itself on load**, in a fixed sequence:
  corner registration marks → coordinate ticks → rings draw themselves
  in → dial face resolves → needle settles. One continuous event
  (~3s), never repeats. The bezel's slow rotation is the only ongoing
  loop, because a compass bezel should move. New utility classes for
  this in `animations.css`: `.bp-draw-fast`, `.bp-draw-slow`, `.bp-fade`.
- **`.hero__blueprint-frame`** — a stretched, non-scaling-stroke SVG of
  corner brackets and coordinate ticks framing the visual column,
  drawn in as part of the same sequence.
- **Course cards became numbered archive plates.** Removed: the
  shadow-lift hover, the pill-shaped "Coming soon" button. Added: a
  large faint Roman numeral watermark (CSS `counter()`, no JS), sharp
  3px corners instead of rounded-lg, a plain bracketed status label.
- **The module grid was deleted, not restyled**, and replaced with
  `.index-list` / `.index-row` — a ledger of rows (code, title,
  description, status) with hairline dividers and a left accent bar on
  hover, the way a museum catalogue or architectural schedule actually
  presents a list, rather than a grid of icon-title-description cards.
- **`.chip` lost its pill shape and fill** — now a plain outlined
  rectangular label, print-catalogue style rather than SaaS-tag style.

## Hero Redesign — The Navigator, in a Codex Atmosphere

The hero was redesigned around a single, final creative decision (not
a blend of unrelated concepts): the compass instrument itself stays as
**The Navigator** — brass ring, engraved bezel, diamond needle — the
only geometry legible at every scale from favicon to hero. What changed
is the *atmosphere it sits in*, staged as a page from a living codex
rather than a SaaS product tour.

- **Removed:** the floating glassmorphism "dashboard preview" cards.
  Glassmorphism is explicitly outside ALPHA's material language
  (graphite, parchment, brass — nothing translucent-plastic), and the
  cards made the hero read as an app demo rather than an entry point.
  The `.glass-card` component and its tokens were removed from
  `components.css`/`base.css` entirely rather than left unused.
- **Added:** `.hero__atmosphere` — a single static, aria-hidden SVG
  layer combining faint paper-map contour lines and celestial geometry
  (a star field, constellation lines, an oversized coordinate ring).
  Zero JavaScript cost; it's just quiet background geometry.
- **Compass ring is now subtly faceted** — a 12-sided path with rounded
  joins instead of a perfect circle, reading as circular from a normal
  distance but structurally angular up close.
- **Needle motion follows a strict rule:** it settles once on load with
  a critically-damped ease (no bounce, no overshoot — `needleSettle` in
  `animations.css`), then stays fixed while the bezel keeps rotating
  slowly around it. Mouse-tilt was also reduced (9° → 6°) for a calmer,
  more confident feel rather than a playful one.
- **Manuscript captions replace tech captions** — "Alpha — Plate I" and
  "Direction, not destination" instead of version/hosting labels,
  matching the codex framing.

## Version 0.2 — Design Elevation

v0.2 does not change the architecture from v0.1. It refines the same
foundation: same files, same folder structure, same course-data-driven
rendering. What changed:

- **Compass rebuilt as a real instrument** — layered SVG (satin metal
  ring, dial face, engraved bezel ticks, diamond needle in split
  gold/graphite gradients, ambient drop shadow, glass reflection arc).
  The bezel rotates slowly and independently of the needle, which stays
  fixed — like a real compass settling on a bearing.
- **New file: `assets/js/compass.js`** — an isolated module that adds a
  subtle 3D mouse-tilt to the compass. It touches nothing else; remove
  the file and its `<script>` tag and the rest of the page is unaffected.
- **Hero restructured to a 40/60 grid** — text column unchanged in
  spirit, paired with a new visual column containing the compass and
  three floating "glass" preview cards (Continue Learning, Weekly Goal,
  Vocabulary) that preview what the dashboard will eventually show.
- **Sitewide background depth** — a hairline editorial grid, a whisper
  of film grain, and a soft radial glow were added via `body::before`/
  `::after` in `base.css`. No page's HTML had to change for this.
- **New tokens, not new hues** — `--metal-highlight`, `--metal-mid`,
  `--metal-shadow`, and glass-surface variables were added to `base.css`
  alongside the existing palette, used by the compass and preview cards.
- **New shared components** — `.divider` (a quiet instrument-style rule
  used for rhythm between sections) and `.glass-card` (the frosted
  preview card style), both added to `components.css` for reuse in
  future pages.
- **Copy pass** — hero eyebrow, headline, and CTA wording moved from
  generic startup phrasing to something more editorial and specific to
  ALPHA's "direction" metaphor. `Learn Without Limits` is kept as the
  footer/brand tagline for continuity.
- **Version references bumped** 0.1 → 0.2 across the nav, dashboard
  stats, and the Platform module legend.

## Roadmap (not built yet)

Weekly Lessons · Interactive Reading · Vocabulary · Quizzes · Activities ·
Teacher Toolkit · Resources — each previewed on the landing page's
Platform section and intended to arrive as its own release without
requiring changes to this foundation.

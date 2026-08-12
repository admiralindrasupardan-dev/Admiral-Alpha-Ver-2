/**
 * ALPHA by Admiral — Course Data
 * -------------------------------------------------------------
 * This is the ONLY place course information lives for Version 0.1.
 *
 * To add a future course, add a new object to this array.
 * The landing page and Course Dashboard both render from
 * this file automatically.
 */

const ALPHA_COURSES = [
  {
    code: "EN-BNK",
    title: "English for Banking",
    context: "University",
    level: "Undergraduate",
    format: "Semester Course",
    blurb:
      "Financial vocabulary, case studies, and professional communication built for banking and finance students.",
    href: "week-1.html",
  },

  {
    code: "EN-MGT",
    title: "English for Management",
    context: "University",
    level: "Undergraduate",
    format: "Semester Course",
    blurb:
      "Leadership language, negotiation, and workplace communication for future managers.",
    href: null,
  },

  {
    code: "EN-PVT",
    title: "English Course",
    context: "Private Lessons",
    level: "All Levels",
    format: "1-on-1 / Small Group",
    blurb:
      "Personalized lessons shaped around individual goals, pace, and interests.",
    href: null,
  },
];

// Anchor ids for every section of the home page (used by the nav and links).
export const SectionsIds = {
  Home: "home-section",
  About: "about-section",
  Stats: "stats-section",
  Skills: "skills-section",
  Experience: "experience-section",
  Projects: "projects-section",
  Contact: "contact-section",
};

export const navSections = [
  { name: "About", id: SectionsIds.About },
  { name: "Skills", id: SectionsIds.Skills },
  { name: "Experience", id: SectionsIds.Experience },
  { name: "Projects", id: SectionsIds.Projects },
  { name: "Contact", id: SectionsIds.Contact },
];

// Flat accent fills, cycled across cards. Full class names so Tailwind keeps them.
export const accentFills = ["bg-sun", "bg-bubblegum", "bg-mint", "bg-lilac"];

export const accentFor = (index: number) =>
  accentFills[index % accentFills.length];

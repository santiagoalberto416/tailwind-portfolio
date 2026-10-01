import {
  faBriefcase,
  faEnvelope,
  faHouse,
  faLayerGroup,
  faUser,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Anchor ids for every section of the home page.
export const SectionsIds = {
  Home: "home-section",
  About: "about-section",
  Stats: "stats-section",
  Skills: "skills-section",
  Experience: "experience-section",
  Projects: "projects-section",
  Contact: "contact-section",
};

export type NavItem = {
  id: string;
  label: string;
  // Used by the compact mobile tab bar
  shortLabel: string;
  icon: IconDefinition;
};

export const navItems: NavItem[] = [
  { id: SectionsIds.Home, label: "Home", shortLabel: "Home", icon: faHouse },
  { id: SectionsIds.About, label: "About", shortLabel: "About", icon: faUser },
  { id: SectionsIds.Skills, label: "Skills", shortLabel: "Skills", icon: faCode },
  {
    id: SectionsIds.Experience,
    label: "Experience",
    shortLabel: "Career",
    icon: faBriefcase,
  },
  {
    id: SectionsIds.Projects,
    label: "Projects",
    shortLabel: "Projects",
    icon: faLayerGroup,
  },
  {
    id: SectionsIds.Contact,
    label: "Contact",
    shortLabel: "Contact",
    icon: faEnvelope,
  },
];

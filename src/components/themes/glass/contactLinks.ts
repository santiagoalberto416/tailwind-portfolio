import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { profile } from "@/data/profile";

export type ContactLink = {
  key: "email" | "linkedin" | "github" | "instagram";
  label: string;
  // Human readable value shown next to the label
  display: string;
  href: string;
  icon: IconDefinition;
  external: boolean;
};

export const contactLinks: ContactLink[] = [
  {
    key: "email",
    label: "Email",
    display: profile.email,
    href: `mailto:${profile.email}`,
    icon: faEnvelope,
    external: false,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    display: "santiago-alberto-kirk-cabrera",
    href: profile.links.linkedin,
    icon: faLinkedinIn,
    external: true,
  },
  {
    key: "github",
    label: "GitHub",
    display: "@santiagoalberto416",
    href: profile.links.github,
    icon: faGithub,
    external: true,
  },
  {
    key: "instagram",
    label: "Instagram",
    display: "@santiagokirk",
    href: profile.links.instagram,
    icon: faInstagram,
    external: true,
  },
];

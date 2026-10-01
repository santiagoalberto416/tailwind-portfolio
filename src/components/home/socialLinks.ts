import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { profile } from "@/data/profile";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconDefinition;
  ariaLabel: string;
};

export const socialLinks: Record<
  "linkedin" | "github" | "email" | "instagram",
  SocialLink
> = {
  linkedin: {
    label: "LinkedIn",
    href: profile.links.linkedin,
    icon: faLinkedinIn,
    ariaLabel: "LinkedIn profile (opens in a new tab)",
  },
  github: {
    label: "GitHub",
    href: profile.links.github,
    icon: faGithub,
    ariaLabel: "GitHub profile (opens in a new tab)",
  },
  email: {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: faEnvelope,
    ariaLabel: `Send an email to ${profile.email}`,
  },
  instagram: {
    label: "Instagram",
    href: profile.links.instagram,
    icon: faInstagram,
    ariaLabel: "Instagram profile (opens in a new tab)",
  },
};

export const isExternal = (href: string) => href.startsWith("http");

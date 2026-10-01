// Single source of truth for the portfolio content (based on the 2026 resume).
// Every section of the home page reads from here, so updating the CV only
// requires editing this file.

export type Engagement = {
  client: string;
  domain: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  link?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Stat = {
  value: string;
  label: string;
};

export type Project = {
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  // Screenshot file name inside the R2 bucket (optional)
  image?: string;
  // Shown as the large tile of the projects bento grid (optional)
  featured?: boolean;
  link?: {
    path: string;
    text: string;
  };
};

export const profile = {
  name: "Santiago Alberto Kirk Cabrera",
  shortName: "Santiago Kirk",
  handle: "DevKirk",
  role: "Senior Front-End Engineer",
  focus: ["Angular", "React", "TypeScript"],
  location: "Tijuana, B.C., Mexico",
  timezone: "Pacific Time",
  availability: "Open to remote",
  email: "santiagoalberto416@gmail.com",
  links: {
    linkedin:
      "https://www.linkedin.com/in/santiago-alberto-kirk-cabrera-3442a5124/",
    github: "https://github.com/santiagoalberto416",
    instagram: "https://www.instagram.com/santiagokirk",
  },
  headline:
    "I build large-scale Angular & React front ends, design systems and shared component libraries for U.S. product teams.",
  summary:
    "Senior Front-End Engineer with 10+ years at a nearshore software consultancy, building web and mobile applications for U.S. clients in fintech, dental insurance, financial-planning SaaS, DevOps, and aviation. I specialize in Angular and React front-end architecture: large-scale portal migrations, design systems, and shared component libraries published as npm packages.",
  aiStatement:
    "I work in an AI-first engineering team, using Claude, GitHub Copilot and MCP every day, and collaborate directly with U.S. stakeholders in overlapping time zones.",
  hobbies:
    "Outside of work I like coffee, video games and building side projects — right now I'm learning Japanese and building an iOS app to help me do it.",
  profileImages: {
    hero: "/profile-pic-1.jpg",
    casual: "/profile-pic-2.png",
    portrait: "/profile-pic-3.jpg",
  },
};

export const stats: Stat[] = [
  { value: "10+", label: "Years shipping web & mobile" },
  { value: "~10", label: "Portal modules migrated in 3 months" },
  { value: "~80%", label: "Adoption of my shared UI library" },
  { value: "90+", label: "Lighthouse score after perf work" },
];

export const skills: SkillGroup[] = [
  {
    label: "Front-End",
    items: [
      "Angular (v18–v22)",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "RxJS",
      "Redux",
      "HTML",
      "CSS / SASS",
    ],
  },
  {
    label: "UI & Design Systems",
    items: [
      "Material UI",
      "Tailwind CSS",
      "Bootstrap",
      "DevExpress",
      "Component libraries on npm",
    ],
  },
  {
    label: "AI-Assisted Development",
    items: ["Claude / Claude Code", "GitHub Copilot", "MCP", "BMAD"],
  },
  {
    label: "Mobile",
    items: ["Swift / SwiftUI", "Kotlin", "Java (Android)"],
  },
  {
    label: "APIs & Back-End",
    items: [
      "REST",
      "GraphQL",
      "Axios",
      "Supabase (PostgreSQL, Auth, RLS)",
      "Google Apps Script",
    ],
  },
  {
    label: "CI/CD & Tooling",
    items: ["GitHub Actions", "Git", "npm publishing"],
  },
];

export const company = {
  name: "Arkusnexus",
  role: "Front-End / Mobile Developer",
  period: "2016 – Present",
  location: "Tijuana, Mexico",
  link: "https://www.arkusnexus.com/",
  description:
    "Nearshore software consultancy providing engineering teams to U.S. companies. Embedded in client teams across the engagements below.",
};

export const engagements: Engagement[] = [
  {
    client: "Wellfit",
    domain: "Dental fintech & insurance platform",
    period: "2025 – Present",
    summary:
      "Leading the move of client portals to a new Angular design system.",
    highlights: [
      "Migrated a legacy client portal to a new Angular design system in 3 months, covering ~10 modules (member search, payment processing, transaction history, plan details, plan purchase and more). It is in production and used by thousands of active users.",
      "Architected and published a shared UI component library as versioned npm packages, reaching ~80% adoption across active portals.",
      "Maintain legacy portals on older Angular versions in parallel with new feature development on Angular v20–v22.",
      "Use Claude, GitHub Copilot and MCP daily in an AI-first engineering practice; evaluated the BMAD agentic framework for spec-driven development.",
    ],
    stack: ["Angular v20–v22", "TypeScript", "RxJS", "npm", "Claude", "MCP"],
  },
  {
    client: "Mosaic.tech",
    domain: "Strategic finance / FP&A SaaS",
    period: "2024 – 2025",
    summary: "Brought a full Angular app inside Google Sheets.",
    highlights: [
      "Built a Google Sheets Add-on that embeds a full Angular (v18/v19) application, giving users of this finance SaaS platform core functionality directly inside Sheets.",
    ],
    stack: ["Angular v18/v19", "Google Apps Script", "TypeScript"],
  },
  {
    client: "CTO.ai",
    domain: "DevOps pipeline management platform",
    period: "2022 – 2024",
    summary: "Real-time pipeline UI, CI/CD workflows and CLI work.",
    highlights: [
      "Built UI features in React and Next.js to visualize real-time pipeline execution status.",
      "Authored and maintained GitHub Actions workflows, including the secrets configuration used by CI/CD pipelines.",
      "Contributed to the platform's CLI, including interactive prompts built with Inquirer.",
      "Raised the marketing site's Lighthouse score from the “needs improvement” range (50–89) into the “good” range (90+).",
    ],
    stack: ["React", "Next.js", "TypeScript", "GitHub Actions", "Node.js"],
    link: "https://cto.ai/",
  },
  {
    client: "AmbryHill",
    domain: "Aviation parts ERP",
    period: "2020 – 2022",
    summary: "Data-heavy grids and reporting for an aviation ERP.",
    highlights: [
      "Built data grid and reporting UI components with DevExpress, Material UI and Redux, and implemented selected GraphQL endpoints with the back-end team.",
    ],
    stack: ["React", "Redux", "DevExpress", "Material UI", "GraphQL"],
    link: "https://ambryhill.com/",
  },
  {
    client: "GreatCall",
    domain: "Custom Android-based OS for older adults",
    period: "2016 – 2020",
    summary: "Native system apps for an accessibility-focused OS.",
    highlights: [
      "Developed native Android system apps (calculator, contacts, photo gallery and more) for an accessibility-focused OS, using Kotlin, Content Providers/Observers and Bluetooth APIs with MVP architecture.",
    ],
    stack: ["Kotlin", "Java", "Android", "MVP"],
  },
  {
    client: "Spark Compass",
    domain: "Branded event experiences (mobile internship)",
    period: "Mar – Aug 2016",
    summary: "Beacon-powered iOS & Android event apps.",
    highlights: [
      "Built iOS and Android apps with beacon-based, location-aware interactions for university events and branded campaigns; designed reusable UI components adopted across later projects.",
    ],
    stack: ["Swift", "Java", "iOS", "Android", "Beacons"],
  },
];

export const projects: Project[] = [
  {
    title: "NihongoTeacher",
    tagline: "iOS app for learning Japanese",
    description:
      "A SwiftUI app with a Supabase back end (email auth, PostgreSQL with per-user Row Level Security) offering flashcards, hiragana/katakana quizzes with progressive unlocking, and grammar lessons. Integrates Google ML Kit Digital Ink Recognition for handwriting practice and on-device text-to-speech. Built with an AI-assisted workflow using Claude Code.",
    stack: ["SwiftUI", "Supabase", "ML Kit", "Claude Code"],
  },
  {
    title: "Escala Conners",
    tagline: "Behavioral assessment tool",
    description:
      "Interactive version of the Conners rating scales for parents and teachers: instant scoring with clinical interpretation, autosave, JSON import/export and printable results.",
    stack: ["React", "TypeScript", "Tailwind"],
    image: "conners-scale-screenshoot.png",
    featured: true,
    link: { path: "/conners-scale", text: "Open tool" },
  },
  {
    title: "Social Skills Cards",
    tagline: "Flip cards for kids",
    description:
      "80 interactive cards to practice social skills — conversation, empathy, friendship and conflict resolution — grouped by category in a flip-card grid.",
    stack: ["React", "TypeScript", "Tailwind"],
    link: { path: "/social-skills-cards", text: "Open cards" },
  },
  {
    title: "Dual Memory Game",
    tagline: "Built with a psychologist",
    description:
      "A memory game designed together with my partner, a psychologist, to help kids with special needs train their memory. Deliberately simple and kid-friendly.",
    stack: ["React", "TypeScript"],
    image: "memory-dual-game-screenshoot.png",
    link: { path: "/cumanes-game", text: "Play game" },
  },
  {
    title: "Memory Card Game",
    tagline: "The kids' favorite",
    description:
      "A classic find-the-pairs memory game — the one kids keep asking for. A bit more complex than the dual game, built with React and TypeScript.",
    stack: ["React", "TypeScript"],
    image: "memory-game-screenshoot.jpeg",
    link: { path: "/card-game", text: "Play game" },
  },
  {
    title: "Color Pad",
    tagline: "Sensory game for mobile",
    description:
      "A full-screen color pad for kids: four vibrant pads light up in random patterns, with speed controls, touch-friendly UI and optional vibration feedback.",
    stack: ["React", "TypeScript"],
    image: "color-game-screenshoot.png",
    link: { path: "/color-game", text: "Play game" },
  },
];

export const education = {
  school: "Universidad Tecnológica de Tijuana",
  link: "https://uttijuana.edu.mx/",
  degrees: [
    "B.Eng. in Software Engineering",
    "Associate Degree (TSU) in Information Technology",
  ],
};

export const languages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
];

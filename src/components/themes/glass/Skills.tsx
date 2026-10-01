import Image from "next/image";
import { CSSProperties, FC } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faGears,
  faMobileScreen,
  faPalette,
  faServer,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { skills } from "@/data/profile";
import GlassPanel from "./GlassPanel";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { SectionsIds } from "./sections";

const groupIcons: Record<string, IconDefinition> = {
  "Front-End": faCode,
  "UI & Design Systems": faPalette,
  "AI-Assisted Development": faWandMagicSparkles,
  Mobile: faMobileScreen,
  "APIs & Back-End": faServer,
  "CI/CD & Tooling": faGears,
};

// Logos available in /public for the everyday web stack
const toolkit = [
  { name: "Angular", logo: "/angular-icon.svg" },
  { name: "React", logo: "/react-icon.svg" },
  { name: "TypeScript", logo: "/ts-icon.svg" },
  { name: "JavaScript", logo: "/js-icon.svg" },
  { name: "Tailwind", logo: "/tailwind.svg" },
  { name: "Sass", logo: "/sass-icon.svg" },
  { name: "HTML", logo: "/html-icon.svg" },
  { name: "CSS", logo: "/css3-icon.svg" },
];

const ToolkitPanel: FC = () => (
  <GlassPanel className="skill-card skill-card--toolkit">
    <h3 className="card-title">Everyday toolkit</h3>
    <ul className="toolkit-grid">
      {toolkit.map((tool) => (
        <li key={tool.name} className="toolkit-tile">
          <span className="toolkit-tile__logo">
            <Image src={tool.logo} alt="" width={28} height={28} />
          </span>
          {tool.name}
        </li>
      ))}
    </ul>
  </GlassPanel>
);

// First group is wide; the last one fills its row when the grid has two columns
const gridClass = (index: number) => {
  if (index === 0) return "skills-grid__wide";
  if (index === skills.length - 1) return "skills-grid__last";
  return undefined;
};

const Skills: FC = () => {
  // The toolkit panel sits before the last group so the bento grid closes evenly
  const lastGroup = skills[skills.length - 1];
  const leadingGroups = skills.slice(0, -1);

  const renderGroup = (group: (typeof skills)[number], index: number) => (
    <li
      key={group.label}
      data-reveal
      className={gridClass(index)}
      style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as CSSProperties}
    >
      <GlassPanel className="skill-card" featured={index === 0}>
        <div className="skill-card__header">
          <span className="icon-tile icon-tile--small">
            <Icon icon={groupIcons[group.label] ?? faCode} />
          </span>
          <h3 className="card-title">{group.label}</h3>
          <span className="skill-card__count" aria-label={`${group.items.length} skills`}>
            {group.items.length}
          </span>
        </div>
        <ul className="chip-list">
          {group.items.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </GlassPanel>
    </li>
  );

  return (
    <section
      id={SectionsIds.Skills}
      className="lg-section"
      aria-labelledby="skills-title"
    >
      <div className="lg-container">
        <SectionHeading id="skills-title" eyebrow="Skills" title="What I work with" />
        <ul className="skills-grid">
          {leadingGroups.map(renderGroup)}
          <li className="skills-grid__wide" data-reveal>
            <ToolkitPanel />
          </li>
          {renderGroup(lastGroup, skills.length - 1)}
        </ul>
      </div>
    </section>
  );
};

export default Skills;

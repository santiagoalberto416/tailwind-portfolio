import BentoCard from "@/components/themes/bento/BentoCard";
import SectionHeading from "@/components/themes/bento/SectionHeading";
import { SectionsIds } from "@/components/themes/bento/sections";
import { profile, skills } from "@/data/profile";

// Bento layout for the skill groups (by position): the first group is the
// large feature tile, the rest fill around it.
const tileLayout = [
  "md:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
  "lg:col-span-2",
  "lg:col-span-2",
];

const Skills = () => (
  <section
    id={SectionsIds.Skills}
    aria-labelledby="skills-title"
    className="scroll-mt-24 pt-28 md:pt-36"
  >
    <SectionHeading
      headingId="skills-title"
      eyebrow="02 — Skills"
      title="The toolbox."
      description="From Angular and React architecture to design systems, mobile and AI-assisted workflows."
    />

    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
      {skills.map((group, index) => {
        const featured = index === 0;
        return (
          <BentoCard
            key={group.label}
            revealDelay={(index % 3) * 70}
            className={`flex flex-col gap-5 p-6 md:p-7 ${tileLayout[index] ?? ""} ${
              featured ? "justify-between" : ""
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3
                className={`font-semibold tracking-[-0.02em] text-white ${
                  featured ? "text-2xl md:text-3xl" : "text-lg"
                }`}
              >
                {group.label}
              </h3>
              <span className="font-geist-mono text-[11px] text-zinc-600">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            {featured && (
              <div>
                <p className="mb-1 font-geist-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Core focus
                </p>
                <ul>
                  {profile.focus.map((item, focusIndex) => (
                    <li
                      key={item}
                      className="flex items-baseline justify-between border-b border-white/[0.06] py-3"
                    >
                      <span className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                        {item}
                      </span>
                      <span className="font-geist-mono text-[11px] text-zinc-600">
                        {String(focusIndex + 1).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className={`bento-pill ${featured ? "bento-pill--lg" : ""}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </BentoCard>
        );
      })}
    </div>
  </section>
);

export default Skills;

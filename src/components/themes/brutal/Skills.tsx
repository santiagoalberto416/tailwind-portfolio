import { FC } from "react";
import { skills } from "@/data/profile";
import { SectionsIds, accentFor } from "@/components/themes/brutal/sectionIds";
import SectionHeading from "@/components/themes/brutal/SectionHeading";

const Skills: FC = () => (
  <section
    id={SectionsIds.Skills}
    aria-labelledby="skills-title"
    className="scroll-mt-20 py-20 sm:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="03"
        label="Skills"
        id="skills-title"
        title="My toolbox."
      />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => (
          <li key={group.label} className="reveal">
            <article className="flex h-full flex-col overflow-hidden border-3 border-ink bg-white shadow-nb rounded-nb">
              <header
                className={`flex items-center justify-between gap-4 border-b-3 border-ink px-5 py-3 ${accentFor(index)}`}
              >
                <h3 className="text-xl font-extrabold leading-tight">
                  {group.label}
                </h3>
                <span className="nb-label" aria-hidden="true">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </header>
              <ul className="flex flex-wrap gap-2 p-5">
                {group.items.map((item) => (
                  <li key={item} className="nb-pill text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Skills;

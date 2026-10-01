import { FC } from "react";
import { stats } from "@/data/profile";
import { SectionsIds, accentFor } from "@/components/themes/brutal/sectionIds";
import SectionHeading from "@/components/themes/brutal/SectionHeading";

// Alternating tilt so the blocks feel hand-placed rather than templated.
const tilts = ["lg:-rotate-1", "lg:rotate-1", "lg:-rotate-[0.5deg]", "lg:rotate-[1.5deg]"];

const Stats: FC = () => (
  <section
    id={SectionsIds.Stats}
    aria-labelledby="stats-title"
    className="scroll-mt-20 border-y-3 border-ink bg-white py-20 sm:py-24"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="02"
        label="Numbers"
        id="stats-title"
        title="By the numbers."
      />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <li key={stat.label} className="reveal">
            <div
              className={`flex h-full flex-col justify-between gap-6 border-3 border-ink p-6 shadow-nb rounded-nb ${accentFor(index)} ${tilts[index % tilts.length]}`}
            >
              <p className="text-[clamp(3.5rem,8vw,5.5rem)] font-extrabold leading-none tracking-tighter">
                {stat.value}
              </p>
              <p className="border-t-3 border-ink pt-4 font-mono text-sm font-bold uppercase leading-snug">
                {stat.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Stats;

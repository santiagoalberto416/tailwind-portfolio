import BentoCard from "@/components/home/BentoCard";
import { SectionsIds } from "@/components/home/sections";
import { stats } from "@/data/profile";

// Key numbers from the CV as a row of compact bento tiles.
const Stats = () => (
  <section
    id={SectionsIds.Stats}
    aria-label="Impact in numbers"
    className="scroll-mt-24 pt-3 md:pt-4"
  >
    <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <BentoCard
          as="li"
          key={stat.label}
          revealDelay={index * 70}
          className="flex flex-col p-5 md:p-7"
        >
          <span className="font-geist-mono text-[11px] text-zinc-600">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-8 text-4xl font-semibold tracking-[-0.05em] text-white md:mt-12 md:text-6xl">
            {stat.value}
          </p>
          <p className="mt-2 text-sm leading-snug text-zinc-400">{stat.label}</p>
        </BentoCard>
      ))}
    </ul>
  </section>
);

export default Stats;

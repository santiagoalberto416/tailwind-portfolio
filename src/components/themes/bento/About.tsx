import Image from "next/image";
import {
  faArrowUpRightFromSquare,
  faGraduationCap,
  faLanguage,
  faMugHot,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import BentoCard from "@/components/themes/bento/BentoCard";
import Icon from "@/components/themes/bento/Icon";
import SectionHeading from "@/components/themes/bento/SectionHeading";
import { SectionsIds } from "@/components/themes/bento/sections";
import { education, languages, profile } from "@/data/profile";
import { R2_BUCKET } from "@/utils/resources";

const CardLabel = ({ icon, children }: { icon: IconDefinition; children: string }) => (
  <p className="flex items-center gap-2 font-geist-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
    <Icon icon={icon} className="h-3.5 w-3.5 text-accent" />
    {children}
  </p>
);

const About = () => (
  <section
    id={SectionsIds.About}
    aria-labelledby="about-title"
    className="scroll-mt-24 pt-28 md:pt-36"
  >
    <SectionHeading
      headingId="about-title"
      eyebrow="01 — About"
      title="Front-end architecture, built to last."
    />

    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-6">
      <BentoCard className="p-7 md:col-span-2 md:p-9 lg:col-span-4">
        <p className="text-xl leading-relaxed tracking-[-0.01em] text-zinc-200 md:text-2xl md:leading-[1.45]">
          {profile.summary}
        </p>
      </BentoCard>

      <BentoCard
        revealDelay={80}
        className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] lg:col-span-2 lg:row-span-2"
      >
        <Image
          src={R2_BUCKET + profile.profileImages.casual}
          alt={`${profile.shortName} at the beach at sunset`}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-[30%_50%]"
        />
      </BentoCard>

      <BentoCard className="flex flex-col gap-4 p-7 lg:col-span-2">
        <CardLabel icon={faWandMagicSparkles}>AI-first</CardLabel>
        <p className="text-[15px] leading-relaxed text-zinc-300">
          {profile.aiStatement}
        </p>
      </BentoCard>

      <BentoCard revealDelay={80} className="flex flex-col gap-4 p-7 lg:col-span-2">
        <CardLabel icon={faMugHot}>Off the clock</CardLabel>
        <p className="text-[15px] leading-relaxed text-zinc-300">{profile.hobbies}</p>
      </BentoCard>

      <BentoCard className="flex flex-col gap-5 p-7 lg:col-span-3">
        <CardLabel icon={faGraduationCap}>Education</CardLabel>
        <div>
          <a
            href={education.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-lg font-medium text-white hover:text-accent"
          >
            {education.school}
            <Icon
              icon={faArrowUpRightFromSquare}
              className="h-3 w-3 text-zinc-500 group-hover:text-accent"
            />
          </a>
          <ul className="mt-3 space-y-1.5">
            {education.degrees.map((degree) => (
              <li key={degree} className="flex gap-2.5 text-[15px] text-zinc-400">
                <span className="mt-[9px] h-1 w-1 flex-none rounded-[999px] bg-zinc-600" aria-hidden="true" />
                {degree}
              </li>
            ))}
          </ul>
        </div>
      </BentoCard>

      <BentoCard revealDelay={80} className="flex flex-col gap-5 p-7 md:col-span-1 lg:col-span-3">
        <CardLabel icon={faLanguage}>Languages</CardLabel>
        <ul className="divide-y divide-white/[0.06]">
          {languages.map((language) => (
            <li
              key={language.name}
              className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
            >
              <span className="text-lg font-medium text-white">{language.name}</span>
              <span className="text-right font-geist-mono text-xs text-zinc-400">
                {language.level}
              </span>
            </li>
          ))}
        </ul>
      </BentoCard>
    </div>
  </section>
);

export default About;

import Image from "next/image";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import BentoCard from "@/components/themes/bento/BentoCard";
import Icon from "@/components/themes/bento/Icon";
import LocalTime from "@/components/themes/bento/LocalTime";
import { SectionsIds } from "@/components/themes/bento/sections";
import { company, engagements, profile } from "@/data/profile";
import { R2_BUCKET } from "@/utils/resources";

const techStack = [
  { name: "Angular", logo: "/angular-icon.png" },
  { name: "React", logo: "/react-icon.svg" },
  { name: "TypeScript", logo: "/ts-icon.svg" },
  { name: "Tailwind", logo: "/tailwind.svg" },
  { name: "Sass", logo: "/sass-icon.svg" },
  { name: "JavaScript", logo: "/js-icon.svg" },
];

const socialLinks = [
  { label: "LinkedIn", href: profile.links.linkedin, icon: faLinkedinIn },
  { label: "GitHub", href: profile.links.github, icon: faGithub },
  { label: "Email", href: `mailto:${profile.email}`, icon: faEnvelope },
];

const currentEngagement = engagements[0];

const tileLabel = "font-geist-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500";

// The intro is itself a bento grid: one large intro tile surrounded by
// smaller tiles (photo, status, local time, stack, numbers, socials).
const Hero = () => (
  <section
    id={SectionsIds.Home}
    aria-labelledby="hero-title"
    className="scroll-mt-24 pt-24 md:pt-28"
  >
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:auto-rows-[minmax(200px,auto)] lg:grid-cols-4">
      {/* Intro */}
      <BentoCard
        reveal={false}
        className="hero-enter flex flex-col justify-between gap-10 p-7 md:col-span-2 md:p-10 lg:row-span-2"
      >
        <div>
          <p className="inline-flex items-center gap-2 rounded-[999px] border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-geist-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-[999px] bg-accent" aria-hidden="true" />
            {profile.role}
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-[3.6rem]"
          >
            {profile.name}
          </h1>
          <p className="mt-5 font-geist-mono text-sm text-accent">
            {profile.focus.join(" · ")}
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            {profile.headline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`#${SectionsIds.Contact}`}
            className="group inline-flex items-center gap-2 rounded-[999px] bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform hover:-translate-y-0.5"
          >
            Get in touch
            <Icon
              icon={faArrowRight}
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={`#${SectionsIds.Projects}`}
            className="inline-flex items-center gap-2 rounded-[999px] border border-white/[0.12] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
          >
            See my work
          </a>
        </div>
      </BentoCard>

      {/* Photo */}
      <BentoCard
        reveal={false}
        revealDelay={80}
        className="hero-enter relative aspect-[4/5] md:row-span-2 md:aspect-auto md:min-h-[420px]"
      >
        <Image
          src={R2_BUCKET + profile.profileImages.hero}
          alt={`Portrait of ${profile.shortName}`}
          fill
          priority
          sizes="(min-width: 1024px) 300px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        <p className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-sm font-medium text-white">
          <span className="status-dot" aria-hidden="true" />
          {profile.availability}
        </p>
      </BentoCard>

      {/* Current engagement */}
      <BentoCard
        reveal={false}
        revealDelay={140}
        className="hero-enter flex flex-col justify-between gap-6 p-6"
      >
        <p className={tileLabel}>Currently at</p>
        <div>
          <p className="text-3xl font-semibold tracking-[-0.03em] text-white">
            {currentEngagement.client}
          </p>
          <p className="mt-1.5 text-sm leading-snug text-zinc-400">
            {currentEngagement.domain}
          </p>
        </div>
        <p className="font-geist-mono text-[11px] text-zinc-500">
          via {company.name} · {currentEngagement.period}
        </p>
      </BentoCard>

      {/* Local time */}
      <BentoCard
        reveal={false}
        revealDelay={200}
        className="hero-enter flex flex-col justify-between gap-6 p-6"
      >
        <p className={tileLabel}>Local time</p>
        <LocalTime />
        <p className="text-sm leading-snug text-zinc-400">
          {profile.location}
          <span className="block font-geist-mono text-[11px] text-zinc-500">
            {profile.timezone} · overlaps U.S. hours
          </span>
        </p>
      </BentoCard>

      {/* Tech stack */}
      <BentoCard
        reveal={false}
        revealDelay={260}
        className="hero-enter flex flex-col justify-between gap-6 p-6 md:col-span-2"
      >
        <p className={tileLabel}>Daily stack</p>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {techStack.map((tech) => (
            <li
              key={tech.name}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-2 py-3"
            >
              <Image
                src={tech.logo}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="font-geist-mono text-[10px] text-zinc-400">
                {tech.name}
              </span>
            </li>
          ))}
        </ul>
      </BentoCard>

      {/* Number */}
      <BentoCard
        reveal={false}
        revealDelay={320}
        className="hero-enter flex flex-col justify-between gap-6 p-6"
      >
        <p className={tileLabel}>Since {company.period.slice(0, 4)}</p>
        <div>
          <p className="text-5xl font-semibold tracking-[-0.05em] text-white">
            {engagements.length}
          </p>
          <p className="mt-1.5 text-sm leading-snug text-zinc-400">
            client engagements with {company.name}
          </p>
        </div>
      </BentoCard>

      {/* Socials */}
      <BentoCard
        reveal={false}
        revealDelay={380}
        className="hero-enter flex flex-col justify-between gap-6 p-6"
      >
        <p className={tileLabel}>Find me on</p>
        <ul className="grid grid-cols-3 gap-2">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-label={link.label}
                title={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="grid aspect-square place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-zinc-300 transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
              >
                <Icon icon={link.icon} className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </BentoCard>
    </div>
  </section>
);

export default Hero;

import { useId, useState } from "react";
import {
  faArrowUpRightFromSquare,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import BentoCard from "@/components/themes/bento/BentoCard";
import Icon from "@/components/themes/bento/Icon";
import SectionHeading from "@/components/themes/bento/SectionHeading";
import { SectionsIds } from "@/components/themes/bento/sections";
import { Engagement, company, engagements } from "@/data/profile";

const StackPills = ({ stack }: { stack: string[] }) => (
  <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
    {stack.map((item) => (
      <li key={item} className="bento-pill">
        {item}
      </li>
    ))}
  </ul>
);

const ClientLink = ({ engagement }: { engagement: Engagement }) =>
  engagement.link ? (
    <a
      href={engagement.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${engagement.client} website`}
      className="grid h-8 w-8 flex-none place-items-center rounded-[999px] border border-white/[0.08] text-zinc-400 transition-colors hover:border-accent/40 hover:text-accent"
    >
      <Icon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
    </a>
  ) : null;

const HighlightList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((highlight) => (
      <li key={highlight} className="flex gap-3 text-[15px] leading-relaxed text-zinc-300">
        <span className="mt-[11px] h-1 w-1 flex-none rounded-[999px] bg-accent" aria-hidden="true" />
        {highlight}
      </li>
    ))}
  </ul>
);

// The current engagement gets the large, two-column feature tile.
const FeaturedEngagement = ({ engagement }: { engagement: Engagement }) => (
  <BentoCard
    as="article"
    className="grid gap-8 p-7 md:col-span-2 md:p-10 lg:col-span-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
  >
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2 font-geist-mono text-xs text-zinc-400">
          <span className="status-dot" aria-hidden="true" />
          {engagement.period}
        </p>
        <ClientLink engagement={engagement} />
      </div>
      <div>
        <h3 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
          {engagement.client}
        </h3>
        <p className="mt-2 font-geist-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
          {engagement.domain}
        </p>
      </div>
      <p className="text-lg leading-relaxed text-zinc-300">{engagement.summary}</p>
      <div className="mt-auto">
        <StackPills stack={engagement.stack} />
      </div>
    </div>
    <div className="border-t border-white/[0.06] pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
      <HighlightList items={engagement.highlights} />
    </div>
  </BentoCard>
);

type EngagementCardProps = {
  engagement: Engagement;
  className?: string;
  revealDelay?: number;
};

// Past engagements: first highlight visible, the rest behind a toggle.
const EngagementCard = ({ engagement, className = "", revealDelay }: EngagementCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const moreId = useId();
  const [firstHighlight, ...moreHighlights] = engagement.highlights;

  return (
    <BentoCard
      as="article"
      revealDelay={revealDelay}
      className={`flex flex-col gap-5 p-6 md:p-7 ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-geist-mono text-xs text-zinc-500">{engagement.period}</p>
        <ClientLink engagement={engagement} />
      </div>
      <div>
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
          {engagement.client}
        </h3>
        <p className="mt-1.5 font-geist-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
          {engagement.domain}
        </p>
      </div>
      <p className="font-medium text-zinc-200">{engagement.summary}</p>

      {firstHighlight && <HighlightList items={[firstHighlight]} />}
      {moreHighlights.length > 0 && (
        <div>
          <div id={moreId} hidden={!expanded} className="mb-4">
            <HighlightList items={moreHighlights} />
          </div>
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            aria-controls={moreId}
            className="inline-flex items-center gap-2 rounded-[999px] border border-white/[0.08] px-3 py-1.5 font-geist-mono text-[11px] text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
          >
            {expanded ? "Show less" : `+${moreHighlights.length} more highlights`}
            <Icon
              icon={faChevronDown}
              className={`h-2.5 w-2.5 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}

      <div className="mt-auto pt-2">
        <StackPills stack={engagement.stack} />
      </div>
    </BentoCard>
  );
};

// Bento spans for past engagements: two wide tiles, then rows of three.
const spanFor = (index: number, total: number) => {
  const isLastOdd = total % 2 === 1 && index === total - 1;
  return `${index < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${isLastOdd ? "md:col-span-2" : ""}`;
};

const Experience = () => {
  const [current, ...past] = engagements;

  return (
    <section
      id={SectionsIds.Experience}
      aria-labelledby="experience-title"
      className="scroll-mt-24 pt-28 md:pt-36"
    >
      <SectionHeading
        headingId="experience-title"
        eyebrow="03 — Experience"
        title="A decade of client work."
        description={company.description}
      />

      <BentoCard className="mb-3 flex flex-col gap-4 p-5 md:mb-4 md:flex-row md:items-center md:justify-between md:px-7">
        <div className="flex items-center gap-4">
          <span
            className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-white text-lg font-bold text-ink-950"
            aria-hidden="true"
          >
            {company.name.charAt(0)}
          </span>
          <div>
            <a
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-accent"
            >
              {company.name}
              <Icon icon={faArrowUpRightFromSquare} className="h-3 w-3 text-zinc-500" />
            </a>
            <p className="text-sm text-zinc-400">{company.role}</p>
          </div>
        </div>
        <p className="font-geist-mono text-xs text-zinc-500">
          {company.period} · {company.location}
        </p>
      </BentoCard>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-6">
        {current && <FeaturedEngagement engagement={current} />}
        {past.map((engagement, index) => (
          <EngagementCard
            key={engagement.client}
            engagement={engagement}
            revealDelay={(index % 3) * 70}
            className={spanFor(index, past.length)}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;

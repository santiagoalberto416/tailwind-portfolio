import { FC } from "react";
import { company, Engagement, engagements } from "@/data/profile";
import { SectionsIds } from "@/components/home/sectionIds";
import SectionHeading from "@/components/home/sectionHeading";

// Domain tags rotate through the accents that contrast with white cards.
const domainFills = ["bg-bubblegum", "bg-mint", "bg-lilac", "bg-sun"];

const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

const EngagementCard: FC<{ engagement: Engagement; index: number }> = ({
  engagement,
  index,
}) => {
  const featured = index === 0;

  return (
    <article
      className={`relative grid gap-6 border-3 border-ink p-6 rounded-nb sm:p-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-10 ${
        featured ? "bg-sun shadow-nb-lg" : "bg-white shadow-nb"
      }`}
    >
      {featured && (
        <p className="absolute -top-4 right-4 rotate-3 border-3 border-ink bg-bubblegum px-3 py-1 font-mono text-sm font-bold uppercase shadow-nb-sm rounded-nb sm:right-8">
          Now <span aria-hidden="true">✦</span>
        </p>
      )}

      <div className="flex flex-col items-start gap-3">
        <p className="nb-label">{engagement.period}</p>
        <h4
          className={`font-extrabold leading-none tracking-tight ${
            featured ? "text-5xl sm:text-6xl" : "text-4xl"
          }`}
        >
          {engagement.client}
        </h4>
        <p
          className={`border-2 border-ink px-2.5 py-1 font-mono text-xs font-bold uppercase leading-snug rounded-nb ${
            featured ? "bg-white" : domainFills[index % domainFills.length]
          }`}
        >
          {engagement.domain}
        </p>
        {engagement.link && (
          <a
            href={engagement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="nb-link mt-1 font-mono text-sm"
          >
            {hostOf(engagement.link)} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>

      <div className="min-w-0">
        <p
          className={`font-bold leading-snug ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
          {engagement.summary}
        </p>
        <ul className="nb-list mt-4 space-y-3 text-base leading-relaxed sm:text-lg">
          {engagement.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {engagement.stack.map((tech) => (
            <li key={tech} className="nb-pill">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const Experience: FC = () => (
  <section
    id={SectionsIds.Experience}
    aria-labelledby="experience-title"
    className="scroll-mt-20 border-t-3 border-ink bg-white py-20 sm:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="04"
        label="Experience"
        id="experience-title"
        title="Where I've shipped."
      />

      {/* Employer */}
      <div className="reveal nb-dark mb-14 grid gap-6 border-3 border-ink bg-ink p-6 text-paper shadow-nb-lg rounded-nb sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="nb-label mb-4 text-sun">Employer · {company.period}</p>
          <h3 className="text-[clamp(3rem,9vw,6rem)] font-extrabold leading-[0.9] tracking-tight text-sun">
            {company.name}
          </h3>
          <p className="mt-4 text-xl font-bold">{company.role}</p>
          <p className="mt-1 font-mono text-sm">{company.location}</p>
        </div>
        <div className="flex flex-col items-start justify-end gap-6">
          <p className="text-lg leading-relaxed sm:text-xl">
            {company.description}
          </p>
          <a
            href={company.link}
            target="_blank"
            rel="noopener noreferrer"
            className="nb-btn nb-btn--on-dark border-paper bg-sun"
          >
            {hostOf(company.link)} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

      <h3 className="reveal nb-label mb-8 flex items-center gap-4">
        Client engagements
        <span className="h-[3px] flex-1 bg-ink" aria-hidden="true" />
        <span>{String(engagements.length).padStart(2, "0")}</span>
      </h3>

      <ol className="space-y-8">
        {engagements.map((engagement, index) => (
          <li key={engagement.client} className="reveal">
            <EngagementCard engagement={engagement} index={index} />
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;

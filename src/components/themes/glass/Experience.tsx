import { FC } from "react";
import {
  faArrowUpRightFromSquare,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { company, Engagement, engagements } from "@/data/profile";
import GlassPanel from "./GlassPanel";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { SectionsIds } from "./sections";

const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, "");

const ExternalLink: FC<{ href: string; label: string }> = ({ href, label }) => (
  <a
    href={href}
    className="text-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    {label}
    <Icon icon={faArrowUpRightFromSquare} />
    <span className="sr-only">(opens in a new tab)</span>
  </a>
);

const EngagementCard: FC<{ engagement: Engagement; featured: boolean }> = ({
  engagement,
  featured,
}) => (
  <GlassPanel
    as="article"
    blur={featured}
    featured={featured}
    className={`engagement ${featured ? "engagement--featured" : ""}`}
  >
    <header className="engagement__header">
      <div>
        <h4 className="engagement__client">
          {engagement.client}
          {featured && <span className="badge-current">Current</span>}
        </h4>
        <p className="engagement__domain">{engagement.domain}</p>
      </div>
      <p className="period-chip">{engagement.period}</p>
    </header>

    <p className="engagement__summary">{engagement.summary}</p>

    <ul className="highlight-list">
      {engagement.highlights.map((highlight) => (
        <li key={highlight}>{highlight}</li>
      ))}
    </ul>

    <footer className="engagement__footer">
      <ul className="chip-list" aria-label={`${engagement.client} stack`}>
        {engagement.stack.map((tech) => (
          <li key={tech} className="chip chip--small">
            {tech}
          </li>
        ))}
      </ul>
      {engagement.link && (
        <ExternalLink href={engagement.link} label={hostname(engagement.link)} />
      )}
    </footer>
  </GlassPanel>
);

const Experience: FC = () => (
  <section
    id={SectionsIds.Experience}
    className="lg-section"
    aria-labelledby="experience-title"
  >
    <div className="lg-container">
      <SectionHeading
        id="experience-title"
        eyebrow="Experience"
        title="Embedded in U.S. product teams"
      />

      <GlassPanel blur className="company-card" data-reveal>
        <span className="company-card__mark" aria-hidden="true">
          {company.name.charAt(0)}
        </span>
        <div className="company-card__body">
          <div className="company-card__top">
            <h3 className="company-card__name">{company.name}</h3>
            <p className="period-chip">{company.period}</p>
          </div>
          <p className="company-card__meta">
            <span>{company.role}</span>
            <span>
              <Icon icon={faLocationDot} />
              {company.location}
            </span>
          </p>
          <p className="company-card__description">{company.description}</p>
          <ExternalLink href={company.link} label={hostname(company.link)} />
        </div>
      </GlassPanel>

      <ol className="timeline" aria-label={`Client engagements at ${company.name}`}>
        {engagements.map((engagement, index) => (
          <li key={engagement.client} className="timeline__item" data-reveal>
            <EngagementCard engagement={engagement} featured={index === 0} />
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;

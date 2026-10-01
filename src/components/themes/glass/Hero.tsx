import Image from "next/image";
import { FC } from "react";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { profile, stats } from "@/data/profile";
import { R2_BUCKET } from "@/utils/resources";
import GlassPanel from "./GlassPanel";
import Icon from "./Icon";
import { contactLinks } from "./contactLinks";
import { SectionsIds } from "./sections";

const focusLogos: Record<string, string> = {
  Angular: "/angular-icon.png",
  React: "/react-icon.svg",
  TypeScript: "/ts-icon.svg",
};

const heroLinks = contactLinks.filter((link) => link.key !== "instagram");
const [experienceStat] = stats;

const Hero: FC = () => (
  <section
    id={SectionsIds.Home}
    className="hero lg-section"
    aria-labelledby="hero-title"
  >
    <div className="lg-container">
      <GlassPanel blur className="hero-card" data-reveal>
        <div className="hero-copy">
          <p className="status-chip">
            <span className="status-dot" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 id="hero-title" className="hero-name">
            {profile.name}
          </h1>

          <p className="hero-role">
            <span className="text-gradient">{profile.role}</span>
          </p>

          <ul className="focus-list" aria-label="Main technologies">
            {profile.focus.map((tech) => (
              <li key={tech} className="focus-pill">
                {focusLogos[tech] && (
                  <Image src={focusLogos[tech]} alt="" width={18} height={18} />
                )}
                {tech}
              </li>
            ))}
          </ul>

          <p className="hero-headline">{profile.headline}</p>

          <p className="hero-location">
            <Icon icon={faLocationDot} />
            {profile.location} · {profile.timezone}
          </p>

          <div className="hero-actions">
            <a href={`#${SectionsIds.Contact}`} className="btn btn--primary">
              Get in touch
              <Icon icon={faArrowRight} />
            </a>
            <a href={`#${SectionsIds.Projects}`} className="btn btn--glass">
              View work
            </a>
            <ul className="hero-social" aria-label="Find me online">
              {heroLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="icon-btn"
                    aria-label={link.label}
                    {...(link.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    <Icon icon={link.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-visual">
          <div className="photo-frame">
            <Image
              src={R2_BUCKET + profile.profileImages.hero}
              alt={`Portrait of ${profile.shortName}, smiling`}
              width={360}
              height={360}
              priority
            />
          </div>
          <p className="float-chip float-chip--top">
            <span className="float-chip__value">{experienceStat.value}</span>
            <span className="float-chip__label">years shipping</span>
          </p>
          <p className="float-chip float-chip--bottom">
            <span className="float-chip__emoji" aria-hidden="true">
              ✦
            </span>
            AI-first workflow
          </p>
        </div>
      </GlassPanel>
    </div>
  </section>
);

export default Hero;

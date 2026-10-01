import Image from "next/image";
import { FC } from "react";
import {
  faArrowUpRightFromSquare,
  faGraduationCap,
  faLanguage,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { education, languages, profile } from "@/data/profile";
import { R2_BUCKET } from "@/utils/resources";
import GlassPanel from "./GlassPanel";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { SectionsIds } from "./sections";

const About: FC = () => (
  <section
    id={SectionsIds.About}
    className="lg-section"
    aria-labelledby="about-title"
  >
    <div className="lg-container">
      <SectionHeading id="about-title" eyebrow="About" title="A decade of front ends" />

      <div className="about-grid">
        <GlassPanel blur className="about-summary" data-reveal>
          <p className="card-kicker">Who I am</p>
          <p className="about-summary__text">{profile.summary}</p>
        </GlassPanel>

        <GlassPanel className="about-photo" data-reveal>
          <Image
            src={R2_BUCKET + profile.profileImages.casual}
            alt={`${profile.shortName} at the beach during sunset`}
            fill
            sizes="(min-width: 1024px) 420px, 100vw"
          />
          <div className="about-photo__caption">
            <p className="card-kicker">Beyond the code</p>
            <p>{profile.hobbies}</p>
          </div>
        </GlassPanel>

        <GlassPanel className="about-ai" data-reveal>
          <span className="icon-tile icon-tile--violet">
            <Icon icon={faWandMagicSparkles} />
          </span>
          <div>
            <p className="card-kicker">How I work</p>
            <p className="about-ai__text">{profile.aiStatement}</p>
          </div>
        </GlassPanel>

        <GlassPanel className="about-info" data-reveal>
          <span className="icon-tile icon-tile--aqua">
            <Icon icon={faGraduationCap} />
          </span>
          <div className="about-info__body">
            <h3 className="card-title">Education</h3>
            <a
              href={education.link}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {education.school}
              <Icon icon={faArrowUpRightFromSquare} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <ul className="plain-list">
              {education.degrees.map((degree) => (
                <li key={degree}>{degree}</li>
              ))}
            </ul>
          </div>
        </GlassPanel>

        <GlassPanel className="about-info" data-reveal>
          <span className="icon-tile icon-tile--coral">
            <Icon icon={faLanguage} />
          </span>
          <div className="about-info__body">
            <h3 className="card-title">Languages</h3>
            <dl className="language-list">
              {languages.map((language) => (
                <div key={language.name} className="language-row">
                  <dt>{language.name}</dt>
                  <dd>{language.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </GlassPanel>
      </div>
    </div>
  </section>
);

export default About;

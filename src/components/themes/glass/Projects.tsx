import Image from "next/image";
import Link from "next/link";
import { CSSProperties, FC } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Project, projects } from "@/data/profile";
import { externalLinkProps, projectImageUrl } from "@/utils/resources";
import GlassPanel from "./GlassPanel";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { SectionsIds } from "./sections";

const initials = (title: string) =>
  title
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2);

const ProjectMedia: FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  if (project.image) {
    return (
      <div className="project-media">
        <Image
          src={projectImageUrl(project.image)}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        />
      </div>
    );
  }

  // No screenshot: a gradient header with a large glass glyph instead
  return (
    <div
      className={`project-media project-media--glyph project-media--tone-${index % 3}`}
      aria-hidden="true"
    >
      <span className="project-glyph">{project.glyph ?? initials(project.title)}</span>
    </div>
  );
};

const ProjectCard: FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => (
  <GlassPanel as="article" interactive className="project-card">
    <ProjectMedia project={project} index={index} />
    <div className="project-card__body">
      <p className="card-kicker">{project.tagline}</p>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>
      <ul className="chip-list" aria-label={`${project.title} stack`}>
        {project.stack.map((tech) => (
          <li key={tech} className="chip chip--small">
            {tech}
          </li>
        ))}
      </ul>
      <div className="project-card__action">
        {project.link ? (
          <Link
            href={project.link.path}
            className="btn btn--glass btn--small"
            {...externalLinkProps(project.link.path)}
            aria-label={`${project.link.text}: ${project.title}`}
          >
            {project.link.text}
            <Icon icon={faArrowRight} />
          </Link>
        ) : (
          <p className="status-chip status-chip--muted">
            <span className="status-dot status-dot--amber" aria-hidden="true" />
            In progress
          </p>
        )}
      </div>
    </div>
  </GlassPanel>
);

const Projects: FC = () => (
  <section
    id={SectionsIds.Projects}
    className="lg-section"
    aria-labelledby="projects-title"
  >
    <div className="lg-container">
      <SectionHeading id="projects-title" eyebrow="Projects" title="Side projects & tools">
        Small products I design and build end to end, from an iOS app for
        learning Japanese to tools and games made for kids.
      </SectionHeading>
      <ul className="projects-grid">
        {projects.map((project, index) => (
          <li
            key={project.title}
            data-reveal
            style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}
          >
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Projects;

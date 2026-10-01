import Image from "next/image";
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import BentoCard from "@/components/themes/bento/BentoCard";
import Icon from "@/components/themes/bento/Icon";
import SectionHeading from "@/components/themes/bento/SectionHeading";
import { SectionsIds } from "@/components/themes/bento/sections";
import { Project, projects } from "@/data/profile";
import { R2_BUCKET } from "@/utils/resources";

// Featured project first, then text-only tiles (they sit next to the
// featured one), then the tiles with screenshots.
const tileOrder = (project: Project) => (project.featured ? 0 : project.image ? 2 : 1);
const orderedProjects = [...projects].sort((a, b) => tileOrder(a) - tileOrder(b));

// Screenshot inside a minimal browser-window frame.
const Screenshot = ({ project, sizes }: { project: Project; sizes: string }) => (
  <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-ink-850">
    <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2" aria-hidden="true">
      <span className="h-2 w-2 rounded-[999px] bg-white/15" />
      <span className="h-2 w-2 rounded-[999px] bg-white/15" />
      <span className="h-2 w-2 rounded-[999px] bg-white/15" />
      {project.link && (
        <span className="ml-2 truncate font-geist-mono text-[10px] text-zinc-500">
          {project.link.path}
        </span>
      )}
    </div>
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image
        src={`${R2_BUCKET}/${project.image}`}
        alt={`Screenshot of ${project.title}`}
        fill
        sizes={sizes}
        className="bento-shot object-cover object-top"
      />
    </div>
  </div>
);

const ProjectCard = ({ project, revealDelay }: { project: Project; revealDelay: number }) => {
  const { featured, image, link } = project;
  const layout = featured
    ? "md:col-span-2 lg:col-span-4 lg:row-span-2"
    : "lg:col-span-2";

  return (
    <BentoCard
      as="article"
      revealDelay={revealDelay}
      className={`group flex flex-col gap-6 p-6 md:p-7 ${layout} ${
        featured ? "lg:p-9" : ""
      }`}
    >
      {image && !featured && (
        <Screenshot project={project} sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw" />
      )}

      <div className="flex flex-1 flex-col gap-4">
        <p className="font-geist-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          {project.tagline}
        </p>
        <h3
          className={`font-semibold tracking-[-0.03em] text-white ${
            featured ? "text-3xl md:text-4xl" : "text-xl"
          }`}
        >
          {link ? (
            // Stretched link: the whole card is clickable, the heading is the label.
            <Link
              href={link.path}
              className="stretched-link"
            >
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        <p
          className={`leading-relaxed text-zinc-400 ${
            featured ? "max-w-2xl text-base md:text-lg" : "text-[15px]"
          }`}
        >
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
            {project.stack.map((item) => (
              <li key={item} className="bento-pill">
                {item}
              </li>
            ))}
          </ul>
          {link && (
            <span
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-accent"
              aria-hidden="true"
            >
              {link.text}
              <Icon
                icon={faArrowRight}
                className="h-3 w-3 transition-transform group-hover:translate-x-1"
              />
            </span>
          )}
        </div>
      </div>

      {image && featured && (
        <Screenshot project={project} sizes="(min-width: 1024px) 760px, 100vw" />
      )}
    </BentoCard>
  );
};

const Projects = () => (
  <section
    id={SectionsIds.Projects}
    aria-labelledby="projects-title"
    className="scroll-mt-24 pt-28 md:pt-36"
  >
    <SectionHeading
      headingId="projects-title"
      eyebrow="04 — Projects"
      title="Side projects."
      description="Small tools and games I build in my spare time — most of them for kids."
    />

    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-6">
      {orderedProjects.map((project, index) => (
        <ProjectCard key={project.title} project={project} revealDelay={(index % 3) * 70} />
      ))}
    </div>
  </section>
);

export default Projects;

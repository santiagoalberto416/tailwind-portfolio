import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, projects } from "@/data/profile";
import { R2_BUCKET } from "@/utils/resources";
import { SectionsIds, accentFor } from "@/components/home/sectionIds";
import SectionHeading from "@/components/home/sectionHeading";

// "NihongoTeacher" -> "Nihongo Teacher" so poster titles wrap between words.
const splitCamelCase = (text: string) => text.replace(/([a-z])([A-Z])/g, "$1 $2");

// Screenshot (or a typographic poster when there is none) inside a little
// browser window drawn with thick strokes.
const ProjectPreview: FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => (
  <div className="overflow-hidden border-3 border-ink bg-white rounded-nb">
    <div className="flex items-center gap-1.5 border-b-3 border-ink bg-paper px-3 py-2">
      {["bg-bubblegum", "bg-sun", "bg-mint"].map((dot) => (
        <span
          key={dot}
          className={`h-3 w-3 border-2 border-ink ${dot}`}
          aria-hidden="true"
        />
      ))}
      <span className="ml-2 truncate font-mono text-xs font-bold">
        {project.link?.path ?? project.title}
      </span>
    </div>

    {project.image ? (
      <Image
        src={`${R2_BUCKET}/${project.image}`}
        alt={`Screenshot of ${project.title}`}
        width={960}
        height={600}
        className="aspect-[16/10] w-full object-cover object-top"
      />
    ) : (
      <div
        className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden bg-ink p-5 text-paper"
        aria-hidden="true"
      >
        <span className="flex items-center justify-between gap-4 font-mono text-sm font-bold text-sun">
          {String(index + 1).padStart(2, "0")} / {project.stack[0]}
          <span className="h-7 w-7 rotate-12 border-3 border-paper bg-bubblegum" />
        </span>
        <span className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-extrabold leading-[0.9] tracking-tight">
          {splitCamelCase(project.title)}
        </span>
      </div>
    )}
  </div>
);

const Projects: FC = () => (
  <section
    id={SectionsIds.Projects}
    aria-labelledby="projects-title"
    className="scroll-mt-20 border-t-3 border-ink py-20 sm:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="05"
        label="Projects"
        id="projects-title"
        title="Side projects."
      />

      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.title} className="reveal">
            <article
              className={`nb-lift flex h-full flex-col gap-5 border-3 border-ink p-4 shadow-nb rounded-nb sm:p-5 ${accentFor(index)}`}
            >
              <ProjectPreview project={project} index={index} />

              <div className="flex flex-1 flex-col">
                <p className="nb-label">{project.tagline}</p>
                <h3 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-3 leading-relaxed">{project.description}</p>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
                  {project.stack.map((tech) => (
                    <li key={tech} className="nb-pill">
                      {tech}
                    </li>
                  ))}
                </ul>

                {project.link && (
                  <div className="mt-auto pt-6">
                    <Link
                      href={project.link.path}
                      className="nb-btn w-full bg-white sm:w-auto"
                    >
                      {project.link.text}
                      <span aria-hidden="true">→</span>
                      <span className="sr-only">: {project.title}</span>
                    </Link>
                  </div>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Projects;

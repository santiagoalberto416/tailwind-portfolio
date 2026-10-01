import { FC } from "react";
import Image from "next/image";
import { education, languages, profile } from "@/data/profile";
import { R2_BUCKET } from "@/utils/resources";
import { SectionsIds } from "@/components/themes/brutal/sectionIds";
import SectionHeading from "@/components/themes/brutal/SectionHeading";

const cardClass = "border-3 border-ink p-6 shadow-nb rounded-nb sm:p-7";

const About: FC = () => (
  <section
    id={SectionsIds.About}
    aria-labelledby="about-title"
    className="scroll-mt-20 py-20 sm:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="01"
        label="About"
        id="about-title"
        title={
          <>
            The short{" "}
            <span className="bg-sun px-2 [box-decoration-break:clone]">
              version.
            </span>
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <p className="reveal text-2xl font-medium leading-snug sm:text-[1.75rem]">
            {profile.summary}
          </p>

          <div className={`reveal bg-lilac ${cardClass}`}>
            <p className="nb-label mb-3">AI-first workflow ✦</p>
            <p className="text-lg leading-relaxed">{profile.aiStatement}</p>
          </div>

          <div className={`reveal flex flex-col gap-5 bg-mint sm:flex-row sm:items-center ${cardClass}`}>
            <Image
              src={R2_BUCKET + profile.profileImages.casual}
              alt={`${profile.shortName} in a casual photo`}
              width={240}
              height={240}
              className="h-28 w-28 shrink-0 -rotate-3 border-3 border-ink object-cover shadow-nb-sm rounded-nb"
            />
            <div>
              <p className="nb-label mb-3">Off the clock</p>
              <p className="text-lg leading-relaxed">{profile.hobbies}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 lg:col-span-5">
          <div className={`reveal bg-sun ${cardClass}`}>
            <p className="nb-label mb-3">Education</p>
            <h3 className="text-2xl font-extrabold leading-tight">
              <a
                href={education.link}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-link decoration-2"
              >
                {education.school}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </h3>
            <ul className="nb-list mt-4 space-y-2 text-lg">
              {education.degrees.map((degree) => (
                <li key={degree}>{degree}</li>
              ))}
            </ul>
          </div>

          <div className={`reveal bg-white ${cardClass}`}>
            <p className="nb-label mb-4">Languages</p>
            <dl className="divide-y-3 divide-ink">
              {languages.map((language) => (
                <div
                  key={language.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0"
                >
                  <dt className="text-2xl font-extrabold">{language.name}</dt>
                  <dd className="font-mono text-sm font-bold">
                    {language.level}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={`reveal bg-bubblegum ${cardClass}`}>
            <p className="nb-label mb-3">Based in</p>
            <p className="text-2xl font-extrabold leading-tight">
              {profile.location}
            </p>
            <p className="mt-2 font-mono text-sm font-bold">
              {profile.timezone} · {profile.availability}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;

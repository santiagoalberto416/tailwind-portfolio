import { CSSProperties, FC } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profile, stats } from "@/data/profile";
import { R2_BUCKET } from "@/utils/resources";
import { SectionsIds } from "@/components/home/sectionIds";
import { isExternal, socialLinks } from "@/components/home/socialLinks";

const focusIcons: Record<string, string> = {
  Angular: "/angular-icon.png",
  React: "/react-icon.svg",
  TypeScript: "/ts-icon.svg",
};

// Staggers the CSS entrance animation of hero elements.
const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

const Hero: FC = () => {
  const [first, ...rest] = profile.role.split(" ");
  const last = rest.pop();
  const middle = rest.join(" ");

  return (
    <section
      id={SectionsIds.Home}
      aria-labelledby="hero-title"
      className="nb-dots relative border-b-3 border-ink"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="min-w-0">
          <p
            className="nb-pop nb-label mb-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border-3 border-ink bg-white px-3 py-2 shadow-nb-sm rounded-nb"
            style={delay(0)}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="nb-pulse inline-block h-2.5 w-2.5 border-2 border-ink bg-mint"
                aria-hidden="true"
              />
              {profile.location}
            </span>
            <span aria-hidden="true">✦</span>
            <span>{profile.timezone}</span>
          </p>

          <h1 id="hero-title" className="font-extrabold tracking-tight">
            <span
              className="nb-pop mb-3 block text-2xl leading-tight sm:text-3xl"
              style={delay(0.05)}
            >
              Hi, I&apos;m {profile.shortName}
              <span aria-hidden="true"> —</span>
            </span>
            <span className="block text-[clamp(3.1rem,13vw,8.25rem)] leading-[0.88] lg:text-[clamp(4rem,8.6vw,8.25rem)]">
              <span className="nb-pop block" style={delay(0.1)}>
                {first}
              </span>
              <span className="nb-pop my-2 block sm:my-3" style={delay(0.18)}>
                <span className="inline-block -rotate-1 whitespace-nowrap border-3 border-ink bg-bubblegum px-3 pb-2 pt-1 shadow-nb sm:px-4 rounded-nb">
                  {middle}
                </span>
              </span>
              <span className="nb-pop block" style={delay(0.26)}>
                {last}
                <span className="text-bubblegum" aria-hidden="true">
                  .
                </span>
              </span>
            </span>
          </h1>

          <p
            className="nb-pop mt-8 max-w-2xl text-xl font-medium leading-snug sm:text-2xl"
            style={delay(0.34)}
          >
            {profile.headline}
          </p>

          <ul
            className="nb-pop mt-6 flex flex-wrap gap-2"
            style={delay(0.4)}
            aria-label="Main focus"
          >
            {profile.focus.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center gap-2 border-3 border-ink bg-white px-3 py-1.5 font-mono text-sm font-bold rounded-nb"
              >
                <Image
                  src={focusIcons[tech]}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
                {tech}
              </li>
            ))}
          </ul>

          <div
            className="nb-pop mt-10 flex flex-wrap items-center gap-4"
            style={delay(0.48)}
          >
            <a href={`#${SectionsIds.Projects}`} className="nb-btn bg-sun">
              See my work <span aria-hidden="true">↓</span>
            </a>
            <a href={`#${SectionsIds.Contact}`} className="nb-btn bg-white">
              Get in touch
            </a>
            <div className="flex gap-3">
              {[socialLinks.linkedin, socialLinks.github, socialLinks.email].map(
                (link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    className="nb-btn nb-icon-btn"
                    {...(isExternal(link.href) && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Photo "polaroid" with stickers slapped on it */}
        <div className="relative mx-auto w-full max-w-[400px] self-start px-3 pb-6 pt-6 sm:px-6 lg:mx-0 lg:mt-10">
          <div
            className="absolute inset-x-6 bottom-8 top-12 rotate-[-5deg] border-3 border-ink bg-mint rounded-nb"
            aria-hidden="true"
          />
          <figure
            className="nb-pop relative rotate-2 border-3 border-ink bg-white p-3 pb-0 shadow-nb-lg rounded-nb"
            style={delay(0.2)}
          >
            <Image
              src={R2_BUCKET + profile.profileImages.hero}
              alt={`Portrait of ${profile.name}`}
              width={640}
              height={760}
              priority
              className="aspect-[4/5] w-full border-3 border-ink object-cover rounded-[6px]"
            />
            <figcaption className="nb-label flex items-center justify-between gap-2 py-3">
              <span>{profile.shortName}</span>
              <span>@{profile.handle}</span>
            </figcaption>
          </figure>

          <p
            className="nb-stamp absolute -left-1 top-1 -rotate-6 border-3 border-ink bg-bubblegum px-3 py-2 font-mono text-sm font-bold uppercase shadow-nb-sm rounded-nb sm:left-0"
            style={delay(0.6)}
          >
            {profile.availability} <span aria-hidden="true">✦</span>
          </p>
          <p
            className="nb-stamp absolute -right-1 top-[38%] flex h-24 w-24 rotate-[8deg] flex-col items-center justify-center border-3 border-ink bg-sun text-center shadow-nb-sm rounded-nb sm:right-0"
            style={delay(0.7)}
          >
            <span className="text-4xl font-extrabold leading-none">
              {stats[0].value}
            </span>
            <span className="nb-label mt-1 !text-[0.7rem]">years</span>
          </p>
          <p
            className="nb-stamp absolute -bottom-3 left-0 -rotate-3 border-3 border-ink bg-lilac px-3 py-2 font-mono text-sm font-bold shadow-nb-sm rounded-nb sm:left-2"
            style={delay(0.8)}
          >
            {profile.focus.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

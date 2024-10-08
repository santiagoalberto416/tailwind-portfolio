import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC } from "react";
import TechCard from "./tech-card";
import Link from "next/link";
import { R2_BUCKET } from "@/utils/resources";
import { SectionsIds } from "@/components/header";

const titleClass = "font-bold";

const techIcons: { description: string | JSX.Element; icon: string }[] = [
  {
    icon: "css3-icon.svg",
    description: (
      <>
        <span className={titleClass}>CSS:</span> I have been working in a few
        projects using plain css and also preprocessors, so I&apos;m familiar
        with the basics of styling
      </>
    ),
  },
  {
    icon: "html-icon.svg",
    description: (
      <>
        <span className={titleClass}>HTML:</span> I couldn&apos;t call me
        developer if I didn&apos;t know html, JK. I&apos;m familiar with plain
        html but I prefer to use it in jsx or tsx depending of the project.
      </>
    ),
  },
  {
    icon: "js-icon.svg",
    description: (
      <>
        <span className={titleClass}>JS:</span> I have been using JavaScript for
        around 3 years mainly for front end but I also used for other projects.
        For example a cli and a library for bank operations.
      </>
    ),
  },
  {
    icon: "react-icon.svg",
    description: (
      <>
        <span className={titleClass}>React:</span> I&apos;ve been using react
        for 3 years, using different frameworks/tools like Redux, Next.js using
        JS and Typescript
      </>
    ),
  },
  {
    icon: "angular-icon.png",
    description: (
      <>
        <span className={titleClass}>Angular:</span> I have used Angular in my
        last project, I&apos;m familiar with the basics and I&apos;m able to
        learn more about it.
      </>
    ),
  },
  {
    icon: "sass-icon.svg",
    description: (
      <>
        <span className={titleClass}>Sass:</span> is the most mature, stable,
        and powerful professional grade CSS extension language in the world.
      </>
    ),
  },
  {
    icon: "ts-icon.svg",
    description: (
      <>
        <span className={titleClass}>TypeScript:</span> is a free and
        open-source high-level programming language developed by Microsoft that
        adds static typing with optional type annotations to JavaScript.
      </>
    ),
  },
  {
    icon: "tailwind.svg",
    description: (
      <>
        <span className={titleClass}>Tailwind:</span> is a utility-first CSS
        framework for rapidly building custom designs. It&apos;s a great tool
        for building responsive designs.
      </>
    ),
  },
];

const Content: FC<{}> = () => {
  return (
    <div
      id={SectionsIds.Home}
      className="flex text-white flex-col justify-center lg:pt-52"
    >
      <div className="container mx-auto flex justify-center">
        <div className=" flex lg:flex-row flex-col-reverse justify-center items-center lg:mt-0 mt-20 lg:gap-24">
          <div className="flex content-center items-center max-w-sm">
            <div className="flex-direction-column">
              <h1 className="text-4xl mb-2 lg:text-left text-center">
                Front-End React Developer
              </h1>
              <p className="lg:text-left text-center">
                Hi I&apos;m Santiago Kirk, A passionate Front-end React
                Developer based in Tijuana, Mexico.
              </p>

              <div className="pt-6 w-full flex lg:justify-normal justify-center">
                <Link
                  href="https://www.linkedin.com/in/santiago-alberto-kirk-cabrera-3442a5124/"
                  className="mr-4"
                  aria-label="See my linkedin profile"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size="2x"
                    className="contact-me-icon"
                  />
                </Link>

                <Link
                  href="https://github.com/santiagoalberto416"
                  aria-label="See my github profile"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    size="2x"
                    className="contact-me-icon"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="w-100 flex justify-center lg:mb-0 mb-4">
            <Image
              className="rounded-full"
              src={R2_BUCKET + "/profile-pic-1.jpg"}
              priority={true}
              width={300}
              height={300}
              alt="profile-pic"
            />
          </div>
        </div>
      </div>

      <div className="lg:pt-14 pt-10 flex flex-col text-center items-center w-full">
        <h1 className="text-xl pt-6 text-center ">Tech Stack</h1>

        <div className="border mt-2 w-5 border-white-500" />

        {/* Mobile View*/}
        <div className="flex lg:hidden flex-wrap justify-center gap-4 pt-4 px-8">
          {techIcons.map((icon) => (
            <div
              key={icon.icon}
              className="w-16 h-16 flex bg-white rounded-full items-center justify-center"
            >
              <Image
                alt="tech"
                className=""
                src={icon.icon}
                width={40}
                height={40}
              />
            </div>
          ))}
        </div>
        {/* Desktop View */}
        <div className="lg:flex hidden w-full justify-center  mt-4 lg:mb-14 tech-stack-container">
          <div className="flex max-w-x-lg pb-5 pl-4 pt-2 overflow-x-auto">
            {techIcons.map((icon) => (
              <TechCard
                key={icon.icon}
                icon={icon.icon}
                description={icon.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;

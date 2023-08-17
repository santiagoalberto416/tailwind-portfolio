import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC } from "react";
import TechCard from "./tech-card";
import Link from "next/link";

const techIcons: { description: string | JSX.Element; icon: string }[] = [
  {
    icon: "css3-icon.svg",
    description: (
      <>
        <strong>{"CSS:"}</strong> I have been working in a few projects using
        plain css and also preprocessors, so I&apos;m familiar with the basics
        of styling
      </>
    ),
  },
  {
    icon: "html-icon.svg",
    description: (
      <>
        <strong>{"HTML:"}</strong> I couldn&apos;t call me developer if I
        didn&apos;t know html, JK. I&apos;m familiar with plain html but I
        prefer to use it in jsx or tsx depending of the project.
      </>
    ),
  },
  {
    icon: "js-icon.svg",
    description: (
      <>
        <strong>{"(JS:)"}</strong> I have been using JavaScript for arround 3
        years mainly for front end but I also used for other projects. For
        example a cli and a library for bank operations.
      </>
    ),
  },
  {
    icon: "react-icon.svg",
    description: (
      <>
        <strong>React:</strong> I&apos;ve been using react for 3 years, using
        different frameworks/tools like Redux, Next.js using JS and Typescript
      </>
    ),
  },
  {
    icon: "sass-icon.svg",
    description: (
      <>
        <strong>Sass</strong> is the most mature, stable, and powerful
        professional grade CSS extension language in the world.
      </>
    ),
  },
  {
    icon: "ts-icon.svg",
    description: (
      <>
        <strong>TypeScript</strong> is a free and open-source high-level
        programming language developed by Microsoft that adds static typing with
        optional type annotations to JavaScript.
      </>
    ),
  },
];

const Content: FC<{}> = () => {
  return (
    <div className="hidden-section flex flex-col justify-center lg:pt-14 pt-10 pb-24 h-screen">
      <div className="container mx-auto flex justify-center">
        <div className="max-w-screen-md flex lg:flex-row flex-col-reverse lg:gap-40">
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
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </Link>

                <Link
                  href="https://github.com/santiagoalberto416"
                  aria-label="See my github profile"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </Link>
              </div>
            </div>
          </div>
          <div className="w-100 flex justify-center lg:mb-0 mb-4">
            <Image
              className="rounded-full border-black border-4"
              src="/profile-picture.jpg"
              width={300}
              height={300}
              unoptimized
              alt="profile-pic"
            />
          </div>
        </div>
      </div>

      <div className="container lg:pt-14 pt-10 mx-auto flex flex-col justify-center items-center">
        <h1 className="text-xl pt-6 text-center ">Tech Stack</h1>
        <div className="border mt-2 w-5 border-gray-500" />
        <div className="flex justify-center mt-4 lg:mb-14 mb-10 gap-3 tech-stack-container">
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
  );
};

export default Content;

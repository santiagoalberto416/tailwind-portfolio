import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC } from "react";
import TechCard from "./tech-card";
import Link from "next/link";

const techIcons = [
  {
    icon: "css3-icon.svg",
    description: (
      <>
        <strong>{"(CSS)"}</strong> is a style sheet language used for describing
        the presentation of a document written in a markup language such as HTML
        or XML
      </>
    ),
  },
  {
    icon: "html-icon.svg",
    description: (
      <>
        <html>
          Hypertext Markup Language <strong>{"(HTML)"}</strong>, a standardized
          system for tagging text files to achieve font, color, graphic, and
          hyperlink effects on World Wide Web pages.
        </html>
      </>
    ),
  },
  {
    icon: "js-icon.svg",
    description: (
      <>
        JavaScript <strong>{"(JS)"}</strong> is a dynamic programming language
        that&apos;s used for web development, in web applications, for game
        development, and lots more.
      </>
    ),
  },
  {
    icon: "react-icon.svg",
    description: (
      <>
        More commonly known as <strong>React</strong>, is a free, open-source
        JavaScript library. It works best to build user interfaces by combining
        sections of code
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
    <div className="flex flex-col justify-center lg:pt-14 pt-10 bg-gray-100">
      <div className="container mx-auto flex justify-center">
        <div className="max-w-screen-md flex lg:flex-row flex-col-reverse lg:gap-40">
          <div className="flex content-center items-center max-w-sm">
            <div className="flex-direction-column">
              <h1 className="text-4xl mb-2 lg:text-left text-center">
                Front-End React Developer
              </h1>
              <p className="lg:text-left text-center">
                {" "}
                Hi I{"'"}m Santiago Kirk, A passionate Front-end React Developer
                based in Tijuana, Mexico.{" "}
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
            <TechCard key={icon.icon} {...icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;

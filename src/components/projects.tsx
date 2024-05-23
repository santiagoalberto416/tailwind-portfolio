import { FC } from "react";
import { R2_BUCKET } from "@/utils/resources";
import Link from "next/link";
import { SectionsIds } from "@/components/header";

type Project = {
  title: string;
  description: string;
  image: string;
  link: {
    path: string;
    text: string;
  };
};

const CurrentProjects: Project[] = [
  {
    title: "Dual Memory Game",
    description:
      "My girlfriend and I made a memory game together. My girlfriend is a psychologist and worked with" +
      " kids with specials needs, the game was designed to help them improve their memory and also do more" +
      " activities with at the same time. From the tecnical standpoint it's a simple game made with React" +
      " and Typescript. is as simpler as it can because it was designed to be used by kids",
    image: "memory-dual-game-screenshoot.png",
    link: {
      path: "/cumanes-game",
      text: "Play Game",
    },
  },
  {
    title: "Memory Card Game",
    description:
      "This game has a similar history as the previous one, but for some reason kid prefer this one " +
      "it also involves memory but at the difference of the previous one, this one is about making pairs " +
      "it's also made with React and Typescript, but it's a little more complex than the previous one.",
    image: "memory-game-screenshoot.jpeg",
    link: {
      path: "/card-game",
      text: "Play Game",
    },
  },
];

const Project: FC<Project> = ({ title, description, image, link }) => (
  <div className="project-card flex lg:flex-row flex-col-reverse  p-4 rounded gap-5 items-center lg:mx-auto mx-3 ">
    <div className="flex flex-col gap-4 text-white text-section">
      <h2 className="text-2xl">{title}</h2>
      <p>{description}</p>
      <div className="flex items-end grow">
        <Link href={link.path}>
          <span className="border py-2 px-3 text-white rounded-2xl h-min">
            {link.text}
          </span>
        </Link>
      </div>
    </div>
    <img className="rounded" src={R2_BUCKET + "/" + image} alt={title} />
  </div>
);

const Projects: FC<{ projects?: Project[] }> = ({
  projects = CurrentProjects,
}) => (
  <div id={SectionsIds.Projects}>
    <div className="projects container mx-auto pb-4 flex flex-col gap-4">
      <h1 className="text-4xl text-white text-center mb-10">Projects</h1>
      {projects.map((project) => (
        <Project {...project} key={project.title} />
      ))}
    </div>
  </div>
);

export default Projects;

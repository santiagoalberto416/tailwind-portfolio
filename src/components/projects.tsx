import React, { FC } from "react";
import { R2_BUCKET } from "@/utils/resources";
import Link from "next/link";
import { SectionsIds } from "@/components/header";
import Image from "next/image";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useState } from "react";

function Example() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

type Project = {
  title: string;
  description: string;
  image: string;
  onClickImage?: () => void;
  link: {
    path: string;
    text: string;
  };
};

const description =
  "Here are some of my personal projects I've worked on recently.";

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

const Project: FC<Project> = ({
  title,
  description,
  image,
  link,
  onClickImage,
}) => (
  <div className="project-card shadow-lg flex lg:flex-row flex-col-reverse  p-4 rounded gap-5 items-center lg:mx-auto mx-3 ">
    <div className="flex flex-col gap-4 text-white text-section">
      <h2 className="text-2xl">{title}</h2>
      <p>{description}</p>
      <div className="flex w-full items-center grow min-h-10">
        <Link className="lg:w-auto w-full flex" href={link.path}>
          <span className="lg:w-auto lg:text-left w-full btn-card text-center py-2 px-3 text-white rounded h-min">
            {link.text}
          </span>
        </Link>
      </div>
    </div>

    <div className="lg:w-auto w-full bg-gray-900 rounded flex justify-center">
      <div
        className="image-section relative "
        style={{ minWidth: "240px", maxWidth: "auto" }}
        onClick={onClickImage}
      >
        <Image
          className="rounded screenshot"
          width="240"
          height="204"
          src={R2_BUCKET + "/" + image}
          alt={title}
        />
      </div>
    </div>
  </div>
);

const Projects: FC<{ projects?: Project[] }> = ({
  projects = CurrentProjects,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  return (
    <div className="pt-20" id={SectionsIds.Projects}>
      <div className="projects container mx-auto pb-4 flex flex-col gap-4 px-2">
        <h1 className="text-4xl text-white text-center mb-10">Projects</h1>
        <Transition
          show={isOpen}
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-300 ease-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-index-9999 max-h-screen"
          >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              {/* The actual dialog panel  */}
              <DialogPanel className="max-w-screen-lg h-auto flex justify-center items-center max-h-screen space-y-4 bg-black lg:p-12 p-2">
                <Image
                  width="200"
                  height="200"
                  src={R2_BUCKET + "/" + selectedImage}
                  className=""
                  objectFit="contain"
                  alt="Selected"
                />
              </DialogPanel>
            </div>
          </Dialog>
        </Transition>
        <p className="max-w-3xl text-center mx-auto text-white mb-10">
          {description}
        </p>
        {projects.map((project) => (
          <Project
            {...project}
            key={project.title}
            onClickImage={() => {
              setIsOpen(true);
              setSelectedImage(project.image);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;

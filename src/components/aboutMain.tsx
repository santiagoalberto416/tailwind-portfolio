import { FC } from "react";
import Image from "next/image";
import { R2_BUCKET } from "@/utils/resources";

const AboutMain: FC<{}> = () => {
  return (
    <div className="transform duration-500 hover:scale-105 lg:mx-0 mx-3 shadow-lg">
      <div className="hero-2 w-auto rounded-lg bg-white shadow-lg overflow-clip">
        <div className="flex items-start lg:flex-row flex-col">
          <div className="card-content">
            <h1 className="text-2xl lg:mt-0 lg:text-left text-center mb-2">
              About me
            </h1>
            <p className="lg:w-80 flex align-bottom text-left">
              Santiago Kirk, a front-end software developer based in Tijuana,
              Mexico, brings expertise in React, TypeScript, and CSS frameworks
              like Tailwind and Bootstrap to create engaging web applications.
            </p>
            <p className="lg:w-80 flex align-bottom text-left">
              With a background in mobile development in Java and Kotlin, as a
              former tech lead, I&apos;ve been dedicated to delivering
              exceptional user experiences and providing technical leadership
              for project success.
            </p>
          </div>

          <Image
            className="lg:block hidden"
            src={R2_BUCKET + "/profile-pic-3.jpg"}
            width={220}
            height={386}
            alt="Santiago Kirk profile photo"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMain;

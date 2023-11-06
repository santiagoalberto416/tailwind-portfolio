import { FC } from "react";
import Image from "next/image";

const Hero2: FC<{}> = () => {
  return (
    <div className="hidden-section container mx-auto h-screen flex justify-center items-center ">
      <div className=" w-3/4 p-7 rounded-sm border bg-white shadow-lg">
        <div className="flex lg:flex-row flex-col-reverse items-center">
          <div className="pr-7">
            <h1 className="text-2xl lg:mt-0 mt-4 lg:text-left text-center mb-2">
              About Me
            </h1>
            <p className="flex lg:text-left text-center">
              Santiago Kirk, a front-end software developer based in Tijuana,
              Mexico, brings expertise in React, TypeScript, and CSS frameworks
              like Tailwind and Bootstrap to create engaging web applications.
              With a background in mobile development in Java and Kotlin, as a
              former tech lead, I&apos;ve been dedicated to delivering
              exceptional user experiences and providing technical leadership
              for project success.
            </p>
          </div>
          <div
            style={{ minWidth: "200px" }}
            className="d-flex items-center h-full"
          >
            <Image
              className="border-4"
              src="/profile-picture.jpg"
              width={300}
              height={300}
              unoptimized
              alt="profile-pic"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;

import { FC } from "react";
import Image from "next/image";
import { R2_BUCKET } from "@/utils/resources";

const Hero2: FC<{}> = () => {
  return (
    <div className="hero-2">
      <div className="w-auto p-7 rounded-lg border bg-white shadow-lg">
        <div className="flex items-start lg:flex-row">
          <div className="pr-7">
            <h1 className="text-2xl lg:mt-0 mt-4 lg:text-left text-center mb-2">
              About Me
            </h1>
            <p className="w-80 flex align-bottom lg:text-left text-center">
              Santiago Kirk, a front-end software developer based in Tijuana,
              Mexico, brings expertise in React, TypeScript, and CSS frameworks
              like Tailwind and Bootstrap to create engaging web applications.
            </p>
            <p className="w-80 flex align-bottom lg:text-left text-center">
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
              className="border-4 rounded-lg"
              src={R2_BUCKET + "/profile-pic-2.png"}
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

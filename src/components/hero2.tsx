import { FC } from "react";
import Image from "next/image";
import { R2_BUCKET } from "@/utils/resources";

const Hero2: FC<{}> = () => {
  return (
    <div className="transform duration-500 hover:scale-105 lg:mx-0 mx-3">
      <div className="hero-2 w-auto p-7 rounded-lg border bg-white shadow-lg">
        <div className="flex lg:items-start items-center lg:flex-row flex-col">
          <div className="pr-7">
            <h1 className="text-2xl lg:mt-0 lg:text-left text-center mb-2">
              Hobbies
            </h1>
            <p className="lg:w-80 flex align-bottom text-left">
              I like coffee, video games, and coding. I&apos;m a big fan of
              learning new things and I&apos;m always looking for new
              opportunities to grow.
            </p>
            <p className="lg:w-80 flex align-bottom  text-left">
              I like challenges and I&apos;m always looking for ways to improve
              my skills and knowledge. And also improve the things that I&apos;m
              part of
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

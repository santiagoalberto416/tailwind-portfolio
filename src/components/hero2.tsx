import { FC } from "react";
import Image from "next/image";

const Hero2: FC<{}> = () => {
  return (
    <div className="hidden-section container mx-auto h-screen flex justify-center items-center ">
      <div className=" w-3/4 p-7 rounded-sm border">
        <div className="flex lg:flex-row flex-col-reverse items-center">
          <div className="pr-7">
            <h1 className="text-2xl mb-2">About Me</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu
              urna vitae lectus tempus commodo. Quisque at ipsum eu felis
              porttitor tristique. Curabitur eu erat consectetur sem sodales
              pellentesque at nec elit. Aenean dictum tempus volutpat. Curabitur
              ultricies dapibus convallis. Donec sit amet nisl nec risus mollis
              tincidunt non tempus lectus. Phasellus viverra non tortor eget
              laoreet. Maecenas congue consectetur felis.
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

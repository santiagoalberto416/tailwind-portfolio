import Image from "next/image";
import { R2_BUCKET } from "@/utils/resources";
import { FC } from "react";
import { ReactElement } from "react";

type JobCardProps = {
  title: string;
  description: ReactElement;
  image: string;
  icon: string;
};

const JobCard: FC<JobCardProps> = (props) => {
  return (
    <div className="transform duration-500 hover:scale-105 job-card rounded-lg bg-white shadow-lg overflow-clip ">
      <div className="px-7 pt-7">
        <h1 className="text-2xl lg:mt-0 mt-4 lg:text-left text-center mb-2">
          {props.title}
        </h1>
        <p>{props.description}</p>
      </div>
      <div
        className="job-image-container flex justify-center items-center"
        style={{
          backgroundImage: `url("${R2_BUCKET}${props.image}")`,
          backgroundSize: "cover",
        }}
      >
        <div className="job-icon-container">
          <Image
            className="image-shadow"
            src={R2_BUCKET + props.icon}
            width={250}
            height={36}
            unoptimized
            alt="Current Job"
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;

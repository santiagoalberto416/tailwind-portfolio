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
    <div className="transform duration-500 hover:scale-105 job-card rounded-lg shadow-lg overflow-clip ">
      <div className="card-content">
        <h1 className="text-2xl lg:text-left text-center mb-2">
          {props.title}
        </h1>
        <p className="mb-0">{props.description}</p>
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

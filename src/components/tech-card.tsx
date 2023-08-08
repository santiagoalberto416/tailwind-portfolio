import { FC } from "react";
import Image from "next/image";

const TechCard: FC<{ icon: string }> = ({ icon }) => {
  return (
    <div className="hover:shadow-lg shadow-md p-4 rounded-full bg-white ">
      <Image alt="tech" className="" src={icon} width={48} height={48} />
    </div>
  );
};

export default TechCard;

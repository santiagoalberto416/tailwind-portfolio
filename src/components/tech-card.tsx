import { FC } from "react";
import Image from "next/image";

const TechCard: FC<{ icon: string; description: string }> = ({
  icon,
  description,
}) => {
  return (
    <div className="tech-item">
      <div className="hover:shadow-lg shadow-md p-4 rounded-full bg-white growing-tech-item">
        <Image alt="tech" className="" src={icon} width={48} height={48} />
      </div>
      <div className="absolute left-0 w-full flex justify-center description pointer-events-none">
        <div className="w-fit bg-white max-w-sm p-4 shadow-md tech-description font-thin">
          {description}
        </div>
      </div>
    </div>
  );
};

export default TechCard;

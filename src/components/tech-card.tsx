import { FC } from "react";
import Image from "next/image";

const TechCard: FC<{ icon: string; description: string | React.ReactNode }> = ({
  icon,
  description,
}) => {
  return (
    <div className="tech-item mx-2 text-black">
      <div className="hover:shadow-lg shadow-md p-4 rounded-full bg-white growing-tech-item">
        <Image alt={icon.replace('-icon.svg', '').replace('-', ' ').toUpperCase() + ' logo'} className="" src={icon} width={48} height={48} />
      </div>
      <div className="absolute left-0 w-full flex justify-center description pointer-events-none z-10">
        <div className="w-fit bg-white max-w-sm p-4 shadow-md tech-description font-thin rounded-xl">
          {description}
        </div>
      </div>
    </div>
  );
};

export default TechCard;

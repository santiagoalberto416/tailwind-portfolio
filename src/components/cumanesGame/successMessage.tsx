import React from "react";
import { STRINGS } from "@/constants/cumanes-game";

const IDIOM = "spanish";
const strings = STRINGS[IDIOM];

interface SuccessMessageProps {
  levelScore: { time: string; currentLevel: number };
  nextLevel: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  levelScore,
  nextLevel,
}) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50" />
      <div className="success-message flex flex-col items-center justify-center">
        <h1 className="text-white">{strings.CONGRATULATIONS}</h1>
        <p className="text-white">{strings.YOU_HAVE_COMPLETED}</p>
        <p className="text-white">
          {strings.TIME}: {levelScore.time}
        </p>
        <button
          onClick={nextLevel}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded flex w-fit h-fit"
        >
          {strings.PLAY_AGAIN}
        </button>
      </div>
    </>
  );
};

export default SuccessMessage;

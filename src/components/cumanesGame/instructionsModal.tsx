import React from "react";
import { STRINGS } from "@/constants/cumanes-game";

const IDIOM = "spanish";
const strings = STRINGS[IDIOM];

interface InstructionsModalProps {
  showInstructions: boolean;
  closingInstructions: boolean;
  handleClickInstructions: (event: any) => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({
  showInstructions,
  closingInstructions,
  handleClickInstructions,
}) => {
  return (
    showInstructions && (
      <div
        className={`flex instruction-modal`} // add the class to animate the modal
        onClick={handleClickInstructions}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className={`flex flex-col bg-white rounded p-5 text-left  ${
            closingInstructions && "fade-out"
          } `}
        >
          <div className="flex w-full items-center border-b-2 py-2">
            <div className="text-2xl flex-1 ">{strings.INSTRUCTIONS.TITLE}</div>
            <div
              onClick={handleClickInstructions}
              className="close bg-blue-500 w-8 h-8 text-white text-center flex items-center justify-center rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="white"
              >
                <path d="M13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12z"></path>
              </svg>
            </div>
          </div>
          {/* instructions with caret*/}
          <div className="pt-2">
            <div className="text-xl text-left">
              &#x2022; {strings.INSTRUCTIONS.CLICK_INSTRUCTIONS}
            </div>
            <div className="text-xl text-left text-gray-400">
              {strings.INSTRUCTIONS.EXAMPLE}
            </div>
            <div className="text-xl text-left">
              &#x2022; {strings.INSTRUCTIONS.CLICK_NUMBER_ONE}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default InstructionsModal;

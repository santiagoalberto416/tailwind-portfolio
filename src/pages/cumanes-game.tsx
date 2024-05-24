import React, { useEffect, useRef, useState } from "react";
import { STRINGS } from "@/constants/cumanes-game";
import useTimer from "@/utils/hooks/useTimer";
import SuccessMessage from "@/components/cumanesGame/successMessage";
import InstructionsModal from "@/components/cumanesGame/instructionsModal";
import GameCard from "@/components/cumanesGame/gameCard";
import SEO from "@/components/SEO";

const IDIOM = "spanish";

type GameCard = {
  id: number;
  color: "red" | "blue";
  number: number;
  position: string;
  padding?: string;
};

/**
 * The game is based on the "Cumanes" test. This test is designed to help kids perform multiple tasks simultaneously.
 * The numbers are placed in random positions on the grid. The kids have to click the numbers in order, but with alternating colors.
 * They have to click a red number and then a blue number.
 *
 * Example of the game:
 * - Right order: 1(red), 2(blue), 3(red), 4(blue), 5(red), 6(blue), 7(red), 8(blue), 9(red), 10(blue)
 * - Wrong order: 1(red), 2(red) (wrong color)
 *
 * To generate the game cards, we need to generate random colors and random numbers on the grid.
 *
 * Conditions:
 * - The cards are unique by color + number. Numbers can be repeated but not in the same color.
 * - The first card is always 1.
 * - The colors are random.
 * - The numbers are random.
 * - The position is random (top, bottom, left, right, middle).
 * - The padding is a composed random ex: "pl-(1-4) pr-(1-4)".
 *
 * Additional rules:
 * - The game ends when all cards have been clicked in the correct order.
 * - If a card is clicked out of order, the game resets.
 */
const generateGameCards = (count: number): GameCard[] => {
  const cards: GameCard[] = [];
  const usedNumbersRed: number[] = [];
  const usedNumbersBlue: number[] = [];
  let color: "red" | "blue" = "red";

  for (let i = 0; i < count * 2; i++) {
    let number;

    // Ensure the first card is always 1
    if (i === 0) {
      number = 1;
    } else {
      // Generate a unique random number
      do {
        number = Math.floor(Math.random() * count) + 1;
      } while (
        (color === "red" && usedNumbersRed.includes(number)) ||
        (color === "blue" && usedNumbersBlue.includes(number))
      );
    }

    // Add the number to the usedNumbers array
    if (color === "red") {
      usedNumbersRed.push(number);
    } else {
      usedNumbersBlue.push(number);
    }

    // generate a random position for the card options: top, bottom, left, right, middle
    const position: string = ["top", "bottom", "left", "right", "middle"][
      Math.floor(Math.random() * 5)
    ];

    // generate random padding className
    const paddingLeft: string = ["pl-1", "pl-2", "pl-3", "pl-4"][
      Math.floor(Math.random() * 4)
    ];

    const paddingRight: string = ["pr-1", "pr-2", "pr-3", "pr-4"][
      Math.floor(Math.random() * 4)
    ];
    // Create the card
    const card: GameCard = {
      id: i,
      color: color,
      number: number,
      position: position,
      padding: `${paddingLeft} ${paddingRight}`,
    };

    // Add the card to the cards array
    cards.push(card);

    // Alternate the color for the next card
    color = color === "red" ? "blue" : "red";
  }

  return cards;
};

const INITIAL_CARDS = 4;

const CumanesGame = () => {
  const [cards, setCards] = useState<GameCard[]>([]);
  // all this will be the cards already touched in the right order
  const [touchedCards, setTouchedCards] = useState<GameCard[]>([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showError, setShowError] = useState(false);
  const [biggestNumber, setBiggestNumber] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [closingInstructions, setClosingInstructions] = useState(false);
  const [totalCards, setTotalCards] = useState(INITIAL_CARDS);
  const [level, setLevel] = useState(1);
  const [time, resetTimer] = useTimer();
  const [levelScore, setLevelScore] = useState({
    time: "0:00",
    currentLevel: 1,
  });
  const strings = STRINGS[IDIOM];

  const onError = () => {
    setTouchedCards([]);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 1000);
  };

  const onCorrect = () => {
    setShowCorrect(true);
    setTimeout(() => {
      setShowCorrect(false);
    }, 1000);
  };

  const handleClickInstructions = (event: any) => {
    event.stopPropagation();
    if (closingInstructions) return;
    const isClosing = showInstructions && !closingInstructions;
    if (isClosing) {
      setClosingInstructions(true);
      setTimeout(() => {
        setShowInstructions(false);
        setClosingInstructions(false);
      }, 500);
      return;
    }
    setShowInstructions(!showInstructions);
  };

  const nextLevel = () => {
    const newTotalCards = totalCards + 2;
    setLevel((curr) => curr + 1);
    resetTimer();
    setCards(generateGameCards(newTotalCards));
    setTotalCards(newTotalCards);
    setTouchedCards([]);
    setShowError(false);
    setShowCorrect(false);
  };

  const setScore = (touchedCards: GameCard[]) => {
    if (touchedCards.length === totalCards) {
      setLevelScore({
        time: time || "0:00",
        currentLevel: level,
      });
    }
  };

  // this is the handler for the click event in the cards
  const handleCardClick = (card: GameCard) => {
    // if the card is the first card, we add it to the touched cards
    if (card.number === 1 && touchedCards.length === 1) {
      // if the card is the first card and the second card is already touched, we reset the touched cards
      onError();
      setTouchedCards([]);
    } else if (card.number === 1) {
      setTouchedCards([card]);
    } else {
      // if the card is not the first card, we check if the card is the next in the order but we need to check the color too
      const lastCard = touchedCards[touchedCards.length - 1];
      const lastNumber = lastCard?.number;
      const lastColor = lastCard?.color;
      if (card.number === lastNumber + 1 && card.color !== lastColor) {
        // if the card is the next in the order, we add it to the touched cards
        const newTouchedCards = [...touchedCards, card];
        setTouchedCards(newTouchedCards);
        setScore(newTouchedCards);
        onCorrect();
      } else {
        // if the card is not the next in the order, we reset the touched cards
        onError();
      }
    }
  };

  useEffect(() => {
    // get the biggest number in the cards
    const numbers = touchedCards.map((card) => card.number);
    if (numbers.length === 0) return setBiggestNumber(0);
    const biggest = Math.max(...numbers);
    if (biggest <= biggestNumber) return;
    setBiggestNumber(biggest);
  }, [touchedCards]);

  useEffect(() => {
    setCards(generateGameCards(totalCards));
  }, []);

  return (
    <>
      <SEO
        pageTitle={strings.MEMORY_DUAL}
        pageDescription={strings.IMPROVE_YOUR_MEMORY}
      />
      <div className="dual-control-enhancer flex items-center flex-col pt-6 px-4 ">
        <div className="flex items-center gap-5">
          <div className="flex flex-1 flex-col justify-start text-left">
            <h1 className="text-2xl">{strings.MEMORY_DUAL}</h1>
            <p>{strings.IMPROVE_YOUR_MEMORY}</p>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded flex w-fit h-fit"
            onClick={handleClickInstructions}
          >
            <span className="mr-2">{strings.INSTRUCTIONS.TITLE}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="white"
            >
              <path d="M13 7.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-3 3.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.25h.75a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h.75V12h-.75a.75.75 0 0 1-.75-.75Z"></path>
              <path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12Z"></path>
            </svg>
          </button>
        </div>
        {showInstructions && (
          <InstructionsModal
            showInstructions={showInstructions}
            closingInstructions={closingInstructions}
            handleClickInstructions={handleClickInstructions}
          />
        )}
        {showError && (
          <div className="error-message text-white p-2 rounded">
            {strings.TRY_AGAIN}
          </div>
        )}

        <div
          className={`game-grid ${showError ? "shake" : ""} ${
            showCorrect ? "glow" : ""
          } p-4 border-2`}
        >
          {touchedCards.length === totalCards && (
            <SuccessMessage levelScore={levelScore} nextLevel={nextLevel} />
          )}
          <div className="w-full flex justify-center gap-5 bg-gray-500 rounded col-span-5">
            <div className="text-lg text-white">
              {strings.TIME}: {time as string}
            </div>
            <div className="text-lg text-white">
              {strings.CURRENT_LEVEL}: {level}
            </div>
          </div>

          {cards.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              handleCardClick={handleCardClick}
              isCounted={touchedCards.includes(card)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CumanesGame;

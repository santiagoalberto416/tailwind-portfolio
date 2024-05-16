import { useEffect, useState } from "react";

type GameCard = {
  id: number;
  color: "red" | "blue";
  number: number;
  position: string;
  padding?: string;
};

// the game is based in the test "Cumanes" this test is to help kids to do multiple task at the same time
// the numbers are in random positions in the grid, the kids have to click the numbers in order
// but interpolating the colors, so they have to click a red number and then a blue number
// example of the game:
// right order : 1(red), 2(blue), 3(red), 4(blue), 5(red), 6(blue), 7(red), 8(blue), 9(red), 10(blue)
// wrong order : 1(red), 2(red) (wrong color)
// so tu generate the game cards we need to generate with random colors and random numbers in the grid
// conditions:
// - the cards are unique by color + number, and numbers can be repeated but not in the same color
// - the first card is always 1
// - the colors are random
// - the numbers are random
// - the position is random (top, bottom, left, right, middle)
// - the padding is a composed random ex: "pl-(1-4) pr-(1-4)"
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

const CumanesGame = () => {
  const [cards, setCards] = useState<GameCard[]>([]);
  // all this will be the cards already touched in the right order
  const [touchedCards, setTouchedCards] = useState<GameCard[]>([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showError, setShowError] = useState(false);
  const [biggestNumber, setBiggestNumber] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

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

  const handleClickInstructions = () => {
    setShowInstructions(!showInstructions);
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
        setTouchedCards([...touchedCards, card]);
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
    setCards(generateGameCards(25));
  }, []);

  return (
    <div className="dual-control-enhancer flex items-center flex-col pt-6">
      <div className="flex items-center gap-5">
        <div className="flex flex-1 flex-col justify-start text-left">
          <h1 className="text-2xl">Memoria dual</h1>
          <p>Mejora tu memoria y tu habilidad para hacer dos tareas a la vez</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded flex w-fit h-fit"
          onClick={handleClickInstructions}
        >
          <span className="mr-2">Instrucciones</span>
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
        <div className="instruction-modal flex justify-center items-center">
          <div className="flex flex-col items-center bg-white rounded p-5">
            <div className="flex w-full items-center border-b-2 py-2">
              <div className="text-2xl flex-1 ">Instrucciones</div>
              <div
                onClick={handleClickInstructions}
                className="close bg-blue-500 w-8 h-8 text-white text-center flex items-center justify-center rounded-full"
              >
                X
              </div>
            </div>
            <div className="text-xl">Ordena los números</div>
            <div className="text-xl">Haz clic en los números en orden</div>
            <div className="text-xl">Haz clic en el número 1 para comenzar</div>
          </div>
        </div>
      )}

      <div
        className={`game-grid ${showError ? "shake" : ""} ${
          showCorrect ? "glow" : ""
        } p-4 border-2`}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`game-card-container ${card.padding} position-${card.position}`}
          >
            <div
              className={`game-card ${card.color} `}
              onClick={() => {
                handleCardClick(card);
              }}
            >
              {card.number}
            </div>
          </div>
        ))}
        {/* display temporally the touched cards */}
      </div>
      <div className="touched-cards flex flex-col justify-center w-full text-center">
        {showCorrect && <div className="correct">Correcto!</div>}
        <div className="flex justify-center w-full">
          {touchedCards.map((card) => (
            <div
              key={card.id}
              className={`game-card ${card.color} game-card-counted`}
            >
              {card.number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CumanesGame;

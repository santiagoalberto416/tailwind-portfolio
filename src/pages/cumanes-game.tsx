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

  useEffect(() => {
    setCards(generateGameCards(25));
  }, []);

  return (
    <div className="dual-control-enhancer pt-6">
      <h1 className="text-2xl">Memoria dual</h1>
      <p>Mejora tu memoria y tu habilidad para hacer dos tareas a la vez</p>

      <div className="game-grid p-4 border-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`game-card-container ${card.padding} position-${card.position}`}
          >
            <div className={`game-card ${card.color} `}>{card.number}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CumanesGame;

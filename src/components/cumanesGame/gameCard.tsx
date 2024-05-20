import React from "react";

interface GameCardProps {
  card: {
    id: number;
    color: "red" | "blue";
    number: number;
    position: string;
    padding?: string;
  };
  handleCardClick: (card: any) => void;
  isCounted: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  card,
  handleCardClick,
  isCounted,
}) => {
  return (
    <div
      key={card.id}
      className={`game-card-container lg:${card.padding} position-${card.position}`}
    >
      <div
        className={`game-card ${card.color} ${
          isCounted ? "game-card-counted" : ""
        }`}
        onClick={() => {
          handleCardClick(card);
        }}
      >
        {card.number}
      </div>
    </div>
  );
};

export default GameCard;

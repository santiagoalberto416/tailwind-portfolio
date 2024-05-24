import React, { FC, useEffect, useState } from "react";
import Confetti from "react-confetti";
import SEO from "@/components/SEO";

const levels = [3, 6, 9, 12, 15, 18, 21];

const CardGame: FC<{}> = () => {
  const [cards, setCards] = useState<{ number: number; isFlipped: boolean }[]>(
    []
  );
  const [barCard, setBadCard] = useState(-1);
  const [flippedCards, setFlippedCards] = useState<any>([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [shuffling, setShuffling] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentCards, setCurrentCards] = useState(levels[0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const WIN_DELAY = 2000;

  function generateCards(totalCards: number) {
    // Generate an array of numbers from 1 to totalCards
    const numbers = Array.from({ length: totalCards }, (_, index) => index + 1);

    // Shuffle the array
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

    // Map the shuffled numbers to an array of card objects
    const cards = shuffledNumbers.map((number) => ({
      number: number,
      isFlipped: false,
    }));

    return cards;
  }

  useEffect(() => {
    // Initialize game
    const newCards = generateCards(currentCards); // Assume generateCards is a function that generates the initial cards
    setCards(newCards);
    setFlippedCards([]);
    setCurrentNumber(1);
    setIsWaiting(false);
    setMessage("");
    setTime(0);
    setLevel(1);

    // Start chronometer
    const intervalId = setInterval(() => {
      // Update time
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleCardClick = (clickedCard: {
    number: number;
    isFlipped: boolean;
  }) => {
    // If the game is waiting, don't do anything
    if (isWaiting) return;

    // Flip the card
    setCards(
      cards.map((card) =>
        card.number === clickedCard.number ? { ...card, isFlipped: true } : card
      )
    );

    // If the card number is the next in the sequence
    if (clickedCard.number === currentNumber) {
      // Add the card to the flippedCards array
      setFlippedCards((prevFlippedCards: any) => [
        ...prevFlippedCards,
        clickedCard,
      ]);

      // If all cards have been flipped
      if (flippedCards.length === currentCards - 1) {
        // Go to the next level
        setIsWaiting(true);
        // Create confetti
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          setIsWaiting(false);
          setCurrentCards(levels[level]);
          setLevel((prevLevel) => prevLevel + 1);
          // Reset the game state
          setFlippedCards([]);
          setCurrentNumber(1);
          // Generate new cards for the next level
          setCards(generateCards(levels[level]));
        }, WIN_DELAY);
      } else {
        // If not all cards have been flipped, increment the currentNumber
        setCurrentNumber((prevNumber) => prevNumber + 1);
      }
    } else {
      setFlippedCards((prevFlippedCards: any) => [
        ...prevFlippedCards,
        clickedCard,
      ]);
      setBadCard(clickedCard.number);
      // If the card number is not the next in the sequence, flip all cards back over and reset the game state
      setIsWaiting(true);
      setTimeout(() => {
        setCards(cards.map((card) => ({ ...card, isFlipped: false })));
        setFlippedCards([]);
        setCurrentNumber(1);
        setIsWaiting(false);
        setBadCard(-1);
      }, 1000);
    }
  };

  const handleShuffleClick = () => {
    // Handle shuffle click
    // Shuffle the cards
    setCards(cards.sort(() => Math.random() - 0.5));

    // Reset the game state
    setFlippedCards([]);
    setCurrentNumber(1);

    setShuffling(true);
    setTimeout(() => {
      setShuffling(false);
    }, 500);
  };

  const formattedTime = `${Math.floor(time / 60)}:${(time % 60)
    .toString()
    .padStart(2, "0")}`;

  return (
    <>
      <SEO
        pageTitle="Juego de cartas"
        pageDescription="Un juego de cartas simple para mejorar tu memoria."
      />
      <div className="card-game">
        {showConfetti && <Confetti />}
        <div className="header">
          <div id="chronometerContainer" className="chronometer-container">
            {formattedTime}
          </div>
          <div id="currentLevel" className="current-level">
            Nivel: <span id="lvlSpan">{level}</span>
          </div>
        </div>
        <div
          className={`card-container ${shuffling ? "shuffling" : ""}`}
          id="cardContainer"
        >
          {cards.map((card) => {
            const isFlipped =
              flippedCards.findIndex(
                (flippedCard: any) => flippedCard.number === card.number
              ) !== -1;

            const isWrong = barCard === card.number;

            const className = `card ${isFlipped ? "flipped" : ""} ${
              isWrong ? "wrong" : ""
            }`;

            return (
              <div
                key={card.number}
                className={className}
                onClick={() => handleCardClick(card)}
              >
                <span className={card.isFlipped ? "" : "hidden"}>
                  {card.number}
                </span>
              </div>
            );
          })}
        </div>
        <button
          className="shuffle-cards"
          id="shuffleButton"
          onClick={handleShuffleClick}
        >
          Revolver cartas
        </button>
        <div className="message-container" id="messageContainer">
          {message}
        </div>
      </div>
    </>
  );
};

export default CardGame;

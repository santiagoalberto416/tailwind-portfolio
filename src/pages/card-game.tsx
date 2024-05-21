import React, { FC, useEffect, useState } from "react";

const levels = [3, 6, 9, 12, 15, 18, 21];

// Función para cargar el juego después de que el DOM esté completamente cargado
function startGame() {
  const delay: number = 1000;
  const cardContainer: HTMLElement | null =
    document.getElementById("cardContainer");
  const messageContainer: HTMLElement | null =
    document.getElementById("messageContainer");
  const shuffleButton: HTMLElement | null =
    document.getElementById("shuffleButton");
  let flippedCards: number[] = [];
  let currentLevel: number = 1;
  let currentNumber: number = 1;
  let isWaiting: boolean = false;

  const chronometerContainer: HTMLElement | null = document.getElementById(
    "chronometerContainer"
  );
  let startTime: number;
  let elapsedTime: number = 0;
  let chronometerInterval: NodeJS.Timeout;

  function initGame(cards: number): void {
    startChronometer();
    flippedCards = [];
    currentNumber = 1;
    const cardContainer = document.getElementById("cardContainer");
    cardContainer!!.innerHTML = "";
    document!.getElementById("lvlSpan")!.textContent = `${currentLevel}`;
    // Generate an array of numbers from 1 to totalCards
    const numbers = Array.from({ length: cards }, (_, index) => index + 1);

    // Shuffle the array
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

    // Create card elements and append them to the container
    shuffledNumbers.forEach((number, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Create a span element for the number
      const numberElement = document.createElement("span");
      numberElement.textContent = `${number}`;

      // Initially hide the number by adding a class
      numberElement.classList.add("hidden");

      card.appendChild(numberElement); // Add the span to the card
      cardContainer!.appendChild(card);

      // Add click event listener to each card
      card.addEventListener("click", () => {
        if (!isWaiting) {
          flipCard(card, number, numberElement);
        }
      });
    });
  }

  // Function to create and append confetti elements to the middle of the screen
  function createConfetti(): void {
    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");

    for (let i = 0; i < 50; i++) {
      const confettiPiece = document.createElement("div");
      confettiPiece.classList.add("confetti");
      confettiPiece.style.left = `${Math.random() * window.innerWidth}px`;
      confettiPiece.style.animationDelay = `${Math.random()}s`;

      confettiContainer.appendChild(confettiPiece);
    }

    document.body.appendChild(confettiContainer);
    setTimeout(() => {
      stopConfetti();
    }, 2000);
  }

  // Function to stop the confetti animation
  function stopConfetti(): void {
    const confettiPieces = document.querySelectorAll(".confetti");
    confettiPieces.forEach((confettiPiece) => {
      confettiPiece.classList.add("stopped");
    });
  }

  function showMessage(message: string) {
    messageContainer!.textContent = message;
    messageContainer!.style.display = "block";

    setTimeout(() => {
      messageContainer!.style.display = "none";
      messageContainer!.textContent = "";
    }, 2000);
  }

  // Function to update the chronometer display
  function updateChronometerDisplay(): void {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    chronometerContainer!.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }

  // Function to start the chronometer
  function startChronometer(): void {
    startTime = new Date().getTime();

    chronometerInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      elapsedTime = Math.floor((currentTime - startTime) / 1000);
      updateChronometerDisplay();
    }, 1000);
  }

  function shuffleCards(): void {
    // Add the 'shuffling' class to initiate the shuffle animation
    cardContainer!.classList.add("shuffling");

    // Get all card elements in the DOM
    const cards = Array.from(document.querySelectorAll(".card"));

    // Shuffle the array of card elements
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    // Append the shuffled cards back to the card container
    cards.forEach((card) => {
      cardContainer!.appendChild(card);
    });

    // Remove the 'shuffling' class after the animation completes
    setTimeout(() => {
      cardContainer!.classList.remove("shuffling");
    }, 500);
    startChronometer();
  }

  function flipCard(
    card: HTMLElement,
    number: number,
    numberElement: HTMLElement
  ): void {
    card.classList.add("flipped");
    numberElement.classList.remove("hidden");
    flippedCards.push(number);
    if (number === currentNumber) {
      numberElement.classList.remove("wrong");
      if (flippedCards.length === levels[currentLevel - 1]) {
        clearInterval(chronometerInterval);
        createConfetti();
        showMessage(
          "¡Felicidades! Has volteado todas las cartas en orden ascendente."
        );
        currentLevel++;
        setTimeout(() => initGame(levels[currentLevel - 1]), 750);
      } else {
        currentNumber++;
      }
    } else {
      card.classList.add("wrong");
      // Si el número no coincide, voltea todas las cartas boca abajo
      isWaiting = true; // Evita que el usuario seleccione otras cartas durante 2 segundos
      showMessage(
        "¡Oops! Has roto la cadena ascendente. Volteando todas las cartas boca abajo."
      );
      setTimeout(() => {
        resetGame();
        isWaiting = false; // Habilita la interacción después de 2 segundos
      }, delay);
    }
  }

  function resetGame(): void {
    // Destruir cartas y crear nuevas
    // Voltea todas las cartas boca abajo y reinicia el estado del juego
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.remove("flipped");
      card.classList.remove("wrong");
      const numberElement = card.querySelector("span");
      numberElement!.classList.add("hidden");
    });

    flippedCards.length = 0;
    currentNumber = 1;
  }
  initGame(levels[0]);

  // Add click event listener to the shuffle button
  shuffleButton!.addEventListener("click", () => {
    shuffleCards();
  });
  startChronometer();
}

const CardGame: FC<{}> = () => {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) {
      startGame();
      setGameStarted(true);
    }
  }, [gameStarted]);

  return (
    <div className="card-game">
      <div className="header">
        <div id="chronometerContainer" className="chronometer-container">
          0:00
        </div>
        <div id="currentLevel" className="current-level">
          Nivel: <span id="lvlSpan">1</span>
        </div>
      </div>
      <div className="card-container" id="cardContainer"></div>
      <button className="shuffle-cards" id="shuffleButton">
        Revolver cartas
      </button>
      <div className="message-container" id="messageContainer"></div>
    </div>
  );
};

export default CardGame;

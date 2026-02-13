import React, { FC, useEffect, useState, useRef } from "react";
import SEO from "@/components/SEO";

// Define available colors with their enabled and disabled states
const COLORS = [
  {
    id: "red",
    enabled: "bg-red-500",
    disabled: "bg-red-900/30",
  },
  {
    id: "blue",
    enabled: "bg-blue-500",
    disabled: "bg-blue-900/30",
  },
  {
    id: "yellow",
    enabled: "bg-yellow-400",
    disabled: "bg-yellow-900/30",
  },
  {
    id: "green",
    enabled: "bg-green-500",
    disabled: "bg-green-900/30",
  },
];

// Speed presets in milliseconds
const SPEED_PRESETS = {
  slow: 2000,
  medium: 1200,
  fast: 700,
};

type Speed = keyof typeof SPEED_PRESETS;

const ColorGame: FC = () => {
  // Game state
  const [enabledColors, setEnabledColors] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<Speed>("medium");
  const [showSettings, setShowSettings] = useState(true);

  // Ref to store interval ID for cleanup
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Randomly enable 1 or 2 colors
   * Ensures max 2 colors are enabled at once
   */
  const randomizeColors = () => {
    // Decide randomly: 1 or 2 colors
    const count = Math.random() < 0.5 ? 1 : 2;

    // Get random indices
    const indices: number[] = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * COLORS.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }

    setEnabledColors(indices);

    // Optional: Trigger vibration on mobile (if supported)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  /**
   * Start the game cycle
   */
  const startGame = () => {
    setIsRunning(true);
    randomizeColors(); // Immediate first change
  };

  /**
   * Stop the game cycle
   */
  const stopGame = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  /**
   * Handle game cycle with interval
   * Updates when speed or isRunning changes
   */
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Start new interval if game is running
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        randomizeColors();
      }, SPEED_PRESETS[speed]);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed]);

  /**
   * Toggle start/stop
   */
  const handleToggle = () => {
    if (isRunning) {
      stopGame();
    } else {
      startGame();
    }
  };

  return (
    <>
      <SEO
        pageTitle="Color Game"
        pageDescription="A full-screen color pad game designed for mobile devices and kids."
      />

      {/* Full-screen container - no scrolling, no margins */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">

        {/* 2x2 Grid - fills entire viewport */}
        <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0">
          {COLORS.map((color, index) => {
            const isEnabled = enabledColors.includes(index);

            return (
              <div
                key={color.id}
                className={`
                  ${isEnabled ? color.enabled : color.disabled}
                  transition-all duration-300 ease-in-out
                  cursor-pointer
                  active:scale-95
                  touch-none
                  select-none
                `}
                style={{
                  // Ensure perfect fill with no gaps
                  width: "100%",
                  height: "100%",
                }}
                // Optional: Make colors clickable for interaction
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.vibrate) {
                    navigator.vibrate(30);
                  }
                }}
              />
            );
          })}
        </div>

        {/* Settings Panel - Mobile-friendly bottom overlay */}
        <div
          className={`
            fixed bottom-0 left-0 right-0
            bg-gray-900/95 backdrop-blur-sm
            transition-transform duration-300 ease-in-out
            ${showSettings ? "translate-y-0" : "translate-y-full"}
            z-50
            border-t-2 border-gray-700
          `}
        >
          {/* Settings toggle button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="
              absolute -top-10 left-1/2 -translate-x-1/2
              bg-gray-900/95 backdrop-blur-sm
              text-white
              px-6 py-2
              rounded-t-lg
              border-2 border-gray-700 border-b-0
              text-sm font-medium
              active:bg-gray-800
              transition-colors
            "
            aria-label={showSettings ? "Hide settings" : "Show settings"}
          >
            {showSettings ? "Hide ▼" : "Settings ▲"}
          </button>

          <div className="p-6 pb-8">
            {/* Start/Stop Button - Large and touch-friendly */}
            <button
              onClick={handleToggle}
              className={`
                w-full
                py-4
                rounded-lg
                font-bold text-lg
                transition-all duration-200
                active:scale-95
                mb-6
                ${
                  isRunning
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }
              `}
            >
              {isRunning ? "⏸ Stop" : "▶ Start"}
            </button>

            {/* Speed Control - Segmented Control Style */}
            <div className="space-y-3">
              <label className="text-white text-sm font-medium block">
                Speed
              </label>

              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(SPEED_PRESETS) as Speed[]).map((speedOption) => (
                  <button
                    key={speedOption}
                    onClick={() => setSpeed(speedOption)}
                    className={`
                      py-3
                      rounded-lg
                      font-medium
                      capitalize
                      transition-all duration-200
                      active:scale-95
                      ${
                        speed === speedOption
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }
                    `}
                  >
                    {speedOption}
                  </button>
                ))}
              </div>

              {/* Speed indicator */}
              <div className="text-center text-gray-400 text-xs mt-2">
                {SPEED_PRESETS[speed]}ms interval
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorGame;

import { useEffect, useRef, useState } from "react";

const useTimer = (): [string, () => void] => {
  const [time, setTime] = useState<string>("0:00");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let seconds = 0;
    let minutes = 0;
    intervalRef.current = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      const time = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      setTime(time);
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    let seconds = 0;
    let minutes = 0;
    intervalRef.current = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      const time = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      setTime(time);
    }, 1000);
  };

  return [time, resetTimer];
};

export default useTimer;

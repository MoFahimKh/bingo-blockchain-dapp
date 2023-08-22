import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [timerText, setTimerText] = useState("3:00");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        setTimerText(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      } else {
        clearInterval(interval);
        setGameStarted(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]);

  return (
    <div>{gameStarted ? <p>Game has started!</p> : <p>{timerText}</p>}</div>
  );
};

export default Timer;

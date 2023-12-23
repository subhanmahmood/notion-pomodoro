import { useEffect, useRef, useState } from "react";

export type TimerOption = {
  name: string;
  duration: number;
};

const usePomodoro = (timerOptions: TimerOption[], timeToStartFrom?: number) => {
  const [currentTimerOption, setCurrentTimerOption] = useState(timerOptions[0]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    timeToStartFrom ?? 0
  );
  const [formattedTimeLeft, setFormattedTimeLeft] = useState("");
  const timerRef = useRef<NodeJS.Timeout>();

  const updateTimer = (time: TimerOption, stopTimer: boolean = true) => {
    if (stopTimer && isTimerActive) setIsTimerActive(false);
    setCurrentTimerOption(time);
  };

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  const resetTimer = () => {
    updateTimer({ ...currentTimerOption });
  };

  const formatTime = (s: number) => {
    let minutes = Math.floor(s / 60);
    let seconds = s % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  useEffect(() => {
    setFormattedTimeLeft(formatTime(remainingSeconds));
  }, [remainingSeconds]);

  useEffect(() => {
    setRemainingSeconds(currentTimerOption.duration);
  }, [currentTimerOption]);

  useEffect(() => {
    if (isTimerActive && remainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prevRemainingSeconds) => prevRemainingSeconds - 1);
      }, 1000);
    } else if (isTimerActive && remainingSeconds === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsTimerActive(false);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, remainingSeconds]);

  return {
    isTimerActive,
    remainingSeconds,
    toggleTimer,
    formattedTimeLeft,
    resetTimer,
    updateTimer,
    currentTimerOption,
    setRemainingSeconds,
  };
};

export default usePomodoro;

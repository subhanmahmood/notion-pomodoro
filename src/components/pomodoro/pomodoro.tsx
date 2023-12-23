import usePomodoro, { TimerOption } from "@/lib/hooks/use-pomodoro";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

const Pomodoro = () => {
  const [count, setCount] = useState(0);
  const options: TimerOption[] = useMemo(
    () => [
      {
        name: "Pomodoro",
        duration: 25 * 60,
      },
      {
        name: "Short Break",
        duration: 5 * 60,
      },
      {
        name: "Long Break",
        duration: 15 * 60,
      },
    ],
    []
  );

  const {
    isTimerActive,
    formattedTimeLeft,
    resetTimer,
    toggleTimer,
    updateTimer,
  } = usePomodoro(options);

  useEffect(() => {
    updateTimer(options[count % options.length], false);
  }, [count, options, updateTimer]);

  const updateCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button className="w-full" variant="outline" onClick={updateCount}>
          {options[count % options.length].name}
        </Button>
      </div>
      <div className="text-5xl ordinal tabular-nums slashed-zero">
        {formattedTimeLeft}
      </div>
      <div className="flex w-full gap-4">
        <Button
          className="grow"
          onClick={toggleTimer}
          variant={"outline"}
          size={"sm"}
        >
          {isTimerActive ? <Pause size={16} /> : <Play size={16} />}
        </Button>
        <Button
          className="grow"
          onClick={resetTimer}
          variant={"outline"}
          size={"sm"}
        >
          <RotateCcw size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Pomodoro;

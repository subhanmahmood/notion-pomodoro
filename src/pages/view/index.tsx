import Pomodoro from "@/components/pomodoro/pomodoro";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { Moon, Sun } from "lucide-react";

const ViewPomodoro = () => {
  const { query } = useRouter();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    if (query && query.theme === "dark") {
      setTheme(query.theme as string);
    } else {
      setTheme("light");
    }
  }, [query, setTheme]);

  return (
    <div className="mt-8 max-w-min">
      <Pomodoro />
      <Button
        variant={"outline"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute transition-all capitalize top-4 right-4 opacity-0 hover:opacity-100"
      >
        {theme === "dark" ? (
          <Moon className="mr-2" size={"18"} />
        ) : (
          <Sun className="mr-2" size={"18"} />
        )}
        {theme}
      </Button>
    </div>
  );
};

export default ViewPomodoro;

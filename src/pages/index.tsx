import { Inter } from "next/font/google";
import Pomodoro from "@/components/pomodoro/pomodoro";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { theme, setTheme } = useTheme();

  const writeLinkToClipboard = () => {
    let url = `${process.env.NEXT_PUBLIC_APP_URL}/view`;
    if (theme === "dark") {
      url += "?theme=dark";
    }
    window.navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Pomodoro />
      <div className="mt-8 max-w-xs flex flex-col items-center gap-4">
        <p className="text-sm text-gray-500 text-center">
          Click the button below to get an embeddable link to this pomodoro
          timer
        </p>
        <div className="flex items-center space-x-2">
          <Label className="text-sm text-gray-500" htmlFor="dark-mode">
            Dark Mode
          </Label>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            id="dark-mode"
          />
        </div>
        <Button size={"sm"} onClick={writeLinkToClipboard}>
          Get link
        </Button>
      </div>
    </main>
  );
}

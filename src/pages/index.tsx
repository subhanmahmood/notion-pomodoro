import { Inter } from "next/font/google";
import Pomodoro from "@/components/pomodoro/pomodoro";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const writeLinkToClipboard = () => {
    window.navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/view`);
    toast.success('Copied to clipboard!')
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
        <Button size={"sm"} onClick={writeLinkToClipboard}>
          Get link
        </Button>
      </div>
    </main>
  );
}

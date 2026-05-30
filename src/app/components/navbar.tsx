import { Button } from "@/components/ui/button";
import { Show } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export function Navbar() {
  return (
    <nav className="w-full items-center justify-center flex  flex-row content-center h-[10vh]">
      <div className="w-[80%] flex justify-between">
        <Link href={"/"} className="font-black font-['EBGaramond'] text-2xl">
          Foundry
        </Link>
        <Show when={"signed-out"}>
          <Button
            variant={"default"}
            onClick={() => {
              redirect("/app");
            }}
            className={"px-6 py-5 rounded-full"} // took this from a website
          >
            Sign Up
          </Button>
        </Show>
        <Show when={"signed-in"}>
          <Button
            variant={"default"}
            onClick={() => {
              redirect("/app");
            }}
            className={"px-6 py-5 rounded-full"} // took this from a website
          >
            Open Foundry
          </Button>
        </Show>
      </div>
    </nav>
  );
}

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { IoTicket } from "react-icons/io5";
import { SiClerk, SiDiscord } from "react-icons/si";

export default function App() {
  return (
    <main className="flex items-center justify-between w-full h-screen">
      <div className="w-[50%] h-screen flex flex-col items-center gap-3 justify-center">
        <h1 className="text-5xl font-bold w-[85%] font-['EBGaramond'] ml-auto mr-auto">
          Welcome to the subway station! You didn&apos;t expect this, did you?
        </h1>
        <p className="w-[85%] ml-auto mr-auto text-2xl">Predict on Foundry</p>
      </div>
      <div className="w-[50%] h-screen flex items-center justify-center">
        {/*// <SignIn />*/}
        <Card className="w-[65%]">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center ">
              <IoTicket /> Turnstile
            </CardTitle>
            <CardDescription>
              How would you like to authenticate to access the platform?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mb-auto">
              <hr />
              <h1 className="text-center">For Humans</h1>
              <Link href={"/auth/discord"} className={buttonVariants()}>
                <SiDiscord />
                Discord
              </Link>
            </div>
            <br />
            <div className="flex flex-col gap-2">
              <h1 className="text-center">For agents</h1>
              <Link href={"/skill.md"} className={buttonVariants()}>
                <span className="font-mono">skill.md</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

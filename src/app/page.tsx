"use client";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { VideoAscii } from "react-video-ascii";
import { GoLinkExternal } from "react-icons/go";
import { redirect } from "next/navigation";
import { Navbar } from "./components/navbar";
import { Show } from "@clerk/nextjs";

const delay = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/*Hero*/}
        <motion.div
          className="text-center justify-center w-full flex-col md:h-[50vh] h-[70vh] items-center content-center "
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={delay}
        >
          <h1 className="md:text-6xl text-4xl font-['InstrumentSerif'] w-[85%] justify-items-center  ml-auto mr-auto">
            The simulated prediction market for humans &amp; agents
            {/*A prediction market for both <br />
            humans &amp; agents*/}
          </h1>
          <p
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={delay}
            className="text-2xl font-semibold"
          >
            The Foundry awaits.
          </p>
          <br />
          <Show when="signed-out">
            <div>
              <Button
                variant={"default"}
                onClick={() => {
                  redirect("/app");
                }}
                className={"px-7 py-5 rounded-full"} // took this from a earlier project of mine
              >
                <GoLinkExternal /> Join the Foundry
              </Button>
            </div>
          </Show>
          <Show when={"signed-in"}>
            <div>
              <Button
                variant={"default"}
                onClick={() => {
                  redirect("/app");
                }}
                className={"px-7 py-5 rounded-full"} // took this from a earlier project of mine
              >
                <GoLinkExternal /> Open Foundry
              </Button>
            </div>
          </Show>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={delay}
          className="w-full invisible md:visible"
        >
          <VideoAscii
            src={"hero.mp4"}
            clickEffect={false}
            mouseEffect={false}
          ></VideoAscii>
        </motion.div>
      </main>
      {/*Live Foundry stuff*/}
      {/*<section className="w-full h-[30vh]">
        <h1>Live from the Foundry</h1>
      </section>*/}
      {/*<footer className="border-t border-black justify content-center">
        <div className="ml-2">
          <h1>Foundry</h1>
        </div>
      </footer>*/}
    </>
  );
}

'use client';
import { Avatar, AvatarBadge, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Show } from "@/src/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CgMenuGridO, CgTrending, CgTrophy } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";

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


export function Sidebar({ session, currentPath = "/markets" }: {
  session: {
    avatar: string;
    displayName: string;
    balance?: string;
  };
  currentPath?: string; 
}) {
  const navItems = [
    { label: "Live Markets", icon: CgTrending, href: "/markets" },
    { label: "My Portfolio", icon: CgMenuGridO, href: "/portfolio" },
    { label: "Leaderboard", icon: CgTrophy, href: "/leaderboard" },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-border bg-card p-4 text-card-foreground shadow-sm">
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2 font-bold text-xl tracking-tight font-['EBGaramond']">
          <span>Foundry</span>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 hover:shadow-md">
          <IoCreateOutline /> Create Market
        </button>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Wallet Balance & User Session */}
      <div className="space-y-4 border-t border-border pt-4">
        {/* Wallet Balance Display */}
        <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3 border border-border/50">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>Balance</span>
          </div>
          <span className="text-sm font-bold text-green-600 dark:text-green-400">
            {session.balance || "$0.00"}
          </span>
        </div>

        {/* User Profile Footer */}
        <div className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-muted/40">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={session.avatar} alt={session.displayName} />  
              <AvatarFallback>{session.displayName[0]?.toUpperCase()}</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-500 ring-2 ring-background" />
            </Avatar>
            
            <div className="flex flex-col min-w-0">
              <span className="truncate text-sm font-semibold leading-none text-foreground">
                {session.displayName}
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5">Trader</span>
            </div>
          </div>

          {/* Quick Settings Icon */}
          <button className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          </button>
        </div>
      </div>
    </aside>
  );
}
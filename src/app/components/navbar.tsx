'use client';
import { Avatar, AvatarBadge, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Show } from "@/src/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CgTrending, CgMenuGridO, CgTrophy } from "react-icons/cg";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";

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


export function FoundrySidebar({
  session,
}: {
  session: {
    avatar: string;
    displayName: string;
    balance?: string;
  };
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Cmd+K / Ctrl+K focuses search
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  // Click outside closes the profile menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileOpen && !profileRef.current?.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  if (collapsed) {
    return (
      <aside className="flex h-screen w-14 flex-col items-center justify-between border-r border-border bg-card py-4 text-card-foreground">
        <div className="flex flex-col items-center gap-4">
          <button
            aria-label="Expand sidebar"
            onClick={() => setCollapsed(false)}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <LuPanelLeftOpen className="h-4 w-4" />
          </button>
          <a
            href="/markets"
            aria-label="Live Markets"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <CgTrending className="h-4 w-4" />
          </a>
          <a
            href="/portfolio"
            aria-label="My Portfolio"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <CgMenuGridO className="h-4 w-4" />
          </a>
          <a
            href="/leaderboard"
            aria-label="Leaderboard"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <CgTrophy className="h-4 w-4" />
          </a>
        </div>

        <Avatar className="h-8 w-8 border border-border">
          <AvatarImage src={session.avatar} alt={session.displayName} />
          <AvatarFallback>{session.displayName[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </aside>
    );
  }

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-border bg-card p-4 text-card-foreground">
      <div className="space-y-6">
        {/* Workspace name (static) + collapse */}
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-2xl font-bold tracking-tight font-['EBGaramond']">
              Foundry
            </span>
          </div>

          <button
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(true)}
            className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <LuPanelLeftClose className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="flex pl-4 pr-4 pt-2 pb-2 w-full items-center gap-2 rounded-lg px-1 py-1 text-sm text-muted-foreground transition-colors focus-within:bg-muted/50 hover:bg-muted/50">
          <IoSearchOutline className="h-4 w-4 shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Markets"
            className="min-w-0 flex-1 bg-transparent text-left text-sm outline-none placeholder:text-muted-foreground"
          />
          <Kbd className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border/60 bg-muted/40 font-sans text-[11px] font-medium">
            ⌘
            +
            K
          </Kbd>
        </div>

        {/* Primary navigation */}
        <nav aria-label="Primary" className="space-y-1">
          <a
            href="/markets"
            className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <CgTrending className="h-4 w-4" />
            Live Markets
          </a>

          <a
            href="/portfolio"
            className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <CgMenuGridO className="h-4 w-4" />
            My Portfolio
          </a>

          <a
            href="/leaderboard"
            className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <CgTrophy className="h-4 w-4" />
            Leaderboard
          </a>
        </nav>
      </div>

      {/* Bottom: User session */}
      <div ref={profileRef} className="relative border-t border-border pt-3">
        {profileOpen && (
          <div className="absolute bottom-full left-0 z-10 mb-2 w-full rounded-lg border border-border bg-card p-1 shadow-md">
            <a
              href="/profile"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted/60"
            >
              <IoPersonOutline className="h-4 w-4" />
              Profile
            </a>
            <a
              href="/settings"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted/60"
            >
              <IoSettingsOutline className="h-4 w-4" />
              Settings
            </a>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-red-600 transition-colors hover:bg-muted/60 dark:text-red-400">
              <IoLogOutOutline className="h-4 w-4" />
              Log out
            </button>
          </div>
        )}

        <button
          onClick={() => setProfileOpen((v) => !v)}
          className="flex w-full items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-muted/40"
        >
          <div className="relative">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src={session.avatar} alt={session.displayName} />
              <AvatarFallback>{session.displayName[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-card dark:bg-green-500" />
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
            <span className="truncate text-sm font-medium text-foreground">
              {session.displayName}
            </span>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              <GiStripedSun /> {session.balance || "0"} Aura
            </span>
          </div>

          {/* <Io className="h-3.5 w-3.5 shrink-0 text-muted-foreground" /> */}
        </button>
      </div>
    </aside>
  );
}
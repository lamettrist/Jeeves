import type { Metadata } from "next";
import "./globals.css";
import { verifySession } from "@/lib/tokens";
import { SessionProvider } from "../lib/session";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Foundry",
  description: "The internet's simulated prediction market for humans & agents",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();

  return (
    <html lang="en" className={cn("font-['Akt']", "h-full", "antialiased", "font-sans", inter.variable)}>
        <body className="min-h-full flex flex-col">
          <TooltipProvider>
            <SessionProvider session={session}>
              {children}
            </SessionProvider>
          </TooltipProvider>
        </body>
    </html>
  );
}

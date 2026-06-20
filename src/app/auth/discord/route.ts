import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  return redirect(
    `https://discord.com/oauth2/authorize?client_id=${process.env.discordClientID}&response_type=code&redirect_uri=https%3A%2F%2Ffriendly-cod-grjjqx6v7xx39rjv-3000.app.github.dev%2Fauth%2Fcallback&scope=email+identify`,
  );
}

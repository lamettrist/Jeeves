import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  return redirect(
    `https://discord.com/oauth2/authorize?client_id=1373711107406958683&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&scope=email`,
  );
}

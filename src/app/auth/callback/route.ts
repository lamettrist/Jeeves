import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { request } from "undici";

export async function GET(RequestData: NextRequest) {
  const data = RequestData.nextUrl;
  const code = data.searchParams.get("code");
  if (code == null) {
    return redirect("/app");
  }
  // This is a Discord callback, so we'll deal with it
  const req = request("https://discord.com/api/oauth2/token", {
    method: "POST",
  });
  return NextResponse.json({
    hi: "hi",
  });
}

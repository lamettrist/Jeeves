import { db } from "@/src/db/db";
import { users } from "@/src/db/schema";
import { eq, or } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import {fetch} from 'undici';
import { createToken } from "@/lib/tokens";

export async function GET(RequestData: NextRequest) {
  // if (userId) {
  //   return NextResponse.json({
  //     'status': `You're logged in, why are you here?`
  //   });
  // }
  
  const data = RequestData.nextUrl;
  const code = data.searchParams.get("code")?.toString();
  if (code == null) {
    return redirect("/app");
  }

  const request = await fetch('https://discord.com/api/v10/oauth2/token', {
    'body': new URLSearchParams({
      'grant_type': 'authorization_code',
      code,
      'redirect_uri': 'https://friendly-cod-grjjqx6v7xx39rjv-3000.app.github.dev/auth/callback',
      'client_id': process.env?.discordClientID || '',
      'client_secret': process.env?.discordClientSecret || '',
    }),
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    'method': 'POST'
  })

  const tokenResponse = await request.json()

  const userInformation = await (await fetch('https://discord.com/api/v10/users/@me', {
    'headers': {
      Authorization: `Bearer ${tokenResponse?.access_token}`
    }
  })).json()

  // Revoke our access after fetching.
  fetch(`https://discord.com/api/v10/oauth2/token/revoke`, {
    method: 'POST',
    body: new URLSearchParams({
      'token': tokenResponse?.access_token,
      'client_id': process.env?.discordClientID || '',
      'client_secret': process.env?.discordClientSecret || '',
    }),
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
    }, 
  })

  // Check database for information
  let username = userInformation?.username || null;
  const email = userInformation?.email || null;
  const displayName = userInformation?.global_name || null;
  const avatarImage = `https://cdn.discordapp.com/avatars/${userInformation?.id}/${userInformation?.avatar}.png`

  // Do a lookup
  let userDBSearch = await db.select().from(users).where(eq(users.email, email));
  if (userInformation == undefined || email == null) {
    return redirect('/app');
  } else if (userDBSearch.length == 0) {    
    userDBSearch = await db.insert(users).values({
      'email': email,
      'username': username,
      'displayName': displayName,
      'avatar': avatarImage,
    }).returning();
  }

  // Create JWT
  const token = await createToken(userDBSearch[0]);
  // ggs bro we auth as him now :checkmark:
  // return redirect(`/auth/clerk?`);
  (await cookies()).set({
    'name': '__session',
    'value': token,
    'httpOnly': true,
    'secure': true,
    'sameSite': 'strict',
    'path': '/',
  });
  return redirect('/app');
}

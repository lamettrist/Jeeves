/*
    I make tokens! :D
*/
"use server";
import Iron from '@hapi/iron';
import { cookies } from 'next/headers';
import {config} from '@dotenvx/dotenvx'

config();

export async function createToken(userInformation: {
    id: string;
    username: string | null;
    displayName: string | null;
    email: string | null;
    avatar: string | null;
}) {
    const token = Iron.seal(userInformation, process.env.TOKEN_SECRET, Iron.defaults);
    return token;
}

export async function verifyToken(token: string) {
    try {
        // console.log(token);
        const unsealed = await Iron.unseal(token, process.env.TOKEN_SECRET, Iron.defaults);
        // console.log(unsealed);
        return unsealed;
    } catch {
        return {
            id: null,
            username: 'guest',
            displayName: 'Guest',
            email: 'guest@foundry.vc',
            avatar: null,
        }
    }
}

export async function verifySession() {
    const Cookies = await cookies();
    const token = await Cookies.get("__session");
    if (!token) return null;
    else return await verifyToken(token.value);
}
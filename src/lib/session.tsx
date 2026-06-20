"use client";
import { createContext, ReactNode, useContext } from "react";

const sessContext = createContext<any>(null);

export function SessionProvider({children, session}: {children: ReactNode, session: {
    id: string;
    username: string | null;
    displayName: string | null;
    email: string | null;
    avatar: string | null;
}}) {
    return (
        <sessContext.Provider value={session}>
            {children}
        </sessContext.Provider>
    )
}

export function useSession() {
    return useContext(sessContext);
}
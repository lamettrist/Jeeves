"use client";
import { useSession } from "./session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Show({when, children}: {when: 'signed-in' | 'signed-out', children: React.ReactNode}) {
    const session = useSession();
    if (!session || !session.id) {
        if (when === "signed-out") {
            return (children);
        }
    } else {
        if (when === "signed-in") {
            return (children);
        }
    }
    return null;
}
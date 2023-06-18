import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

async function user() {
    const prisma = new PrismaClient();
    const cookieStore = cookies();
    const sessionId = cookieStore.get('session');
    if (!sessionId) return null
    try {
        const session = await prisma.session.findFirst({
            where: {
                token: sessionId.value,
                expiresAt: {
                    gt: new Date()
                }
            }, include: { user: true }
        })
        if (session) return session.user
        return null;
    } catch {
        return null;
    }
}

function anonymous() {
    return !user();
}

export const guard = {
    user, anonymous
}
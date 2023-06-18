import { UserVerifySchema } from "@/model/user";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const parsedBody = UserVerifySchema.safeParse(await request.json());
    // Validate body
    if (!parsedBody.success) return NextResponse.json(parsedBody.error, { status: 400 })
    // Create database entry
    const userVerifyData = parsedBody.data;
    const prisma = new PrismaClient();
    try {
        // Check if verification code is valid
        const userToVerify = await prisma.user.findFirst({
            where: {
                ...userVerifyData,
                emailVerified: false
            }
        })
        if (!userToVerify) return NextResponse.json({ message: "Invalid details" }, { status: 403 });
        const user = await prisma.user.update({
            where: {
                email: userVerifyData.email
            },
            data: {
                emailVerified: true
            }
        });
        await prisma.$disconnect();
        return NextResponse.json(user);
    } catch (e) {
        await prisma.$disconnect();
        return NextResponse.json({ message: (e as any).message }, { status: 500 })
    }
}
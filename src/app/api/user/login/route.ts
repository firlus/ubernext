import { UserLoginSchema } from "@/model/user";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import addDays from "date-fns/addDays";
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
    const parsedBody = UserLoginSchema.safeParse(await request.json());
    // Validate body
    if (!parsedBody.success) return NextResponse.json(parsedBody.error, { status: 400 })
    // Create database entry
    const userLoginData = parsedBody.data;
    const prisma = new PrismaClient();
    try {
        // Validate credentials
        const user = await prisma.user.findFirst({
            where: {
                email: userLoginData.email,
            }
        });
        if (!user) return NextResponse.json({ message: "E-Mail or password invalid." }, { status: 403 })
        const isPasswordValid = bcrypt.compareSync(userLoginData.password, user.password);
        if (isPasswordValid) {
            // Set session and return success
            const session = await prisma.session.create({
                data: {
                    userId: user.id,
                    expiresAt: addDays(new Date(), 30)
                }
            })
            const cookieStore = cookies();
            cookieStore.set('session', session.token);
            return NextResponse.json({});

        } else {
            return NextResponse.json({ message: "E-Mail or password invalid." }, { status: 403 });
        }
    } catch (e) {
        await prisma.$disconnect();
        return NextResponse.json({ message: (e as any).message }, { status: 500 })
    }
}
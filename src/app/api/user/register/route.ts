import { UserCreateSchema } from "@/model/user";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { AxiosError } from "axios";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { sendEmail } from "@/services/mail";

export async function POST(request: NextRequest) {
    const parsedBody = UserCreateSchema.safeParse(await request.json());
    // Validate body
    if (!parsedBody.success) return NextResponse.json(parsedBody.error, { status: 400 })
    // Create database entry
    const userCreateData = parsedBody.data;
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.create({
            data: {
                email: userCreateData.email,
                name: userCreateData.name,
                password: await bcrypt.hash(userCreateData.password, 5)
            }
        });
        await prisma.$disconnect();
        sendEmail('michael@firlus.dev', `localhost:1312/verify?emailVerificationString=${user.emailVerificationString}&email=${user.email}.`, `your registration`)
        return NextResponse.json(user);
    } catch (e) {
        await prisma.$disconnect();
        return NextResponse.json({ message: (e as any).message }, { status: 500 })
    }
}
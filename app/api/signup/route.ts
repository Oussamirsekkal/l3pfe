import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }

    const { name, email, password } = await req.json();
    const salt = await bcrypt. genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    try {
        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);

        return NextResponse.json({ message: error }, { status: 500 });
    }
}
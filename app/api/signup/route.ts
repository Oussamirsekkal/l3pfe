import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import prisma from "@/prisma";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }

    const { name, email, password } = await req.json();

    // Check if any of the fields are empty
    if (!name || !email || !password) {
        return NextResponse.json({ message: "Please enter your name, email, and password." }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        // Check if the email already exists
        const existingUser = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }

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
        return NextResponse.json({ message: "An error occurred during signup" }, { status: 500 });
    }
}
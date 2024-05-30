// File: pages/api/admin-update-password.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from "@/prisma";

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const { email, newPassword } = await req.json();
    if (!newPassword) {
        return NextResponse.json({ message: 'New password cannot be empty' }, { status: 400 });
    }

    // Get the user from the database
    const user = await prisma.users.findUnique({
        where: {
            email: email, // Use the email from the request body
        },
    });

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await prisma.users.update({
        where: {
            email: email, // Use the email from the request body
        },
        data: {
            password: hashedPassword,
        },
    });

    return NextResponse.json({ success: true });
}
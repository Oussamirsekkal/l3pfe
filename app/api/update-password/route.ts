// File: pages/api/update-password.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from "@/prisma";

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const { email, oldPassword, newPassword } = await req.json();
    if (!oldPassword || !newPassword) {
        return NextResponse.json({ message: 'Old password and new password cannot be empty' }, { status: 400 });
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

    // Check if the user's password is not null
    if (user.password === null) {
        return NextResponse.json({ message: 'Invalid old password' }, { status: 400 });
    }

    // Compare the old password with the stored hash
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid old password' }, { status: 400 });
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
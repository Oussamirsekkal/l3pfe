// File: pages/api/add-child.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    const { childName, childAge, userId } = await req.json();

    // Check if the child's name and age are not empty
    //hello
    if (!childName || !childAge) {
        return NextResponse.json({ message: 'Child name and age cannot be empty' }, { status: 400 });
    }

    // Add the child to the database
    const child = await prisma.children.create({
        data: {
            name: childName,
            age: Number(childAge),
            userId: Number(userId),
        },
    });

    return NextResponse.json({ success: true, child });
}
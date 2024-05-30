import { NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const body = await req.json();
    const { id } = body;

    try {
        // First, delete the child records associated with the user
        await prisma.children.deleteMany({
            where: {
                userId: Number(id),
            },
        });

        // Then, delete the user record
        const deletedUser = await prisma.users.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json({ success: true, id: deletedUser.id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
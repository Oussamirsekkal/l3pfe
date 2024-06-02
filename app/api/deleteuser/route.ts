import { NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const body = await req.json();
    const { id } = body;

    try {
        // Check if the user has any children
        const children = await prisma.children.findMany({
            where: {
                userId: Number(id),
            },
        });

        // If the user has children, delete them
        if (children.length > 0) {
            await prisma.children.deleteMany({
                where: {
                    userId: Number(id),
                },
            });
        }

        // Then, delete the user record
        const deletedUser = await prisma.users.delete({
            where: {
                id: Number(id),
            },
        });
       const response = NextResponse.json({ success: true });
       response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
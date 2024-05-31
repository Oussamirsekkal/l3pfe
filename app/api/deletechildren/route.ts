
import { NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const body = await req.json();
    const { id } = body;

    try {
        const deletedChild = await prisma.children.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json({ success: true, deletedChild });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
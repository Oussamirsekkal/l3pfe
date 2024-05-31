import { NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const body = await req.json();
    const { id, name, age } = body;

    try {
        const updatedChild = await prisma.children.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name,
                age: Number(age)
            }
        });

        return NextResponse.json({ success: true, updatedChild });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
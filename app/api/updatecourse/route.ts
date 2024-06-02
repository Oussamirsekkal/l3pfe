import { NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }

    const body = await req.json();
    const { id, title, description, difficulty_level } = body;

    try {
        const course = await prisma.courses.update({
            where: {
                id: Number(id),
            },
            data: {
                title: title,
                description: description,
                difficulty_level: difficulty_level
            }
        });

        return NextResponse.json(course);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
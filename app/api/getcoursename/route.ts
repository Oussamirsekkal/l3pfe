import { NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: "Course ID is required" }, { status: 400 });
    }

    try {
        const course = await prisma.courses.findUnique({
            where: { id: Number(id) },
        });

        if (!course) {
            return NextResponse.json({ message: "Course not found" }, { status: 404 });
        }

        return NextResponse.json(course);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred while fetching the course" }, { status: 500 });
    }
}

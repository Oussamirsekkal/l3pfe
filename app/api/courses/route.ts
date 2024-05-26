import { NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function GET(req: Request) {
    if (req.method !== 'GET') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }

    try {
        const courses = await prisma.courses.findMany();
        return NextResponse.json(courses);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred while fetching courses" }, { status: 500 });
    }
}
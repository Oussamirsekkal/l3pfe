import {NextRequest, NextResponse} from 'next/server';
import prisma from "@/prisma";

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json(new Error('Method not allowed'), { status: 405 });
    }

    const { searchParams } = req.nextUrl; // Access the searchParams object
    const query = searchParams.get('query'); // Get the 'query' parameter

    if (!query) {
        return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    try {
        const courses = await prisma.courses.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            },
        });
        return NextResponse.json(courses);
    } catch (error) {
        console.error('An error occurred while fetching courses:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
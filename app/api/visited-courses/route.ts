import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const childId = body.childId;
    const courseIds = body.courseIds;

    // Check if childId and courseIds are provided
    if (childId && courseIds) {
        // Upsert the data in the VisitedCourse model
        const prismaResponse = await prisma.visitedCourse.upsert({
            where: {
                id: childId,
            },
            create: {
                id: childId,
                childId: childId, // Add this line
                courseIds: JSON.stringify(courseIds),
            },
            update: {
                courseIds: JSON.stringify(courseIds),
            },
        });

        return NextResponse.json({ message: 'Data saved successfully' });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}
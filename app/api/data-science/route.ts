import { NextRequest } from 'next/server';
import prisma from "@/prisma";

export async function GET(req: NextRequest) {
    try {
        const visitedCourses = await prisma.visitedCourse.findMany();

        // Create an object to count the occurrences of each course ID
        const courseVisits: { [courseId: string]: number } = {};

        visitedCourses.forEach(visitedCourse => {
            try {
                const courseIds = JSON.parse(visitedCourse.courseIds);
                courseIds.forEach((courseId: string) => {
                    if (courseVisits[courseId]) {
                        courseVisits[courseId]++;
                    } else {
                        courseVisits[courseId] = 1;
                    }
                });
            } catch (error) {
                console.error('Failed to parse JSON for visitedCourse', visitedCourse.id, error);
                // Skip this entry or handle it accordingly
            }
        });

        const data = Object.entries(courseVisits).map(([courseId, count]) => ({
            courseId,
            count,
        }));

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Error fetching visited courses:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
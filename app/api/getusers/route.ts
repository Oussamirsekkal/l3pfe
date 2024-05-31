import { NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function GET(req: Request) {
    if (req.method !== 'GET') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }

    try {
        const users = await prisma.users.findMany();
        const response = NextResponse.json(users);

        // Disable caching for this route
        response.headers.set('Cache-Control', 'no-store');

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500});
    }
}
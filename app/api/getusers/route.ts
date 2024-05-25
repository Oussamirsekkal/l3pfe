import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    if (req.method !== 'GET') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }

    try {
        const users = await prisma.users.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500});
    }
}
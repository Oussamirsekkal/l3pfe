import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from "@/prisma";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }

    const { userId } = await req.json();
    try {

        const children = await prisma.children.findMany({
            where: {
                userId: Number(userId),
            },
        });



        const res = NextResponse.json({  children });

        return res;
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500});
    }
}
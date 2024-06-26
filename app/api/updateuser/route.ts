import { NextResponse } from 'next/server';
import prisma from "@/prisma";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }

    const body = await req.json();
    const { id, name, email } = body;

    try {
        const user = await prisma.users.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name,
                email: email
            }
        });
       const response = NextResponse.json(user);
       response.headers.set('Cache-Control', 'no-store');
        return  response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

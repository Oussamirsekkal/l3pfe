import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from "@/prisma";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }

    const {email, password} = await req.json();
    try {
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return NextResponse.json({error: 'User not found'}, {status: 400});
        }

        if (user.password === null) {
            return NextResponse.json({error: 'Invalid credentials'}, {status: 400});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({error: 'Invalid credentials'}, {status: 400});
        }
        const secretkey = process.env.JWT_SECRET;
        if (!secretkey) {
            throw new Error('JWT Secret is not defined');
        }


        const token = jwt.sign({id: user.id, email: user.email,name : user.name ,isAdmin: user.isAdmin}, secretkey, {expiresIn: '24h'});

        const res = NextResponse.json({ token, email: user.email });
        res.headers.set('Set-Cookie', `auth=${token}; Secure; HttpOnly; Path=/`);
        return res;
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500});
    }
}

import { NextResponse, } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

const expirecookie = 24*60*60*100;

const prisma = new PrismaClient();

export async function setcookie(name :string,value:string) {

    cookies().set(name, value, { maxAge:expirecookie ,secure:true, httpOnly:true,path:'/' });
}
export async function getcookie() {
    cookies().get('name')
}
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

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({error: 'Invalid password'}, {status: 400});
        }
        const token = jwt.sign({id: user.id, email: user.email}, '2381741', {expiresIn: '24h'});
        await setcookie('auth',token);

        return NextResponse.json({ token, email: user.email });
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500});
    }
}
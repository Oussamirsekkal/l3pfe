import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'


export async function POST(req: Request) {

    if (req.method !== 'POST') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }
    async function deletecookie(name :string) {
        cookies().set(name, '', { maxAge: 0, secure: true, httpOnly: true, path: '/' });
    }


    try {
        await deletecookie('auth');
        return NextResponse.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500});
    }
}
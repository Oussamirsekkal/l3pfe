import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json(new Error('Method not allowed'), {status: 405});
    }

    try {
        const res = NextResponse.json({ message: 'Logged out successfully' });
        res.headers.set('Set-Cookie', `auth=; Max-Age=0; Secure; HttpOnly; Path=/`);
        return res;
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500});
    }
}
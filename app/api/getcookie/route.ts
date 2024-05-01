import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = cookies();
    const authCookie = cookieStore.get('auth');

    if (authCookie) {
        return NextResponse.json({ cookie: authCookie.value });
    } else {
        return NextResponse.json({ cookie: null });
    }
}
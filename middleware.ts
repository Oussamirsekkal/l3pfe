import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function Middleware(req: NextRequest) {
    const cookie = req.cookies.get('auth');

    if (['/login', '/signup'].includes(req.nextUrl.pathname) && cookie?.name) {
        return NextResponse.redirect(new URL('/profile', req.url));
    }

    if (req.nextUrl.pathname === '/profile' && !cookie?.name) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
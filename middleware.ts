import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export default async function Middleware(req: NextRequest) {
    const cookie = req.cookies.get('auth');
    let isAdmin = false;

    if (cookie) {
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error('JWT Secret is not defined');
            }

            const { payload } = await jwtVerify(cookie.value, new TextEncoder().encode(secret));
            isAdmin = (payload as { isAdmin: boolean }).isAdmin;
        } catch (error) {
            console.error('', error);
        }
    }

    if (['/login', '/signup'].includes(req.nextUrl.pathname) && cookie?.value) {
        return NextResponse.redirect(new URL('/profile', req.url));
    }

    if (['/profile'].includes(req.nextUrl.pathname) && !cookie?.value) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if(['/Dashboard'].includes(req.nextUrl.pathname) && !isAdmin){
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (['/courses'].includes(req.nextUrl.pathname) && !cookie?.value) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (['/search'].includes(req.nextUrl.pathname) && !cookie?.value) {
        return NextResponse.redirect(new URL('/login', req.url));
    }




        return NextResponse.next();
}
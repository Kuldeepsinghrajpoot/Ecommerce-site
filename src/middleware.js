import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const authToken = request.cookies.get("authToken")?.value;

    if (request.nextUrl.pathname === '/pages/Login' ||
        request.nextUrl.pathname === "/pages/Register") {

        if (authToken) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    } else {
        if (!authToken) {
            return NextResponse.redirect(new URL('/pages/Login/', request.url));
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/pages/order/','/pages/Register','/pages/Login'],
}
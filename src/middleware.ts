import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 2 parts of the middleware, 1st part is logic part
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPath = path === '/login' || path === '/signup';
  // now get the token from cookies
  const token = request.cookies.get('token')?.value || '';

  if (publicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!publicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// 2nd part is 'matching paths' part
export const config = {
  matcher: ['/', '/(profile|profile/.*)', '/login', '/signup'],
};

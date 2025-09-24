import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const userId = req.cookies.get('userId')?.value;

  // login user can't go back to login
  if (pathname.startsWith('/login') && userId) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // not logged in user can't go to home
  if (pathname === '/' && !userId) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login'],
};

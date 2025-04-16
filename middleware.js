import next from 'next';
import { NextResponse } from 'next/server';

export function middleware(request) {
  let token = "", isAuthPage = false;
  let authPages = ['/dashboard', '/profile', '/logout'];
  const currentPage = request.nextUrl.pathname;

  if (authPages.includes(currentPage)) {
    isAuthPage = true;
  }

  if (request.cookies.has('token')) {
    token = request.cookies.get('token')?.value;
  }

  if (token !== "" && isAuthPage === true) {
    return NextResponse.next();
  }

  if (token !== "" && (currentPage === "/signin" || currentPage === "/signup")) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (token === "" && isAuthPage === true) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard', '/signin', '/signup'],
};

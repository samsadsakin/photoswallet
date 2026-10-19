import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("user_session")?.value;

  // 1. Unprotected / Public Routes (লগইন ছাড়া যেগুলো অ্যাক্সেস করা যাবে)
  const isPublicRoute = 
    pathname.startsWith("/login") || 
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/api/auth/forgot-password");

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
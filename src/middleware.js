import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // উদাহরণস্বরূপ: লগইন বা প্রটেক্টেড রুট রিডাইরেকশন লজিক
  // পরবর্তীতে আপনার NextAuth বা কাস্টম সেশন দিয়ে এটি ডায়নামিক করতে পারবেন
  
  return NextResponse.next();
}

// যে যে রুটে মিডলওয়্যারটি কাজ করবে তা কনফিগার করা হলো
export const config = {
  matcher: [
    /*
     * নিচের ফাইল/রুটগুলো বাদে সব জায়গায় কাজ করবে:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
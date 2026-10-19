import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // user_session কুকিটি এক্সপায়ার করে ডিলিট করা
  response.cookies.set("user_session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
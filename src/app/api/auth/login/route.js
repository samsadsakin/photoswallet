import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/user-store";

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: "User ID/Phone and password are required" }, { status: 400 });
    }

    const user = await verifyUser(identifier, password);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ message: "Login successful", user });

    // Session Cookie: Browser close korlei destroy hobe
    response.cookies.set("user_session", JSON.stringify({ id: user.id, role: user.role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
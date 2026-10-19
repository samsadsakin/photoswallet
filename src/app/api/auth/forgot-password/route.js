import { NextResponse } from "next/server";
import { sendForgetPasswordSMS } from "@/lib/user-store";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[FORGOT PASSWORD API BODY]:", body);

    const identifier = body.userId || body.identifier;

    if (!identifier) {
      return NextResponse.json({ error: "User ID or Phone is required" }, { status: 400 });
    }

    const phone = await sendForgetPasswordSMS(identifier);

    return NextResponse.json({
      message: `Password sent via SMS to ${phone}`
    });
  } catch (error) {
    console.error("[FORGOT PASSWORD ERROR]:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to process SMS request" },
      { status: 400 }
    );
  }
}
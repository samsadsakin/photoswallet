import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUsers } from "@/lib/user-store";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "src", "data", "users.json");

// ১. সেশন কুকি থেকে বর্তমান ইউজারের ডাটা রিড করা
export async function GET(req) {
  try {
    const sessionCookie = req.cookies.get("user_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie);
    const users = getUsers();
    const user = users.find((u) => u.id === session.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // পাসওয়ার্ড হ্যাশ ছাড়া ইউজারের ডাটা পাঠানো
    const { passwordHash, ...safeUserData } = user;
    return NextResponse.json(safeUserData);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// ২. বর্তমান পাসওয়ার্ড চেক করে নতুন পাসওয়ার্ড হ্যাশ করে আপডেট করা
export async function PUT(req) {
  try {
    const sessionCookie = req.cookies.get("user_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie);
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === session.id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // কারেন্ট পাসওয়ার্ড ম্যাচ করছে কিনা চেক
    const isMatch = await bcrypt.compare(currentPassword, users[userIndex].passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }

    // নতুন পাসওয়ার্ড হ্যাশ করে ফাইলে সেভ করা
    const newHash = await bcrypt.hash(newPassword, 10);
    users[userIndex].passwordHash = newHash;

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: "Password updated successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
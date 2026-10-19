import { NextResponse } from "next/server";
import { getUsers, addUser, updateUser, deleteUser } from "@/lib/user-store";

export async function GET() {
  const users = getUsers().map(({ passwordHash, ...user }) => user);
  return NextResponse.json(users);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newUser = await addUser(body);
    const { passwordHash, ...safeUser } = newUser;
    
    return NextResponse.json({ message: "User added successfully", user: safeUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  try {
    const { id, ...updateData } = await req.json();
    const updatedUser = await updateUser(id, updateData);
    const { passwordHash, ...safeUser } = updatedUser;

    return NextResponse.json({ message: "User updated successfully", user: safeUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    deleteUser(id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
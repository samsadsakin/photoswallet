import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { sendSMS } from "@/lib/sms";

const usersFilePath = path.join(process.cwd(), "src", "data", "users.json");

export function getUsers() {
  if (!fs.existsSync(usersFilePath)) {
    fs.mkdirSync(path.dirname(usersFilePath), { recursive: true });
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
    return [];
  }
  const data = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(data || "[]");
}

// Identifier (User ID/Phone) + Password Check
export async function verifyUser(identifier, password) {
  const users = getUsers();
  const user = users.find(
    (u) => String(u.userId) === String(identifier) || String(u.phone) === String(identifier)
  );

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;

  return { id: user.id, userId: user.userId, name: user.name, phone: user.phone, role: user.role };
}

// Add User (Bcrypt Hash only)
export async function addUser({ userId, name, phone, password, role }) {
  const users = getUsers();

  if (users.some((u) => String(u.userId) === String(userId))) {
    throw new Error("User ID already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    userId: String(userId),
    name,
    phone,
    passwordHash, // শুধুমাত্র হ্যাশ থাকবে
    role: role || "user",
  };

  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  return newUser;
}

// Update User
export async function updateUser(id, { userId, name, phone, password, role }) {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  if (users.some((u) => String(u.userId) === String(userId) && u.id !== id)) {
    throw new Error("User ID is already taken");
  }

  const user = users[userIndex];
  let passwordHash = user.passwordHash;

  if (password && password.trim() !== "") {
    passwordHash = await bcrypt.hash(password, 10);
  }

  users[userIndex] = {
    ...user,
    userId: String(userId),
    name: name || user.name,
    phone: phone || user.phone,
    role: role || user.role,
    passwordHash,
  };

  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  return users[userIndex];
}

// Secure Forgot Password: Generate New Password & Hash
export async function sendForgetPasswordSMS(identifier) {
  const users = getUsers();
  const userIndex = users.findIndex(
    (u) => String(u.userId) === String(identifier) || String(u.phone) === String(identifier)
  );

  if (userIndex === -1) {
    throw new Error("User ID or Phone number not found!");
  }

  const user = users[userIndex];

  // ১. নতুন র‍্যান্ডম ৬-ডিজিটের পাসওয়ার্ড জেনারেট (যেমন: 593821)
  const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();

  // ২. পাসওয়ার্ডটি তাৎক্ষণিক হ্যাশ করা
  const passwordHash = await bcrypt.hash(tempPassword, 10);

  // ৩. ফাইলে শুধু হ্যাশ সেভ রাখা
  users[userIndex].passwordHash = passwordHash;
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  // ৪. মেসেজে নতুন পাসওয়ার্ড পাঠানো
  const smsText = `Your new temporary PhotoWallet password is: ${tempPassword}`;
  const isSent = await sendSMS(user.phone, smsText);

  if (!isSent) {
    throw new Error("Failed to send SMS!");
  }

  return user.phone;
}

// Delete User
export function deleteUser(id) {
  let users = getUsers();
  users = users.filter((u) => u.id !== id);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  return true;
}
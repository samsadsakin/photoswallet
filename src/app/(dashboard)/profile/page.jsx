"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ShieldCheck, Eye, EyeOff, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const router = useRouter();

  // প্রোফাইল তথ্য লোড করা
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // নাম থেকে ইনিশিয়াল বের করা
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // পাসওয়ার্ড আপডেট হ্যান্ডলার
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg({ type: "success", text: data.message || "Password updated successfully!" });
        setNewPassword("");
      } else {
        setMsg({ type: "error", text: data.error || "Failed to update password" });
      }
    } catch (err) {
      setMsg({ type: "error", text: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  // লগআউট হ্যান্ডলার
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-md mx-auto">
      <div className="bg-[#0b101d] border border-slate-800 rounded-[32px] p-6 space-y-5 text-center shadow-2xl">
        {/* User Avatar */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 mx-auto flex items-center justify-center font-bold text-xl text-white shadow-xl tracking-wider">
          {user ? getInitials(user.name) : "..."}
        </div>

        {/* User Info */}
        <div>
          <h3 className="text-base font-bold text-white">
            {user ? user.name : "Loading..."}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {user ? `ID: ${user.userId} | Phone: ${user.phone}` : "Fetching details..."}
          </p>
          {user?.role && (
            <span className="inline-flex items-center gap-1 mt-2 px-3 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-semibold rounded-full border border-blue-500/20 uppercase">
              <ShieldCheck className="w-3 h-3" /> {user.role} Account
            </span>
          )}
        </div>

        {/* Password Update Form */}
        <form onSubmit={handlePasswordUpdate} className="pt-4 border-t border-slate-800 space-y-3 text-left">
          <p className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-blue-400" /> Set New Password
          </p>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#050811] border border-slate-800 rounded-2xl pl-4 pr-10 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {msg.text && (
            <p
              className={`text-xs text-center p-2.5 rounded-xl border ${
                msg.type === "success"
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
            >
              {msg.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-2xl transition shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50 active:scale-95"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {/* Log Out Button */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
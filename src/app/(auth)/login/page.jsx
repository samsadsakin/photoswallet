"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, KeyRound, X, ImageIcon } from "lucide-react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // User ID or Phone Number
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Forgot Password Modal States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const router = useRouter();

  // Login Submit Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Submit Handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMsg("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: forgotIdentifier }),
      });

      const data = await res.json();

      if (res.ok) {
        setForgotMsg(data.message);
      } else {
        setForgotMsg(data.error || "Failed to send SMS");
      }
    } catch (err) {
      console.error("Forgot Pass Frontend Error:", err);
      setForgotMsg("Network/Server connection failed!");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Login Card */}
      <div
        className="w-full max-w-md bg-[#0b101d]/90 border border-white/10 rounded-[32px] p-6 sm:p-8 space-y-6 backdrop-blur-3xl shadow-2xl relative z-10"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Logo Header */}
        <div className="text-center space-y-2">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white border border-blue-400/30 mx-auto shadow-[0_8px_20px_rgba(37,99,235,0.4)]"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.9), rgba(37, 99, 235, 0.8))",
            }}
          >
            <ImageIcon className="w-6 h-6" />
          </div>
          <h1 className="font-extrabold text-xl text-white tracking-wide">
            Photo<span className="text-blue-500">Wallet</span>
          </h1>
          <p className="text-xs text-slate-400">Enter User ID or Phone Number to Login</p>
        </div>

        {/* Login Form (With Password Save Protection) */}
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          {/* Fake inputs to prevent browser autofill and save password dialogs */}
          <input type="text" name="prevent_autofill_user" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="password" name="prevent_autofill_pass" className="hidden" tabIndex={-1} autoComplete="new-password" />

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">User ID / Phone</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="user_identifier_secure"
                autoComplete="off"
                placeholder="User ID (e.g. 1) or Phone (017...)"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-[#050811]/80 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(true);
                  setForgotMsg("");
                }}
                className="text-[11px] text-blue-400 hover:text-blue-300 cursor-pointer transition"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                name="user_password_secure"
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050811]/80 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-center text-red-400 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-2xl transition shadow-lg shadow-blue-600/30 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#0b101d] border border-white/10 rounded-3xl p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-full bg-white/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-2 border border-blue-500/30">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Get Password via SMS</h3>
              <p className="text-[11px] text-slate-400">Enter User ID or Phone to get SMS password</p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-3 pt-2" autoComplete="off">
              <div>
                <input
                  type="text"
                  placeholder="User ID (e.g. 1) or Phone (017...)"
                  value={forgotIdentifier}
                  onChange={(e) => setForgotIdentifier(e.target.value)}
                  className="w-full bg-[#050811] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {forgotMsg && (
                <p className="text-[11px] text-center text-blue-400 bg-blue-500/10 p-2 rounded-xl border border-blue-500/20">
                  {forgotMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={forgotLoading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition cursor-pointer disabled:opacity-50"
              >
                {forgotLoading ? "Sending SMS..." : "Send Password SMS"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
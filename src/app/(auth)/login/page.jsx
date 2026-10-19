"use client";

import React from "react";
import { Lock, Phone } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050811] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#0b101d] border border-slate-800 rounded-[32px] p-6 space-y-6 shadow-2xl">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-extrabold text-white">PhotoWallet</h1>
          <p className="text-xs text-slate-400">Sign in to your account</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="017XXXXXXXX"
                className="w-full bg-[#050811] border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#050811] border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
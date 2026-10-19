"use client";

import React from "react";
import { User, KeyRound } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-md mx-auto">
      <div className="bg-[#0b101d] border border-slate-800 rounded-[32px] p-6 space-y-5 text-center shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 mx-auto flex items-center justify-center font-bold text-xl text-white shadow-xl">
          SS
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Samsad Sakin</h3>
          <p className="text-xs text-slate-400 mt-0.5">Admin Account</p>
        </div>

        <div className="pt-2 border-t border-slate-800 space-y-3 text-left">
          <p className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-blue-400" /> Change Password
          </p>
          <input
            type="password"
            placeholder="Current Password"
            className="w-full bg-[#050811] border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full bg-[#050811] border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
          <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-2xl transition shadow-lg shadow-blue-600/30">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import React from "react";
import { HardDrive, Plus } from "lucide-react";

export default function DrivesPage() {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-400" /> Connected Google Drives
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage service accounts and drive switching</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-lg transition">
          <Plus className="w-4 h-4" /> Add Drive
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="bg-[#0b101d] border border-slate-800 rounded-[24px] p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Drive {num}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                num === 1 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-800 text-slate-400 border-slate-700"
              }`}>
                {num === 1 ? "Active Target" : "Standby"}
              </span>
            </div>
            <p className="text-lg font-bold text-white">5.1 GB / 15 GB</p>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: `${num * 25}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
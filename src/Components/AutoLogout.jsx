"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Clock, LogOut, Infinity as InfinityIcon } from "lucide-react";

export default function AutoLogout() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(15);
  const timeoutRef = useRef(null);
  const promptTimeoutRef = useRef(null);
  const router = useRouter();

  const PROMPT_DELAY = 60 * 1000; // 1 Minute

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Auto logout failed");
    }
  };

  const startLogoutTimer = (option) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (option === "unlimited") return;

    const ms = Number(option) * 60 * 1000;
    timeoutRef.current = setTimeout(() => {
      handleLogout();
    }, ms);
  };

  const resetPromptTimer = () => {
    if (promptTimeoutRef.current) clearTimeout(promptTimeoutRef.current);
    promptTimeoutRef.current = setTimeout(() => {
      setShowModal(true);
    }, PROMPT_DELAY);
  };

  useEffect(() => {
    resetPromptTimer();
    startLogoutTimer(selectedOption);

    // 🔒 ট্যাব বা ব্রাউজার বন্ধ করলে সাথে সাথে সেশন ডিলিট করার লজিক
    const handleTabClose = () => {
      // sendBeacon ব্রাউজার ক্লোজ করার মুহূর্তেও ব্যাকএন্ডে রিকোয়েস্ট পাঠাতে পারে
      navigator.sendBeacon("/api/auth/logout");
    };

    window.addEventListener("pagehide", handleTabClose);

    return () => {
      if (promptTimeoutRef.current) clearTimeout(promptTimeoutRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("pagehide", handleTabClose);
    };
  }, []);

  const handleConfirmStay = () => {
    setShowModal(false);

    if (selectedOption === "unlimited") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (promptTimeoutRef.current) clearTimeout(promptTimeoutRef.current);
      return;
    }

    resetPromptTimer();
    startLogoutTimer(selectedOption);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-[#0b101d] border border-white/10 rounded-3xl p-6 text-center space-y-5 shadow-2xl relative">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto shadow-lg">
          <Clock className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-base font-bold text-white">Inactivity Alert</h3>
          <p className="text-xs text-slate-400 mt-1">
            No page reload detected for 1 minute. Select how long you want to stay logged in:
          </p>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {[5, 15, 30, 45].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setSelectedOption(mins)}
              className={`py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                selectedOption === mins
                  ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/40"
                  : "bg-[#050811] border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              {mins}m
            </button>
          ))}

          <button
            type="button"
            onClick={() => setSelectedOption("unlimited")}
            className={`py-2 rounded-xl text-xs font-bold transition border flex flex-col items-center justify-center cursor-pointer ${
              selectedOption === "unlimited"
                ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/40"
                : "bg-[#050811] border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            <InfinityIcon className="w-3.5 h-3.5" />
            <span className="text-[9px]">Unlimited</span>
          </button>
        </div>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={handleConfirmStay}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-2xl transition shadow-lg shadow-blue-600/30 cursor-pointer active:scale-95 capitalize"
          >
            Stay Logged In ({selectedOption === "unlimited" ? "Unlimited" : `${selectedOption}m`})
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out Now
          </button>
        </div>
      </div>
    </div>
  );
}
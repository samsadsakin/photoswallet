"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Folder,
  Image as ImageIcon,
  Upload,
  HardDrive,
  User,
  Users as UsersIcon,
  Search,
  Bell,
  Cloud,
  Plus,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    fetch("/api/user/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 40) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // নেভিগেশন তালিকা
  const allNavItems = useMemo(() => {
    const items = [
      { href: "/", label: "Home", icon: Home },
      { href: "/albums", label: "Albums", icon: Folder },
      { href: "/gallery", label: "Gallery", icon: ImageIcon },
      { href: "/upload", label: "Upload", icon: Upload },
      { href: "/admin/drives", label: "Drives", icon: HardDrive },
    ];

    if (user?.role === "admin") {
      items.push({ href: "/admin/users", label: "Users", icon: UsersIcon });
    }

    items.push({ href: "/profile", label: "Profile", icon: User });

    return items;
  }, [user]);

  // বর্তমান অ্যাক্টিভ পেজটি হাইড রেখে তালিকা তৈরি
  const visibleNavItems = useMemo(() => {
    return allNavItems.filter((item) => item.href !== pathname);
  }, [allNavItems, pathname]);

  if (!mounted) return null;

  return (
    <>
      {/* PC SIDEBAR */}
      <aside className="hidden lg:flex w-72 p-4 shrink-0 h-screen sticky top-0 z-40">
        <div
          className="w-full h-full rounded-[30px] p-5 flex flex-col justify-between border border-white/10 backdrop-blur-3xl overflow-y-auto no-scrollbar"
          style={{
            background: "rgba(10, 15, 29, 0.75)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
          }}
        >
          <div>
            <Link href="/" className="flex items-center gap-3 px-2 py-3 mb-6">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white border border-blue-400/30 shadow-[0_8px_20px_rgba(37,99,235,0.4)]"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.9), rgba(37, 99, 235, 0.8))",
                }}
              >
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg leading-none tracking-wide text-white">
                  Photo<span className="text-blue-500">Wallet</span>
                </h1>
                <p className="text-[10px] text-slate-400 mt-1">Our Moments, Always Safe</p>
              </div>
            </Link>

            <nav className="space-y-1.5 text-xs font-semibold relative">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-slate-400 hover:text-white transition-all relative z-10 hover:bg-white/5 cursor-pointer"
                  >
                    <Icon className="w-4 h-4 z-10" />
                    <span className="z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3 mt-6">
            <div
              className="rounded-2xl p-4 border border-white/10 backdrop-blur-xl"
              style={{ background: "rgba(255, 255, 255, 0.03)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-blue-500/20 rounded-xl text-blue-400">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Storage Overview</h4>
                  <p className="text-[10px] text-slate-400">Total (3 Drives)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 my-3">
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-400"
                      strokeDasharray="32, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-extrabold text-white">32%</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">14.4 GB / 45 GB</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-200">Secure Cloud</p>
                <p className="text-[9px] text-slate-400 leading-tight">Protected personal photo storage.</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVBAR */}
      <div
        className={`lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-50 transition-all duration-500 ease-out ${
          showNavbar ? "translate-y-0 opacity-100 scale-100" : "translate-y-28 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div
          className="relative px-2 py-2 rounded-[28px] flex items-center justify-around border border-white/20 backdrop-blur-3xl overflow-x-auto no-scrollbar"
          style={{
            background: "rgba(10, 15, 29, 0.85)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
          }}
        >
          {visibleNavItems.map((item) => {
            const Icon = item.icon;

            if (item.label === "Upload") {
              return (
                <div key={item.href} className="px-1 shrink-0">
                  <Link
                    href={item.href}
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white border border-white/30 -mt-5 shadow-[0_10px_25px_rgba(37,99,235,0.6)] active:scale-90 transition cursor-pointer"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.95), rgba(37, 99, 235, 0.9))",
                    }}
                  >
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 min-w-[50px] flex flex-col items-center gap-0.5 py-1 rounded-2xl relative text-slate-400 hover:text-slate-200 transition-colors cursor-pointer shrink-0"
              >
                <Icon className="w-4 h-4 z-10" />
                <span className="text-[9px] tracking-tight z-10 truncate max-w-[55px] text-center">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

// TOP HEADER
export function TopHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header
      className="sticky top-0 z-30 px-4 lg:px-8 py-3.5 border-b border-white/10 flex items-center justify-between backdrop-blur-2xl"
      style={{
        background: "rgba(5, 8, 17, 0.75)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Link href="/" className="flex items-center gap-2.5 lg:hidden">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white border border-blue-400/30"
          style={{ background: "radial-gradient(circle, rgba(96, 165, 250, 0.9), rgba(37, 99, 235, 0.8))" }}
        >
          <ImageIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-wide text-white leading-none">
            Photo<span className="text-blue-500">Wallet</span>
          </h1>
          <p className="text-[9px] text-slate-400 mt-0.5">Secure Cloud Storage</p>
        </div>
      </Link>

      <div className="hidden lg:relative lg:flex items-center flex-1 max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search photos, albums..."
          className="w-full bg-[#0b101d]/80 border border-slate-800/80 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/80 transition"
        />
      </div>

      <div className="flex items-center gap-2.5">
        <button className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white backdrop-blur-xl transition active:scale-95 shadow-lg cursor-pointer">
          <Bell className="w-4 h-4" />
        </button>
        <Link href="/profile" className="flex items-center gap-3 pl-2 lg:border-l lg:border-white/10">
          <div
            className="w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-bold text-white border border-white/20 shadow-lg tracking-wider"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}
          >
            {user ? getInitials(user.name) : "..."}
          </div>
          <div className="hidden lg:block text-xs">
            <p className="font-semibold text-slate-200 leading-none">{user ? user.name : "Loading..."}</p>
            <p className="text-[10px] text-slate-400 mt-0.5 capitalize">{user ? `${user.role} Account` : "Account"}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
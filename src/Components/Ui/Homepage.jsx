"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Folder,
  Image as ImageIcon,
  Upload,
  HardDrive,
  User,
  Settings,
  Search,
  Bell,
  Cloud,
  ChevronRight,
  MoreVertical,
  Plus,
  ShieldCheck,
  FolderSync,
  LayoutGrid,
} from "lucide-react";

export default function AnimatedGlassyHomePage() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("home");

  // Scroll Down Hide / Scroll Up Show Logic
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

  const albums = [
    { name: "Nature", photos: 24, bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500" },
    { name: "Travel", photos: 18, bg: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500" },
    { name: "Friends", photos: 36, bg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500" },
    { name: "Pets", photos: 12, bg: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500" },
  ];

  const recentPhotos = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500",
    "https://images.unsplash.com/photo-1477959858617-67f30ac7261e?w=500",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
  ];

  const tabContentVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const allNavItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "albums", label: "Albums", icon: Folder },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "drives", label: "My Drive", icon: HardDrive },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Active option filter out array
  const visibleNavItems = useMemo(() => {
    return allNavItems.filter((item) => item.id !== activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans pb-32 lg:pb-10 selection:bg-blue-600 flex relative overflow-x-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

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
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 py-3 mb-6">
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
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 text-xs font-semibold relative">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-slate-400 hover:text-white transition-all relative z-10 hover:bg-white/5"
                  >
                    <Icon className="w-4 h-4 z-10" />
                    <span className="z-10">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Storage Section */}
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

              <div className="space-y-2 text-[10px] pt-1">
                <div>
                  <div className="flex justify-between font-medium text-slate-300 mb-0.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Drive 1 (Main)
                    </span>
                    <span>48%</span>
                  </div>
                  <p className="text-[9px] text-slate-500 pl-3.5">7.2 GB / 15 GB</p>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: "48%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-300 mb-0.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Drive 2
                    </span>
                    <span>34%</span>
                  </div>
                  <p className="text-[9px] text-slate-500 pl-3.5">5.1 GB / 15 GB</p>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "34%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-300 mb-0.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" /> Drive 3
                    </span>
                    <span>14%</span>
                  </div>
                  <p className="text-[9px] text-slate-500 pl-3.5">2.1 GB / 15 GB</p>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: "14%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-200">Secure & Private</p>
                <p className="text-[9px] text-slate-400 leading-tight">Your photos are protected with industry standard security.</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <header
          className="sticky top-0 z-30 px-4 lg:px-8 py-3.5 border-b border-white/10 flex items-center justify-between backdrop-blur-2xl"
          style={{
            background: "rgba(5, 8, 17, 0.75)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="flex items-center gap-2.5 lg:hidden">
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
          </div>

          <div className="hidden lg:relative lg:flex items-center flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search photos, albums..."
              className="w-full bg-[#0b101d]/80 border border-slate-800/80 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/80 transition"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <button className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white backdrop-blur-xl transition active:scale-95 shadow-lg">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 pl-2 lg:border-l lg:border-white/10">
              <div
                className="w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-bold text-white border border-white/20 shadow-lg"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}
              >
                SS
              </div>
              <div className="hidden lg:block text-xs">
                <p className="font-semibold text-slate-200 leading-none">Samsad Sakin</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home-tab"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="relative rounded-[32px] overflow-hidden border border-slate-800/90 p-6 lg:p-8 min-h-[160px] lg:min-h-[200px] flex items-end shadow-2xl bg-[#090e1c]">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
                    alt="Header background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/40 to-transparent" />

                  <div className="relative z-10 w-full">
                    <h2 className="text-xl lg:text-3xl font-extrabold text-white tracking-wide">
                      Welcome Back, <span className="text-blue-500">Samsad Sakin!</span>
                    </h2>
                    <p className="text-xs text-slate-300 mt-1">Your personal photo and album manager</p>

                    <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                      <div className="bg-[#0b101d]/80 backdrop-blur border border-slate-800/80 rounded-2xl p-2.5 flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                        <div className="text-[11px]">
                          <p className="font-semibold text-slate-200">Secure Login</p>
                          <p className="text-[9px] text-slate-400">(Phone + Password)</p>
                        </div>
                      </div>

                      <div className="bg-[#0b101d]/80 backdrop-blur border border-slate-800/80 rounded-2xl p-2.5 flex items-center gap-2.5">
                        <Cloud className="w-4 h-4 text-blue-400 shrink-0" />
                        <div className="text-[11px]">
                          <p className="font-semibold text-slate-200">Google Drive Storage</p>
                          <p className="text-[9px] text-slate-400">(Multiple Drives)</p>
                        </div>
                      </div>

                      <div className="bg-[#0b101d]/80 backdrop-blur border border-slate-800/80 rounded-2xl p-2.5 flex items-center gap-2.5">
                        <FolderSync className="w-4 h-4 text-blue-400 shrink-0" />
                        <div className="text-[11px]">
                          <p className="font-semibold text-slate-200">Auto Backup</p>
                          <p className="text-[9px] text-slate-400">& Protection</p>
                        </div>
                      </div>

                      <div className="bg-[#0b101d]/80 backdrop-blur border border-slate-800/80 rounded-2xl p-2.5 flex items-center gap-2.5">
                        <LayoutGrid className="w-4 h-4 text-blue-400 shrink-0" />
                        <div className="text-[11px]">
                          <p className="font-semibold text-slate-200">Easy Album</p>
                          <p className="text-[9px] text-slate-400">Management</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <section>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="font-bold text-xs lg:text-sm text-slate-200 flex items-center gap-1.5">
                      <Folder className="w-4 h-4 text-blue-400" /> My Albums
                    </h3>
                    <button
                      onClick={() => setActiveTab("albums")}
                      className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center font-semibold transition"
                    >
                      View All <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {albums.map((album, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.03, y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-[#0b101d] border border-slate-800/90 rounded-[24px] overflow-hidden shadow-xl hover:border-slate-700/80 cursor-pointer group"
                      >
                        <div className="h-28 lg:h-36 relative overflow-hidden">
                          <img src={album.bg} alt={album.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b101d] via-[#0b101d]/30 to-transparent" />
                        </div>
                        <div className="p-3.5 flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-slate-200">{album.name}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">{album.photos} photos</p>
                          </div>
                          <MoreVertical className="w-4 h-4 text-slate-500" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="font-bold text-xs lg:text-sm text-slate-200 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-blue-400" /> Recent Uploads
                    </h3>
                    <button
                      onClick={() => setActiveTab("gallery")}
                      className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center font-semibold transition"
                    >
                      View All <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                    {recentPhotos.map((src, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="aspect-square rounded-[20px] overflow-hidden border border-slate-800/80 bg-[#0b101d] shadow-lg cursor-pointer"
                      >
                        <img src={src} alt="Recent" className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === "albums" && (
              <motion.div
                key="albums-tab"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Folder className="w-5 h-5 text-blue-400" /> Albums Overview
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...albums, ...albums].map((album, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="bg-[#0b101d] border border-slate-800/90 rounded-[24px] overflow-hidden shadow-xl hover:border-slate-700/80 cursor-pointer group"
                    >
                      <div className="h-32 relative overflow-hidden">
                        <img src={album.bg} alt={album.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b101d] via-[#0b101d]/30 to-transparent" />
                      </div>
                      <div className="p-3.5 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-200">{album.name}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{album.photos} photos</p>
                        </div>
                        <MoreVertical className="w-4 h-4 text-slate-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "gallery" && (
              <motion.div
                key="gallery-tab"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-400" /> All Gallery Photos
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...recentPhotos, ...recentPhotos].map((src, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      className="aspect-square rounded-[24px] overflow-hidden border border-slate-800 bg-[#0b101d] shadow-xl relative group cursor-pointer"
                    >
                      <img src={src} alt="Gallery item" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="text-xs font-semibold text-white bg-blue-600/80 px-3 py-1.5 rounded-full border border-blue-400/40">
                          View Image
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "upload" && (
              <motion.div
                key="upload-tab"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-8 border border-dashed border-blue-500/40 rounded-[32px] bg-[#0b101d]/60 backdrop-blur-xl text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Upload New Photos</h3>
                  <p className="text-xs text-slate-400 mt-1">Drag and drop images here or browse your device</p>
                </div>
                <button className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition">
                  Select Files
                </button>
              </motion.div>
            )}

            {activeTab === "drives" && (
              <motion.div
                key="drives-tab"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-blue-400" /> Connected Google Drives
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-[#0b101d] border border-slate-800 rounded-[24px] p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">Drive {num}</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Active
                        </span>
                      </div>
                      <p className="text-lg font-bold text-white">5.1 GB / 15 GB</p>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: `${num * 25}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div
                key="profile-tab"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-[#0b101d] border border-slate-800 rounded-[32px] p-6 space-y-4 max-w-md mx-auto text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 mx-auto flex items-center justify-center font-bold text-xl text-white shadow-xl">
                  SS
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Samsad Sakin</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Admin Account</p>
                </div>
                <button className="w-full py-2.5 bg-slate-800 border border-slate-700 text-xs font-semibold rounded-2xl text-slate-200 hover:bg-slate-700 transition">
                  Change Password
                </button>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings-tab"
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-[#0b101d] border border-slate-800 rounded-[32px] p-6 space-y-4 max-w-md mx-auto"
              >
                <h3 className="text-base font-bold text-white text-center">App Settings</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-slate-300">Auto Storage Sync</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-slate-300">Dark Mode</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* MOBILE NAVBAR (HIDDEN ACTIVE OPTION) */}
      <div
        className={`lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 transition-all duration-500 ease-out ${
          showNavbar ? "translate-y-0 opacity-100 scale-100" : "translate-y-28 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div
          className="relative px-3 py-2 rounded-[28px] flex items-center justify-between border border-white/20 backdrop-blur-3xl"
          style={{
            background: "rgba(10, 15, 29, 0.8)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
          }}
        >
          {visibleNavItems.slice(0, 5).map((item) => {
            const Icon = item.icon;

            if (item.id === "upload") {
              return (
                <div key={item.id} className="px-1">
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white border border-white/30 -mt-5 shadow-[0_10px_25px_rgba(37,99,235,0.6)] active:scale-90 transition"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.95), rgba(37, 99, 235, 0.9))",
                    }}
                  >
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </button>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-2xl relative text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Icon className="w-5 h-5 z-10" />
                <span className="text-[10px] tracking-tight z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
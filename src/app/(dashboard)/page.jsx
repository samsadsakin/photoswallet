"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Folder,
  Image as ImageIcon,
  ChevronRight,
  MoreVertical,
  ShieldCheck,
  Cloud,
  FolderSync,
  LayoutGrid,
} from "lucide-react";

export default function AnimatedGlassyHomePage() {
  const albums = [
    { id: "nature", name: "Nature", photos: 24, bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500" },
    { id: "travel", name: "Travel", photos: 18, bg: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500" },
    { id: "friends", name: "Friends", photos: 36, bg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500" },
    { id: "pets", name: "Pets", photos: 12, bg: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500" },
  ];

  const recentPhotos = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500",
    "https://images.unsplash.com/photo-1477959858617-67f30ac7261e?w=500",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Banner */}
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

      {/* Albums Section */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-xs lg:text-sm text-slate-200 flex items-center gap-1.5">
            <Folder className="w-4 h-4 text-blue-400" /> My Albums
          </h3>
          <Link
            href="/albums"
            className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center font-semibold transition"
          >
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album) => (
            <Link key={album.id} href={`/albums/${album.id}`}>
              <motion.div
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
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Uploads Section */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-xs lg:text-sm text-slate-200 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-blue-400" /> Recent Uploads
          </h3>
          <Link
            href="/gallery"
            className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center font-semibold transition"
          >
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {recentPhotos.map((src, idx) => (
            <Link key={idx} href="/gallery">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="aspect-square rounded-[20px] overflow-hidden border border-slate-800/80 bg-[#0b101d] shadow-lg cursor-pointer"
              >
                <img src={src} alt="Recent" className="w-full h-full object-cover" />
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
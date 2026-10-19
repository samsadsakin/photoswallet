"use client";

import React from "react";
import Link from "next/link";
import { Folder, MoreVertical, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function AlbumsPage() {
  const albums = [
    { id: "nature", name: "Nature", photos: 24, bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500" },
    { id: "travel", name: "Travel", photos: 18, bg: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500" },
    { id: "friends", name: "Friends", photos: 36, bg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500" },
    { id: "pets", name: "Pets", photos: 12, bg: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500" },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Folder className="w-5 h-5 text-blue-400" /> All Albums
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage and organize your photo collections</p>
        </div>
        <Link
          href="/admin/upload"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-lg transition"
        >
          <Plus className="w-4 h-4" /> Create Album
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((album) => (
          <Link key={album.id} href={`/albums/${album.id}`}>
            <motion.div
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
          </Link>
        ))}
      </div>
    </div>
  );
}
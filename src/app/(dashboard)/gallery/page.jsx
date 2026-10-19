"use client";

import React from "react";
import { Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function GalleryPage() {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-400" /> Photo Gallery
          </h1>
          <p className="text-xs text-slate-400 mt-1">All uploaded photos in full grid</p>
        </div>
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
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Upload, FolderPlus, Image as ImageIcon, X } from "lucide-react";

export default function UploadPage() {
  const [albumName, setAlbumName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <Upload className="w-5 h-5 text-blue-400" /> Upload Photos
        </h1>
        <p className="text-xs text-slate-400">
          Upload your photos directly to cloud storage
        </p>
      </div>

      <div className="bg-[#0b101d] border border-slate-800 rounded-[32px] p-6 space-y-5 shadow-2xl">
        {/* Album Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <FolderPlus className="w-4 h-4 text-blue-400" /> Album Name
          </label>
          <input
            type="text"
            placeholder="e.g. Vacation 2026, Friends, Family"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            className="w-full bg-[#050811] border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/80 transition"
          />
        </div>

        {/* Drag & Drop Area */}
        <div className="relative border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 text-center transition bg-white/5 group cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
            <ImageIcon className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-slate-200">
            Click or drag & drop images here
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            PNG, JPG, WEBP formats supported
          </p>
        </div>

        {/* Selected Image Previews */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-300">
              Selected Files ({selectedFiles.length})
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto no-scrollbar p-1">
              {selectedFiles.map((item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden border border-slate-800 group"
                >
                  <img
                    src={item.preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white p-1 rounded-full backdrop-blur-sm transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          disabled={selectedFiles.length === 0}
          className={`w-full py-3 text-xs font-bold rounded-2xl transition shadow-lg ${
            selectedFiles.length > 0
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 cursor-pointer"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {selectedFiles.length > 0
            ? `Upload ${selectedFiles.length} Photo(s)`
            : "Select Photos to Upload"}
        </button>
      </div>
    </div>
  );
}
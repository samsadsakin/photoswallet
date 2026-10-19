"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, Trash2, Edit2, User, X } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    phone: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEdit = Boolean(editingId);
    const endpoint = "/api/admin/users";
    const method = isEdit ? "PUT" : "POST";
    const payload = isEdit ? { id: editingId, ...formData } : formData;

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      resetForm();
      fetchUsers();
    } else {
      const err = await res.json();
      alert(err.error);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      userId: user.userId || "",
      name: user.name || "",
      phone: user.phone || "",
      password: "", // পাসওয়ার্ড খালি থাকবে, পরিবর্তন করতে চাইলে নতুনটি লিখবে
      role: user.role || "user",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ userId: "", name: "", phone: "", password: "", role: "user" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-white flex items-center gap-2">
        <User className="w-5 h-5 text-blue-400" /> User Management
      </h1>

      {/* User Create / Edit Form */}
      <form onSubmit={handleSubmit} className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">
            {editingId ? "Edit User Details" : "Add New User"}
          </h3>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="User ID (e.g. 1, 22)"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            className="bg-[#050811] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-[#050811] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-[#050811] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            required
          />
          <input
            type="password"
            placeholder={editingId ? "New Password (leave blank to keep old)" : "Password"}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="bg-[#050811] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            required={!editingId}
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="bg-[#050811] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white sm:col-span-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-500 transition"
        >
          {editingId ? "Update User" : "Add User"}
        </button>
      </form>

      {/* Users List */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-200">Existing Users</h3>
        <div className="grid grid-cols-1 gap-2">
          {users.map((u) => (
            <div
              key={u.id}
              className="bg-[#0b101d] border border-slate-800 p-3.5 rounded-xl flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-white">
                  {u.name} <span className="text-[10px] text-blue-400">(ID: {u.userId})</span>{" "}
                  <span className="text-[10px] text-slate-500">[{u.role}]</span>
                </p>
                <p className="text-[10px] text-slate-400">{u.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
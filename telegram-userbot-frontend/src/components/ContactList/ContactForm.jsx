import React, { useState } from "react";
import { api } from "../../services/api";

export default function ContactForm({ onAdd, onClose }) {
  const [form, setForm] = useState({ user_id: "", name: "" });

  const handleAdd = async () => {
    if (!form.user_id || !form.name) return;

    try {
      await api.post("/api/contacts/contact", form);
      onAdd(form);
      setForm({ user_id: "", name: "" });
      onClose();
    } catch (err) {
      console.error("❌ Gagal simpan kontak:", err.response?.data || err.message);
      alert("Gagal menyimpan kontak ke database.");
    }
  };

  return (
    <div className="space-y-2">
      <input
        className="bg-gray-700 p-2 w-full text-sm rounded"
        placeholder="ID Telegram"
        value={form.user_id}
        onChange={(e) => setForm({ ...form, user_id: e.target.value })}
      />
      <input
        className="bg-gray-700 p-2 w-full text-sm rounded"
        placeholder="Nama"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 text-sm rounded text-white"
        >
          Simpan
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-600 hover:bg-gray-700 p-2 text-sm rounded text-white"
        >
          Batal
        </button>
      </div>
    </div>
  );
}

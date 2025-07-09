import React from "react";
import { useState, useEffect, useRef } from "react";
import { api } from "../../services/api";

export default function ContactMenu({ contact, refreshContacts, onEdit }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const handleDelete = async () => {
    const confirmDelete = confirm(`Yakin ingin menghapus kontak "${contact.name}"?`);
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/contacts/${contact.user_id}`);
      alert("Kontak berhasil dihapus.");
      refreshContacts();
    } catch (err) {
      alert("Gagal menghapus kontak: " + err.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        title="Opsi Kontak"
        className="text-gray-400 hover:text-white text-xl"
      >
        ⋮
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded shadow z-10">
          <button
            onClick={() => {
              onEdit();
              setShowMenu(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-600 text-sm text-white"
          >
            ✏️ Edit Nama
          </button>
          <button
            onClick={handleDelete}
            className="block w-full px-4 py-2 text-left hover:bg-gray-600 text-sm text-red-400"
          >
            🗑️ Hapus Kontak
          </button>
        </div>
      )}
    </div>
  );
}

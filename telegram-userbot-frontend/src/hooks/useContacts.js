import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function useContacts() {
  const [contacts, setContacts] = useState([]);

  const refreshContacts = async () => {
    try {
      const res = await api.get("/api/contacts");
      setContacts(res.data || []);
    } catch (err) {
      console.error("❌ Gagal memuat kontak:", err.message);
    }
  };

  useEffect(() => {
    refreshContacts();
  }, []);

  const addContact = async (contact) => {
    try {
      await api.post("/api/contacts/contact", contact);
      refreshContacts();
    } catch (err) {
      console.error("❌ Gagal simpan kontak:", err.message);
      alert("Gagal menyimpan kontak.");
    }
  };

  return { contacts, refreshContacts, addContact };
}

const db = require("../config/db");

exports.saveContact = (req, res) => {
  const { user_id, name } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({ error: "user_id dan name wajib diisi." });
  }

  db.query(
    `INSERT INTO contacts (user_id, name)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name)`,
    [user_id, name],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Gagal menyimpan kontak." });
      }
      return res.status(200).json({ success: true });
    }
  );
};

exports.getAllContacts = (req, res) => {
  db.query("SELECT user_id, name FROM contacts", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Gagal ambil kontak." });
    }
    res.json(results);
  });
};

exports.updateContact = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name harus diisi." });
  }

  db.query(
    "UPDATE contacts SET name = ? WHERE user_id = ?",
    [name, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Gagal update kontak." });
      }
      res.status(200).json({ success: true });
    }
  );
};

exports.deleteContact = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM contacts WHERE user_id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Gagal hapus kontak." });
    }
    res.status(200).json({ success: true });
  });
};

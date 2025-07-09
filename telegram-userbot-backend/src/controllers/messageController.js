const db = require("../config/db");
const sentiment = require("../utils/sentiment");
const client = require("../telegram/client");

exports.sendMessage = async (req, res) => {
  const { userId, message, username } = req.body;

  if (!userId || !message || !username) {
    return res.status(400).json({ error: "Data tidak lengkap." });
  }

  try {
    await client.sendMessage(userId, { message });
    const label = sentiment(message);

    db.query(
      "INSERT INTO messages (user_id, username, message, sentiment) VALUES (?, ?, ?, ?)",
      [userId, username, message, label],
      (err) => {
        if (err) return res.status(500).json({ error: "Gagal simpan ke database." });
        return res.status(200).json({ success: true });
      }
    );
  } catch (err) {
    console.error("❌ Gagal kirim pesan:", err.message);
    res.status(500).json({ error: "Gagal kirim pesan." });
  }
};

exports.getMessages = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT user_id, username, message, sentiment, created_at FROM messages WHERE user_id = ? ORDER BY created_at ASC",
    [id],
    (err, results) => {
      if (err) {
        console.error("❌ Gagal ambil pesan dari DB:", err.message);
        return res.status(500).json({ error: "Gagal ambil pesan" });
      }
      res.json(results);
    }
  );
};

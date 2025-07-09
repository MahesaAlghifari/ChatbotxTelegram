const db = require("../config/db");

async function saveContact({ telegram_id, username, first_name, last_name }) {
  try {
    await db.query(`
      INSERT INTO contacts (telegram_id, username, first_name, last_name)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        username = VALUES(username),
        first_name = VALUES(first_name),
        last_name = VALUES(last_name)
    `, [telegram_id, username, first_name, last_name]);
  } catch (err) {
    console.error("❌ Gagal menyimpan kontak:", err.message);
  }
}

module.exports = saveContact;

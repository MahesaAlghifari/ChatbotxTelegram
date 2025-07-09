const { NewMessage } = require("telegram/events");
const sentiment = require("../../utils/sentiment");
const db = require("../../config/db");
const autoResponses = require("../responses/autoResponses");

async function messageHandler(event, client) {
  const messageText = event.message.message;
  const sender = await event.message.getSender();
  const userId = BigInt(sender.id).toString();
  const username = sender.username || null;
  const fullName = `${sender.firstName || ""} ${sender.lastName || ""}`.trim();

  db.query("SELECT user_id FROM contacts", async (err, results) => {
    if (err) return console.error("❌ Gagal cek kontak:", err.message);

    const allowedIds = results.map((r) => r.user_id);
    if (!allowedIds.includes(userId)) {
      console.log("⛔ Pesan dari non-kontak, tidak disimpan");
      return;
    }

    const sentimentLabel = sentiment(messageText);
    console.log("📩 Pesan masuk dari kontak:");
    console.log({ userId, username, fullName, messageText, sentiment: sentimentLabel });

    db.query(
      "INSERT INTO messages (user_id, username, message, sentiment) VALUES (?, ?, ?, ?)",
      [userId, username || fullName || "unknown", messageText, sentimentLabel],
      (err) => {
        if (err) return console.error("❌ Gagal menyimpan pesan:", err.message);
        console.log("✅ Pesan disimpan.");
      }
    );

    global._io.emit("bubble", {
      from: userId,
      to: "me",
      text: messageText,
      sentiment: sentimentLabel,
      time: new Date().toISOString(),
    });

    const lower = messageText.trim().toLowerCase();
    for (const { keywords, reply } of autoResponses) {
      if (keywords.some((kw) => lower.includes(kw))) {
        await client.sendMessage(userId, { message: reply });

        const botSentiment = sentiment(reply);
        db.query(
          "INSERT INTO messages (user_id, username, message, sentiment) VALUES (?, ?, ?, ?)",
          [userId, "mahesa_bot", reply, botSentiment],
          (err) => {
            if (err) return console.error("❌ Gagal simpan balasan bot:", err.message);
            console.log("🤖 Balasan bot dikirim dan disimpan.");
          }
        );

        global._io.emit("bubble", {
          from: "me",
          to: userId,
          text: reply,
          sentiment: botSentiment,
          time: new Date().toISOString(),
        });

        break;
      }
    }
  });
}

module.exports = messageHandler;

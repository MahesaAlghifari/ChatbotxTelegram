const express = require("express");
const cors = require("cors");
require("dotenv").config();
const messageRoutes = require("./routes/messageRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.get("/", (_, res) => res.send("🚀 API aktif"));

app.use("/api/messages", messageRoutes);
app.use("/api/contacts", contactRoutes);

app.use((err, req, res, next) => {
  console.error("🔥 Error middleware:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;

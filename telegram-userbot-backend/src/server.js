const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const client = require("./telegram/client");
const setupHandlers = require("./telegram/handlers/setupHandlers");
const input = require("input");
require("dotenv").config(); 

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

global._io = io;

(async () => {
  await client.start({
    phoneNumber: () => input.text("Nomor: "),
    password: () => input.text("Password (2FA): "),
    phoneCode: () => input.text("OTP: "),
    onError: (err) => console.error(err),
  });

  setupHandlers(client);

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Backend berjalan di http://localhost:${PORT}`);
  });
})();

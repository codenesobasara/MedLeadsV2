require("dotenv").config();
console.log("JWT_SECRET loaded?", !!process.env.JWT_SECRET);
const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");
const authroutes = require("./Routes/authRoutes");
const hostroutes = require("./Routes/HostRoutes");
const sequelize = require("./mainConfig");
const { authMiddleWare, requireHost } = require("./AuthService/AuthMiddleWare");
require("./Models/associations");



const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authroutes);
app.use("/api/host", authMiddleWare, requireHost, hostroutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const wss = new WebSocket.Server({ port: 8080 });
    app.locals.wss = wss;
    console.log("WebSocket server is running on ws://localhost:8080");

    wss.on("connection", (ws) => {
      console.log("Client connected");

      ws.send("Welcome to the WebSocket server!");

      ws.on("message", (message) => {
        const text = message.toString();
        console.log("Received message:", text);

        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(`Server received: ${text}`);
          }
        });
      });

      ws.on("close", () => console.log("Client disconnected"));
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
    process.exit(1);
  });
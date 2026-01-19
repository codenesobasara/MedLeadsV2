const WebSocket = require("ws");

function broadcast(app, type, payload) {
  const wss = app.locals.wss;
  if (!wss) return;
  const msg = JSON.stringify({ type, payload });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

module.exports = { broadcast };

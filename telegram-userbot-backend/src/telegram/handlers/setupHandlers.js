const { NewMessage } = require("telegram/events");
const messageHandler = require("./messageHandler");

function setupHandlers(client) {
  client.addEventHandler((event) => messageHandler(event, client), new NewMessage({}));
}

module.exports = setupHandlers;

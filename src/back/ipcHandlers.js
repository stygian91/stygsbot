/**
 * External dependencies:
 */
const { ipcMain } = require("electron");
const F = require("funky-lib");

/**
 * Internal dependencies:
 */
const initTwitchClient = require("./twitch");
const { getToken, setToken } = require("./passwordStorage");
const { promiseToEither } = require("../utils/promise");

const init = () => {
  ipcMain.handle("twitch:connect", twitchConnect);
};

const _connect = promiseToEither((channel, username, token) => {
  const client = initTwitchClient(channel, username, token);
  initTwitchEvents(client);
  return client.connect();
});

const twitchConnect = async (event, channel, username, token) => {
  token
    ? (await _connect(channel, username, token)).map(() =>
        setToken(username, token)
      )
    : (await getToken(username)).map((savedToken) =>
        _connect(channel, username, savedToken)
      );
};

const initTwitchEvents = (client) => {
  client.on("connected", () => {
    console.log("connected");
  });

  client.on("disconnected", () => {
    console.log("disconnected");
  });

  client.on("message", (target, context, message) => {
    // check if the message is a command
    // check if the message contains blacklisted words
    // ...
  });

  return client;
};

module.exports = init;

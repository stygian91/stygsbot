const tmi = require("tmi.js");

const { getToken, setToken } = require("./passwordStorage");
const { promiseToEither } = require("../utils/async");
const handleCommands = require('./commands');

let client;

const initTwitchClient = (channel, username, token) =>
  new tmi.client({
    channels: [channel],
    identity: {
      username,
      password: token,
    },
  });

const _connect = promiseToEither((channel, username, token) => {
  if (client) {
    throw new Error('client already connected');
  }

  client = initTwitchClient(channel, username, token);
  initTwitchEvents(client);
  return client.connect();
});

const twitchConnect = async (event, channel, username, token) => {
  const result = token
    ? (await _connect(channel, username, token)).map(() =>
        setToken(username, token)
      )
    : (await getToken(username)).map((savedToken) =>
        _connect(channel, username, savedToken)
      );

  const message = result.isRight ? '' : result.value.message;

  return {
    success: result.isRight,
    message,
  };
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
    handleCommands(target, context, message);
  });

  return client;
};

const twitchDisconnect = () => {
  if (client && !['CLOSING', 'CLOSED'].includes(client.readyState())) {
    return client.disconnect().then(() => {
      client = null;
    });
  }

  return Promise.resolve();
}

module.exports = {
  twitchConnect,
  twitchDisconnect,
};

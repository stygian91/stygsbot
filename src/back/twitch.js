const tmi = require("tmi.js");

const init = (channel, username, token) =>
  new tmi.client({
    channels: [channel],
    identity: {
      username,
      password: token,
    },
  });

module.exports = init;

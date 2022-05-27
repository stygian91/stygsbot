/**
 * External dependencies:
 */
const { ipcMain } = require("electron");

/**
 * Internal dependencies:
 */
const { twitchConnect, twitchDisconnect } = require('./twitch');

const init = () => {
  ipcMain.handle("twitch:connect", twitchConnect);
  ipcMain.handle("twitch:disconnect", twitchDisconnect);
};

module.exports = init;

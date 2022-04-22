const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  twitchConnect: (channel, username, token) => ipcRenderer.invoke('twitch:connect', channel, username, token),
  getPassword: (username) => ipcRenderer.invoke('cache:getPassword', username),
});

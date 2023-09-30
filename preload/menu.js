const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("menu", {
  quit: () => ipcRenderer.invoke("menuQuit"),
  editGalaxy: () => ipcRenderer.invoke("menuEditGalaxy"),
  openDirPicker: async () => {
    return await ipcRenderer.invoke("menuOpenDirectory");
  },
});

ipcRenderer.on("directory", (_event, value) => {
  contextBridge.exposeInMainWorld("prePickedDirectory", value);
});
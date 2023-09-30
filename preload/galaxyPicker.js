const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("menu", {
  quit: () => ipcRenderer.invoke("galaxyPickerQuit"),
  choose: async (galaxy) => {
    return await ipcRenderer.invoke("galaxyPickerOpen", galaxy);
  },
  getGalaxies: async () => {
    return await ipcRenderer.invoke("getGalaxies"); 
  },
  translate: (key) => {
    return ipcRenderer.invoke("translate", "galaxy", key, "en");
  },
});
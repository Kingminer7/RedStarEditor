const { ipcMain, dialog } = require("electron");
const index = require("../../index.js");

module.exports = function () {
  ipcMain.handle("menuQuit", () => {
    process.exit(0);
  });
  ipcMain.handle("menuOpenDirectory", async () => {
    return await index.utilities.directoryManager.openDirectory();
  });
  ipcMain.handle("menuEditGalaxy", () => {
    index.createPickFrame();
  });
};

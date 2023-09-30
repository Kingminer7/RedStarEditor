const { ipcMain } = require("electron");
const index = require("../../index.js");

module.exports = function () {
  ipcMain.handle("galaxyPickerQuit", () => {
    index.galaxyPickerWindow.close();
  });
  ipcMain.handle("galaxyPickerOpen", async (galaxy) => {
    index.galaxyPickerWindow.close();
    return null;
  });
};

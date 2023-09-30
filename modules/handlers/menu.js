const { ipcMain } = require("electron");

module.exports = function () {
  ipcMain.handle("menuQuit", () => {
    process.exit(0);
  });
  ipcMain.handle("menuOpenDirectory", () => {
    
  });
};

const index = require("../../index.js");
const { BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

module.exports = function () {
  const mW = new BrowserWindow({
    width: 500,
    height: 575,
    webPreferences: {
      preload: path.join(index.directory, "preload", "menu.js"),
      //devTools: false,
    },
    icon: path.join(index.directory, "pages", "assets", "redstar.ico"),
    resizable: false,
  });
  index.mainWindow = mW;
  mW.loadFile(path.join(index.directory, "pages", "html", "menu.html"));
  mW.show();
  mW.on("close", () => {
    process.exit(0);
  });
  mW.setMenuBarVisibility(false);
  index.rpc.updatePresence({
    state: "Idle",
    details: "In the menu",
    startTimestamp: Date.now(),
    largeImageKey: "logo",
    largeImageText: "Super Mario Galaxy 1 and 2 Editor",
    instance: true,
  });
};

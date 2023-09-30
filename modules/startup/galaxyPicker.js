const index = require("../../index.js");
const { BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

module.exports = function () {
  index.createPickFrame = function () {
    if (index.galaxyEditorWindow) return;
    var gPW;
    if (!index.galaxyPickerWindow) {
      gPW = new BrowserWindow({
        width: 500,
        height: 575,
        webPreferences: {
          preload: path.join(index.directory, "preload", "galaxyPicker.js"),
          //devTools: false,
        },
        icon: path.join(index.directory, "pages", "assets", "redstar.ico"),
        resizable: false,
      });
      index.galaxyPickerWindow = gPW;
      gPW.loadFile(path.join(index.directory, "pages", "html", "galaxyPicker.html"));
      gPW.on("close", () => {
        index.galaxyPickerWindow = undefined;
      });
      gPW.setMenuBarVisibility(false);
    } else gPW = index.galaxyPickerWindow;
    gPW.show();
    gPW.restore();
    gPW.focus();
  };
};

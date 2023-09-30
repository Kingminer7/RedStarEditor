// Modules
const fs = require("fs");
const path = require("path");
const { app, BrowserWindow, dialog, ipcMain } = require("electron");

// Variables
/// Windows
var mainWindow;
var galaxyPickerWindow;
var galaxyEditorWindow;

const utilities = {}

// Startup

// Access for modules.
module.exports = {
  mainWindow,
  galaxyPickerWindow,
  galaxyEditorWindow,
  directory: __dirname,
  utilities,
};

var startup = [];
var handlers = [];

const mFolds = fs
  .readdirSync(path.join(__dirname, "modules"))
  .filter((folder) =>
    fs.statSync(path.join(__dirname, "modules", folder)).isDirectory()
  );
mFolds.forEach((folder) => {
  const modules = fs
    .readdirSync(path.join(__dirname, "modules", folder))
    .filter((file) => file.endsWith(".js"));
  switch (folder) {
    case "startup":
      startup = modules;
      break;
    case "handlers":
      handlers = modules;
      break;
    case "util":
      modules.forEach((module) => {
        const m = require(path.join(__dirname, "modules", folder, module));
        utilities[m.moduleName] = m;
      });
      break;
    default:
      break;
  }
});

app.whenReady().then(() => {
  startup.forEach((module) => {
    require(path.join(__dirname, "modules", "startup", module))();
  });
  handlers.forEach((module) => {
    require(path.join(__dirname, "modules", "handlers", module))();
  });
});

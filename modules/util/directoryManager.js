const index = require("../../index.js");
const fs = require("fs");
const path = require("path");
const { dialog } = require("electron");

module.exports = {
  moduleName: "directoryManager",
  openDirectory: function (preChosen) {
    var directory;
    if (!preChosen)
      directory = dialog.showOpenDialogSync({
        properties: ["openDirectory"],
      });
    else dir = preChosen;
    index.fileLocation = directory.filePaths[0];
    if (!dir.cancelled) {
      dir.game = 0;
      if (!fs.existsSync(path.join(index.fileLocation, "StageData"))) {
        dir.game = false;
        return dir;
      }
      if (!fs.existsSync(path.join(index.fileLocation, "SystemData"))) {
        dir.game = false;
        return dir;
      }
      if (
        fs.existsSync(
          path.join(index.fileLocation, "StageData", "ObjNameTable.arc")
        )
      )
        dir.game = 1;
      if (
        fs.existsSync(
          path.join(index.fileLocation, "SystemData", "ObjNameTable.arc")
        )
      )
        dir.game = 2;
    } else return;
    if ((dir.game == 0) | (dir.game == false)) {
      index.fileLocation = undefined;
      return dir;
    }
    try {
      index.galaxies = [];
      const galaxies = fs
        .readdirSync(path.join(fileLocation, "StageData"))
        .filter((galaxy) =>
          fs
            .lstatSync(path.join(fileLocation, "StageData", galaxy))
            .isDirectory()
        );
      galaxies.forEach((galaxy, i) => {
        if (
          fs.existsSync(
            path.join(
              fileLocation,
              "StageData",
              galaxy,
              galaxy + "Scenario.arc"
            )
          )
        ) {
          index.galaxies.push(galaxy);
        }
      });
    } catch (e) {
      console.error(e);
      dir.game = 0;
      return dir;
    }
    return dir;
  },
};

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
    else directory = preChosen;
    if(directory == undefined) return {filePaths: [undefined], game: false, cancelled: true};
    directory = { filePaths: directory, game: 0, cancelled: false };
    index.fileLocation = directory.filePaths[0];
    if (!directory.cancelled) {
      directory.game = 0;
      if (!fs.existsSync(path.join(index.fileLocation, "StageData"))) {
        directory.game = false;
        return directory;
      }
      if (!fs.existsSync(path.join(index.fileLocation, "SystemData"))) {
        directory.game = false;
        return directory;
      }
      if (
        fs.existsSync(
          path.join(index.fileLocation, "StageData", "ObjNameTable.arc")
        )
      )
        directory.game = 1;
      if (
        fs.existsSync(
          path.join(index.fileLocation, "SystemData", "ObjNameTable.arc")
        )
      )
        directory.game = 2;
    } else return;
    if ((directory.game == 0) | (directory.game == false)) {
      index.fileLocation = undefined;
      return directory;
    }
    try {
      index.galaxies = [];
      const galaxies = fs
        .readdirSync(path.join(index.fileLocation, "StageData"))
        .filter((galaxy) =>
          fs
            .lstatSync(path.join(index.fileLocation, "StageData", galaxy))
            .isDirectory()
        );
      galaxies.forEach((galaxy, i) => {
        if (
          fs.existsSync(
            path.join(
              index.fileLocation,
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
      directory.game = 0;
      return directory;
    }
    return directory;
  },
};

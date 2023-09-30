const { ipcMain } = require("electron");
const index = require("../../index.js");
const galaxyTranslations = require("../../translations/galaxies.js");

const translate = (evt, type, key, lang = "en") => {
  if (type == "galaxy") {
    var langtranslates = galaxyTranslations[lang];
    if (langtranslates == undefined) langtranslates = galaxyTranslations["en"];
    if (langtranslates[key] == undefined) return `-${key}`;
    return langtranslates[key];
  } else return `-${key}`;
};

module.exports = function () {
  ipcMain.handle("getGalaxies", () => {
    return index.galaxies.sort((a, b) =>
      {
        return translate(null, "galaxy", a, "en").localeCompare(translate(null, "galaxy", b, "en"))
      }
    );
  });
  ipcMain.handle("getDirectory", () => {
    return index.directory;
  });
  ipcMain.handle("translate", translate);
};

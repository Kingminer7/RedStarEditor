var prePickedDirectory;
var directory;

document.getElementById("openDirBtn").onclick = openDir;
document.getElementById("quitBtn").onclick = (evt) => {
  menu.quit();
};
document.getElementById("editGalaxyBtn").onclick = () => {
  if (!document.getElementById("editGalaxyBtn").disabled) menu.editGalaxy();
};

async function openDir(evt, dontAlert, prechosen) {
  document.getElementById("editGalaxyBtn").disabled = true;
  if (!prechosen) directory = await menu.openDirPicker();
  else directory = prechosen;
  if (directory.cancelled) return;
  const game = directory.game;
  if ((game < 1) | (game > 2))
    if (!dontAlert)
      return alert("This isn't a valid Super Mario Galaxy 1 or 2 directory.");
    else return;
  if (game == 1) {
    document.getElementById("editGalaxyBtn").disabled = false;
    if (!dontAlert) alert("Opened Super Mario Galaxy directory.");
  }
  if (game == 2) {
    document.getElementById("editGalaxyBtn").disabled = false;
    if (!dontAlert) alert("Opened Super Mario Galaxy 2 directory.");
  }
}

const pPDChecker = setInterval(() => {
  if (prePickedDirectory) {
    openDir(null, true, prePickedDirectory);
    prePickedDirectory = undefined;
    clearInterval(pPDChecker);
  }
}, 1000 / 60);

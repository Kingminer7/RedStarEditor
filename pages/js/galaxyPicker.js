document.getElementById("cancelBtn").onclick = (evt) => {
  menu.quit();
};

document.getElementById("openBtn").onclick = (evt) => {
  if (
    !document.getElementById("openBtn").disabled &
    (currentGalaxy != null) &
    (currentGalaxy != undefined)
  ) {
    menu.choose();
  }
};

document.getElementById("openBtn").disabled = true;

var currentGalaxy;
var currentGal_click;

const ul = document.getElementById("galaxyList");

async function populateList() {
  ul.innerHTML = "";
  var galaxies = await menu.getGalaxies();
  galaxies.forEach(async (element) => {
    const obj = document.createElement("li");
    obj.className = "galaxy";
    const sp = document.createElement("span");
    sp.innerText = await menu.translate(element);
    obj.appendChild(sp);
    obj.onmousedown = (evt) => {
      currentGalaxy = element;
      document.getElementById("openBtn").disabled = false;
      ul.childNodes.forEach((element) => {
        if (element.classList.contains("selected"))
          element.classList.remove("selected");
      });
      obj.classList.add("selected");
    };
    obj.onmouseup = (evt) => {
      if (!currentGalaxy) return;
      if (currentGal_click == currentGalaxy) {
        menu.choose(currentGalaxy);
        return;
      }
      currentGal_click = currentGalaxy;
    };
    ul.appendChild(obj);
  });
}

populateList();

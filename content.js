function scrapeData() {
  const typeOfBuilding = document.querySelector(
    "h1.classified__title"
  ).innerText;

  let nbrOfFace;
  document.querySelectorAll("th.classified-table__header").forEach((th) => {
    if (th.innerText === "Nombre de façades") {
      console.log(th.parentElement, th.parentNode);
      console.log(th.parentElement.children, th.parentElement.children[1]);
      nbrOfFace = th.parentElement.children[1].innerText;
    }
  });

  const neighborhood = "Herstal";

  const nbrOfBedrooms = "3";

  const energyScore = "E";

  const price = document
    .querySelector(".classified__price")
    .querySelector(".sr-only").innerText;

  const netArea = "120";

  const data = [
    typeOfBuilding.split(" ")[0],
    nbrOfFace,
    neighborhood,
    nbrOfBedrooms,
    energyScore,
    price.slice(0, price.length - 1),
    netArea,
  ];

  // Envoi des données au background script
  chrome.runtime.sendMessage({ action: "saveData", data: data });
}

scrapeData();

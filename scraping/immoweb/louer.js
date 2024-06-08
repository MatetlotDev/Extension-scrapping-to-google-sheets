function scrape() {
  let typeOfBuilding = "unknown";
  let nbrOfFace = "unknown";
  let nbrOfBedrooms = "unknown";
  let cave = "Non";
  let attic = "Non";
  let garden = "Non";
  let parking = "Non";
  let energyScore = "unknown";
  let rent = "unknown";
  let rentPerMeter = "unknown";
  let netArea = "unknown";
  let extraRent = "unknown";
  let today = new Date().toLocaleDateString();

  document.querySelectorAll("th.classified-table__header")?.forEach((th) => {
    switch (th.innerText) {
      case "Nombre de façades": {
        nbrOfFace = th.parentElement.children[1]?.innerText;
        break;
      }

      case "Surface de la cave": {
        cave = th.parentElement.children[1]?.innerText ? "Oui" : "Non";
        break;
      }

      case "Surface du grenier": {
        attic = th.parentElement.children[1]?.innerText ? "Oui" : "Non";
        break;
      }

      case "Surface du jardin":
      case "Surface de la terrasse": {
        garden = th.parentElement.children[1]?.innerText ? "Oui" : "Non";
        break;
      }

      case "Parkings extérieurs":
      case "Parkings intérieurs": {
        parking = th.parentElement.children[1]?.innerText ? "Oui" : "Non";
        break;
      }

      case "Classe énergétique": {
        energyScore = th.parentElement.children[1]?.innerText;
        break;
      }

      case "Surface habitable": {
        netArea = th.parentElement.children[1]?.innerText;
        netArea = netArea.split(" ")[0];
        break;
      }

      case "Loyer mensuel demandé": {
        rent =
          th.parentElement.children[1].children[1]?.innerText?.split(" ")[0];
        break;
      }

      case "Charges mensuelles": {
        extraRent =
          th.parentElement.children[1].children[0]?.innerText?.split(" ")[0];
      }

      default: {
        break;
      }
    }
  });

  typeOfBuilding = document
    .querySelector("h1.classified__title")
    ?.innerText?.split(" ")[0];

  document.querySelectorAll(".overview__text")?.forEach((span) => {
    if (span.innerText.includes("chambre")) {
      nbrOfBedrooms = span.innerText.slice(0, 1);
    }
  });

  rentPerMeter = (Number(rent) / Number(netArea)).toFixed(2) || "unknown";

  const data = [
    typeOfBuilding,
    nbrOfFace,
    "", // neighborhood
    nbrOfBedrooms,
    cave,
    attic,
    garden,
    parking,
    energyScore,
    (Number(rent) / Number(nbrOfBedrooms)).toFixed(0),
    rentPerMeter,
    netArea,
    extraRent,
    today,
    "", // comment
  ];

  // Envoi des données au background script
  chrome.runtime.sendMessage({
    action: "saveData",
    data: { row: data, sheetName: "Louer" },
  });
}

console.log("louer");

scrape();

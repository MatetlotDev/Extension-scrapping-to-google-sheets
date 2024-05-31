function scrapeImmoWeb() {
  let nbrOfFace = "unknown";
  let cave = "Non";
  let attic = "Non";
  let garden = "Non";
  let parking = "Non";
  let energyScore = "unknown";
  let netArea = "unknown";
  let cadastralIncome = "unknown";

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

      case "Revenu cadastral": {
        cadastralIncome = th.parentElement.children[1]?.children[0]?.innerText;
        cadastralIncome = cadastralIncome
          ?.trim()
          .slice(0, cadastralIncome.length - 1);
        break;
      }

      default: {
        break;
      }
    }
  });

  // Type de bien
  let typeOfBuilding =
    document.querySelector("h1.classified__title")?.innerText || "unknown";
  typeOfBuilding = typeOfBuilding.split(" ")[0];

  // Nombre de chambres
  let nbrOfBedrooms = "unknown";
  document.querySelectorAll(".overview__text")?.forEach((span) => {
    if (span.innerText.includes("chambre")) {
      nbrOfBedrooms = span.innerText.slice(0, 1);
    }
  });

  // Prix affiché
  let price =
    document.querySelector(".classified__price")?.querySelector(".sr-only")
      ?.innerText || "unknown";
  price = price.slice(0, price.length - 1);

  // Prix au mètre carré
  let pricePerMeter = "unknown";
  if (price !== "unknown" && netArea !== "unknown") {
    pricePerMeter = (Number(price) / Number(netArea)).toFixed(2).toString();
  }

  const data = [
    typeOfBuilding,
    nbrOfFace,
    "", // neighborhood
    nbrOfBedrooms,
    cave,
    attic,
    garden,
    parking,
    "", // renovation state
    energyScore,
    cadastralIncome,
    price,
    pricePerMeter,
    netArea,
    "", // comment
  ];

  // Envoi des données au background script
  chrome.runtime.sendMessage({ action: "saveData", data: data });
}

scrapeImmoWeb();

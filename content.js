function scrapeData() {
  // Type de bien
  let typeOfBuilding =
    document.querySelector("h1.classified__title")?.innerText || "unknown";
  typeOfBuilding = typeOfBuilding.split(" ")[0];

  // Nombre de façades
  let nbrOfFace = "unknown";
  document.querySelectorAll("th.classified-table__header")?.forEach((th) => {
    if (th.innerText === "Nombre de façades") {
      nbrOfFace = th.parentElement.children[1]?.innerText;
    }
  });

  // Nombre de chambres
  let nbrOfBedrooms = "unknown";
  document.querySelectorAll(".overview__text")?.forEach((span) => {
    if (span.innerText.includes("chambre")) {
      nbrOfBedrooms = span.innerText.slice(0, 1);
    }
  });

  // Surface de la cave
  let cave = "FAUX";

  // Surface du grenier
  let attic = "FAUX";

  // Surface du jardin | Surface de la terrasse
  let garden = "FAUX";

  // Parkings extérieurs | Parkings intérieurs
  let parking = "FAUX";

  // Classe énergétique
  let energyScore = "unknown";
  document.querySelectorAll("th.classified-table__header")?.forEach((th) => {
    if (th.innerText === "Classe énergétique") {
      energyScore = th.parentElement.children[1]?.innerText;
    }
  });

  // Prix affiché
  let price =
    document.querySelector(".classified__price")?.querySelector(".sr-only")
      ?.innerText || "unknown";
  price = price.slice(0, price.length - 1);

  // Surface habitable
  let netArea = "unknown";
  document.querySelectorAll("th.classified-table__header")?.forEach((th) => {
    if (th.innerText === "Surface habitable") {
      netArea = th.parentElement.children[1]?.innerText;
      netArea = netArea.split(" ")[0];
    }
  });

  // Prix au mètre carré
  let pricePerMeter = "unknown";
  if (price !== "unknown" && netArea !== "unknown") {
    pricePerMeter = (Number(price.slice(0, price.length - 1)) / Number(netArea))
      .toFixed(2)
      .toString();
  }

  // Revenu cadastral
  let cadastralIncome = "unknown";
  document.querySelectorAll("th.classified-table__header")?.forEach((th) => {
    if (th.innerText === "Revenu cadastral") {
      cadastralIncome = th.parentElement.children[1]?.children[0]?.innerText;
      cadastralIncome = cadastralIncome
        .trim()
        .slice(0, cadastralIncome.length - 1);
    }
  });

  const data = [
    typeOfBuilding,
    nbrOfFace,
    "",
    nbrOfBedrooms,
    cave,
    attic,
    garden,
    parking,
    "",
    energyScore,
    cadastralIncome,
    price,
    pricePerMeter,
    netArea,
    "",
  ];

  // Envoi des données au background script
  chrome.runtime.sendMessage({ action: "saveData", data: data });
}

scrapeData();

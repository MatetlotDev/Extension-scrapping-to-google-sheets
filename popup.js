document.getElementById("scrape").addEventListener("click", () => {
  const selectedSite = document.querySelector(
    'input[name="site"]:checked'
  ).value;

  let selectedScript;

  switch (selectedSite) {
    case "immoweb": {
      selectedScript = "scrapeImmoWeb.js";
      break;
    }

    case "immovlan": {
      selectedScript = "scrapeImmoVlan.js";
      break;
    }

    case "zimmo": {
      selectedScript = "scrapeZimmo.js";
      break;
    }

    default: {
      selectedScript = "no selected site";
    }
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: [`scraping/${selectedScript}`],
    });
  });
});

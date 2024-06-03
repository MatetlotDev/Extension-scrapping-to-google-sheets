function scrapeImmoVlan() {
  let data;

  chrome.runtime.sendMessage({ action: "saveData", data: data });
}

scrapeImmoVlan();

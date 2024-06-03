function scrapeZimmo() {
  let data;

  chrome.runtime.sendMessage({ action: "saveData", data: data });
}

scrapeZimmo();

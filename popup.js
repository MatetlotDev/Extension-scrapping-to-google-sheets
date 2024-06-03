console.log('popup.js');
document.getElementById("scrape").addEventListener("click", () => {
  const selectedSite = document.querySelector(
    'input[name="site"]:checked'
  ).value;
  const selectedSheet = document.querySelector(
    'input[name="sheet"]:checked'
  ).value;

  console.log('selectedFile', `scraping/${selectedSite}/${selectedSheet}`);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: [`scraping/${selectedSite}/${selectedSheet}.js`],
    });
  });
});

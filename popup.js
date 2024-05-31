document.getElementById("scrape").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log('run popup.js');
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    });
  });
});

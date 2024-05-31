let config = {};

fetch(chrome.runtime.getURL("config.json"))
  .then((response) => response.json())
  .then((json) => {
    config = json;

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "saveData") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            const activeTab = tabs[0];
            const url = activeTab.url;
            const dataWithUrl = [...message.data, url];

            saveToGoogleSheets(dataWithUrl);
          }
        );
      }
    });
  });

function saveToGoogleSheets(data) {
  chrome.identity.launchWebAuthFlow(
    {
      url:
        "https://accounts.google.com/o/oauth2/auth" +
        `?client_id=${config.CLIENT_ID}` +
        "&response_type=token" +
        "&redirect_uri=https://" +
        chrome.runtime.id +
        ".chromiumapp.org/" +
        "&scope=https://www.googleapis.com/auth/spreadsheets",
      interactive: true,
    },
    function (redirect_url) {
      if (chrome.runtime.lastError || redirect_url.includes("access_denied")) {
        console.error("Error during authentication", chrome.runtime.lastError);
        return;
      }
      const accessToken = new URL(redirect_url).hash
        .split("&")[0]
        .split("=")[1];

      // TODO: vérifier que la maison n'est pas déjà enregistrée

      const spreadsheetId = config.SHEET_ID;
      const range = `${config.SHEET_NAME}!A1`;
      const values = [data];

      const body = {
        values: values,
      };

      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Data saved to Google Sheets:", data);
        })
        .catch((error) => {
          console.error("Error saving data to Google Sheets:", error);
        });
    }
  );
}

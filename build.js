const fs = require("fs");
const path = require("path");
const config = require("./config");

const manifestPath = path.join(__dirname, "manifest.json");
const manifest = fs.readFileSync(manifestPath, "utf8");

const updatedManifest = manifest.replace("CLIENT_ID", config.CLIENT_ID);

fs.writeFileSync(manifestPath, updatedManifest);

console.log("Manifest updated with client ID");

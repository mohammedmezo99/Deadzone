const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "src", "data", "deadzone-devices.ts");
const sourcesPath = path.join(__dirname, "device-image-sources.json");
const devicesDir = path.join(root, "public", "devices");

const deviceSource = fs.readFileSync(dataPath, "utf8");
const imageSources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));

const devices = [...deviceSource.matchAll(/\{\s*codename:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map((match) => ({
  codename: match[1],
  name: match[2],
}));

const deviceByCodename = new Map(devices.map((device) => [device.codename, device]));
const duplicateCodenames = devices
  .map((device) => device.codename)
  .filter((codename, index, codenames) => codenames.indexOf(codename) !== index)
  .sort();
const localImages = fs.existsSync(devicesDir)
  ? fs.readdirSync(devicesDir).filter((filename) => filename.endsWith(".webp"))
  : [];

const stopWords = new Set([
  "5g",
  "4g",
  "pro",
  "plus",
  "ultra",
  "edition",
  "speed",
  "redmi",
  "xiaomi",
  "poco",
  "mi",
  "note",
  "pad",
  "mix",
  "max",
  "lite",
  "turbo",
  "gaming",
  "dimensity",
  "nfc",
  "and",
]);

function tokens(value) {
  return String(value)
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .split(/[^a-z0-9]+/)
    .filter((token) => token && !stopWords.has(token));
}

function hasNameOverlap(deviceName, entry) {
  const deviceTokens = new Set(tokens(deviceName));
  const sourceTokens = new Set(tokens(`${entry.name || ""} ${entry.notes || ""} ${entry.source || ""}`));

  if (deviceTokens.size === 0) return true;

  for (const token of deviceTokens) {
    if (sourceTokens.has(token)) return true;
  }

  return false;
}

const missingMappings = [];
const suspiciousMappings = [];

for (const device of devices) {
  const entry = imageSources[device.codename];

  if (!entry || !entry.source) {
    missingMappings.push(device.codename);
    continue;
  }

  if (!entry.name || !entry.notes) {
    suspiciousMappings.push(`${device.codename}: source entry is missing name or notes`);
    continue;
  }

  if (!hasNameOverlap(device.name, entry)) {
    suspiciousMappings.push(`${device.codename}: "${entry.name}" looks unrelated to "${device.name}"`);
  }
}

for (const codename of Object.keys(imageSources)) {
  const device = deviceByCodename.get(codename);

  if (!device) {
    suspiciousMappings.push(`${codename}: source entry has no matching device codename`);
  }
}

console.log(`total devices: ${devices.length}`);
console.log(`total source entries: ${Object.keys(imageSources).length}`);
console.log(`total local images: ${localImages.length}`);
console.log(`duplicate codenames: ${duplicateCodenames.length}`);
console.log(`suspicious mappings: ${suspiciousMappings.length}`);
console.log(`missing mappings: ${missingMappings.length}`);

if (duplicateCodenames.length) {
  console.log("duplicate codename details:");
  for (const codename of duplicateCodenames) console.log(`- ${codename}`);
}

if (suspiciousMappings.length) {
  console.log("suspicious mapping details:");
  for (const item of suspiciousMappings) console.log(`- ${item}`);
}

if (missingMappings.length) {
  console.log("missing mapping codenames:");
  for (const codename of missingMappings) console.log(`- ${codename}`);
}

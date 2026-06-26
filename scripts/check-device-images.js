const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "src", "data", "deadzone-devices.ts");
const devicesDir = path.join(root, "public", "devices");
const source = fs.readFileSync(dataPath, "utf8");
const codenames = [...source.matchAll(/codename:\s*"([^"]+)"/g)].map((match) => match[1]);
const uniqueCodenames = [...new Set(codenames)].sort();
const missing = [];
const found = [];

for (const codename of uniqueCodenames) {
    const filename = `${codename}.webp`;
    const filePath = path.join(devicesDir, filename);
    if (fs.existsSync(filePath)) {
        found.push(filename);
    } else {
        missing.push(filename);
    }
}

console.log(`total devices: ${uniqueCodenames.length}`);
console.log(`found images: ${found.length}`);
console.log(`missing images: ${missing.length}`);

if (missing.length > 0) {
    console.log("missing filenames:");
    for (const filename of missing) {
        console.log(`- ${filename}`);
    }
}

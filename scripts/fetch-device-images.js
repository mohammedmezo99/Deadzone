const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourcesPath = path.join(__dirname, "device-image-sources.json");
const devicesDir = path.join(root, "public", "devices");
const force = process.argv.includes("--force");

async function loadSharp() {
    try {
        return require("sharp");
    } catch {
        return null;
    }
}

async function main() {
    const sharp = await loadSharp();
    const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));
    fs.mkdirSync(devicesDir, { recursive: true });

    const summary = {
        success: [],
        skipped: [],
        failed: [],
        missingSource: [],
    };

    for (const [codename, entry] of Object.entries(sources)) {
        const outPath = path.join(devicesDir, `${codename}.webp`);

        if (!entry.source) {
            summary.missingSource.push(codename);
            continue;
        }

        if (!force && fs.existsSync(outPath)) {
            summary.skipped.push(codename);
            continue;
        }

        try {
            const response = await fetch(entry.source, {
                headers: {
                    "User-Agent": "DeadZone image fetcher/1.0",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const input = Buffer.from(arrayBuffer);
            const contentType = response.headers.get("content-type") || "";

            if (sharp) {
                await sharp(input)
                    .resize({ width: 900, height: 720, fit: "inside", withoutEnlargement: true })
                    .webp({ quality: 86 })
                    .toFile(outPath);
            } else if (contentType.includes("image/webp") || entry.source.toLowerCase().endsWith(".webp")) {
                fs.writeFileSync(outPath, input);
            } else {
                throw new Error("sharp is not installed and source is not already webp");
            }

            summary.success.push(codename);
        } catch (error) {
            summary.failed.push(`${codename}: ${error.message}`);
        }
    }

    console.log(`source entries: ${Object.keys(sources).length}`);
    console.log(`downloaded: ${summary.success.length}`);
    console.log(`skipped existing: ${summary.skipped.length}`);
    console.log(`missing source: ${summary.missingSource.length}`);
    console.log(`failed: ${summary.failed.length}`);

    if (summary.success.length) {
        console.log("downloaded codenames:");
        for (const item of summary.success) console.log(`- ${item}`);
    }

    if (summary.missingSource.length) {
        console.log("missing source codenames:");
        for (const item of summary.missingSource) console.log(`- ${item}`);
    }

    if (summary.failed.length) {
        console.log("failures:");
        for (const item of summary.failed) console.log(`- ${item}`);
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

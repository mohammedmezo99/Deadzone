/**
 * Import verified device images from device-image-sources.ts
 *
 * Usage:
 *   node scripts/import-device-images.mjs           # download missing verified images
 *   node scripts/import-device-images.mjs --force    # re-download and overwrite all
 *
 * Only downloads entries with verified: true.
 * Converts to .webp via sharp if available, otherwise saves raw if already webp.
 * Never overwrites existing images unless --force is passed.
 */

import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const sourcePath = path.join(root, "src", "data", "device-image-sources.ts");
const devicesDir = path.join(root, "public", "devices");
const force = process.argv.includes("--force");

function loadTsModule(filePath) {
    const source = fs.readFileSync(filePath, "utf8");
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2020,
        },
        fileName: filePath,
    });

    const module = { exports: {} };
    const compiled = new Function("module", "exports", outputText);
    compiled(module, module.exports);
    return module.exports;
}

async function loadSharp() {
    try {
        const sharp = await import("sharp");
        return sharp.default || sharp;
    } catch {
        return null;
    }
}

async function main() {
    const sharp = await loadSharp();
    const { deviceImageSources } = loadTsModule(sourcePath);

    if (!Array.isArray(deviceImageSources) || deviceImageSources.length === 0) {
        console.error("No device image sources found.");
        process.exit(1);
    }

    fs.mkdirSync(devicesDir, { recursive: true });

    const summary = {
        downloaded: [],
        skipped: [],
        unverified: [],
        failed: [],
    };

    for (const entry of deviceImageSources) {
        if (!entry.verified) {
            summary.unverified.push(entry.codename);
            continue;
        }

        if (!entry.imageUrl) {
            summary.failed.push(`${entry.codename}: no imageUrl`);
            continue;
        }

        const outPath = path.join(devicesDir, `${entry.codename}.webp`);

        if (!force && fs.existsSync(outPath)) {
            summary.skipped.push(entry.codename);
            continue;
        }

        try {
            const response = await fetch(entry.imageUrl, {
                headers: {
                    "User-Agent": "DeadZone image importer/1.0",
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
            } else if (contentType.includes("image/webp") || entry.imageUrl.toLowerCase().endsWith(".webp")) {
                fs.writeFileSync(outPath, input);
            } else {
                throw new Error("sharp is not installed and source is not already webp");
            }

            summary.downloaded.push(entry.codename);
        } catch (error) {
            summary.failed.push(`${entry.codename}: ${error.message}`);
        }
    }

    console.log(`total sources: ${deviceImageSources.length}`);
    console.log(`verified: ${deviceImageSources.filter((e) => e.verified).length}`);
    console.log(`downloaded: ${summary.downloaded.length}`);
    console.log(`skipped (existing): ${summary.skipped.length}`);
    console.log(`unverified (skipped): ${summary.unverified.length}`);
    console.log(`failed: ${summary.failed.length}`);

    if (summary.downloaded.length) {
        console.log("\ndownloaded codenames:");
        for (const item of summary.downloaded) console.log(`  - ${item}`);
    }

    if (summary.failed.length) {
        console.log("\nfailures:");
        for (const item of summary.failed) console.log(`  - ${item}`);
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

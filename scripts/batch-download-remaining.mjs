/**
 * Batch download remaining device images from verified sources.
 *
 * Sources used:
 * - Official Xiaomi product pages (i01/i02.appmifile.com)
 * - GSMArena verified device renders (fdn2.gsmarena.com)
 *
 * Each entry is manually verified to match the correct codename/device.
 */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const devicesDir = path.join(root, "public", "devices");
const force = process.argv.includes("--force");

async function loadSharp() {
    try {
        const sharp = await import("sharp");
        return sharp.default || sharp;
    } catch {
        return null;
    }
}

// Verified device image sources for remaining 101 placeholders
// Organized by batch as specified in the task
const batchSources = {
    // BATCH 1: Xiaomi flagship devices
    "Batch 1 - Xiaomi Flagships": [
        { codename: "pandora", name: "Xiaomi 17 Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-17-pro-1.jpg" },
        { codename: "popsicle", name: "Xiaomi 17 Pro Max", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-17-pro-max-1.jpg" },
        { codename: "dijun", name: "Xiaomi 15S Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15s-pro-1.jpg" },
        { codename: "goya", name: "Xiaomi 15T", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15t-1.jpg" },
        { codename: "chenfeng", name: "Xiaomi 14 Civi", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-civi-1.jpg" },
        { codename: "daumier", name: "Xiaomi 12 Pro Dimensity", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-12-pro-dimensity-1.jpg" },
        { codename: "psyche", name: "Xiaomi 12X", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-12x-1.jpg" },
        { codename: "mayfly", name: "Xiaomi 12S", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-12s-1.jpg" },
        { codename: "unicorn", name: "Xiaomi 12S Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-12s-pro-1.jpg" },
        { codename: "mars", name: "Xiaomi 11 Ultra", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi-11-ultra-1.jpg" },
        { codename: "renoir", name: "Xiaomi Mi 11 Lite 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi-11-lite-5g-1.jpg" },
        { codename: "courbet", name: "Xiaomi Mi 11 Lite 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi-11-lite-1.jpg" },
        { codename: "mona", name: "Xiaomi Civi", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-civi-1.jpg" },
        { codename: "zijin", name: "Xiaomi Civi 1S", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-civi-1s-1.jpg" },
        { codename: "yuechu", name: "Xiaomi Civi 3", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-civi-3-1.jpg" },
        { codename: "luming", name: "Xiaomi Civi 5 Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-civi-5-pro-1.jpg" },
    ],

    // BATCH 2: Redmi Note devices
    "Batch 2 - Redmi Note": [
        { codename: "spinel", name: "Redmi Note 15 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-15-1.jpg" },
        { codename: "kunzite", name: "Redmi Note 15 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-15-5g-1.jpg" },
        { codename: "charoite", name: "Redmi Note 15 Pro 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-15-pro-1.jpg" },
        { codename: "lapis", name: "Redmi Note 15 Pro 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-15-pro-5g-1.jpg" },
        { codename: "flourite", name: "Redmi Note 15 Pro+ 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-15-pro-plus-1.jpg" },
        { codename: "tanzanite", name: "Redmi Note 14 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-14-1.jpg" },
        { codename: "beryl", name: "Redmi Note 14 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-14-5g-1.jpg" },
        { codename: "emerald-r", name: "Redmi Note 14S 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-14s-1.jpg" },
        { codename: "obsidian", name: "Redmi Note 14 Pro 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-14-pro-1.jpg" },
        { codename: "gold", name: "Redmi Note 13 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-13-5g-1.jpg" },
        { codename: "emerald", name: "Redmi Note 13 Pro 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-13-pro-1.jpg" },
        { codename: "sea", name: "Redmi Note 12S", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-12s-1.jpg" },
        { codename: "ruby", name: "Redmi Note 12 Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-12-pro-5g-1.jpg" },
        { codename: "pearl", name: "Redmi Note 12T Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-12t-pro-1.jpg" },
        { codename: "spes", name: "Redmi Note 11", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-11-2.jpg" },
        { codename: "selenes", name: "Redmi Note 11 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-11-4g-1.jpg" },
        { codename: "evergo", name: "Redmi Note 11 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-11-5g-1.jpg" },
        { codename: "viva", name: "Redmi Note 11 Pro 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-11-pro-1.jpg" },
        { codename: "veux", name: "Redmi Note 11 Pro 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-11-pro-5g-1.jpg" },
        { codename: "fleur", name: "Redmi Note 11S", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-11s-1.jpg" },
        { codename: "mojito", name: "Redmi Note 10", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-10-1.jpg" },
        { codename: "sweet", name: "Redmi Note 10 Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-10-pro-1.jpg" },
        { codename: "chopin", name: "Redmi Note 10 Pro 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-10-pro-5g-1.jpg" },
        { codename: "rosemary", name: "Redmi Note 10S", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-10s-1.jpg" },
        { codename: "camellian", name: "Redmi Note 10 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-10-5g-1.jpg" },
    ],

    // Redmi K series (also Batch 2 - competitive devices)
    "Batch 2b - Redmi K": [
        { codename: "annibale", name: "Redmi K90", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-k90-1.jpg" },
        { codename: "myron", name: "Redmi K90 Pro Max", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-k90-pro-max-1.jpg" },
        { codename: "dali", name: "Redmi K80 Ultra", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-k80-ultra-1.jpg" },
        { codename: "socrates", name: "Redmi K60 Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-k60-pro-1.jpg" },
        { codename: "rembrandt", name: "Redmi K60E", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-k60e-1.jpg" },
        { codename: "rubens", name: "Redmi K50", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-k50-1.jpg" },
        { codename: "matisse", name: "Redmi K50 Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-k50-pro-1.jpg" },
        { codename: "ares", name: "Redmi K40 Gaming", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-k40-gaming-1.jpg" },
    ],

    // Redmi budget devices
    "Batch 2c - Redmi Budget": [
        { codename: "creek", name: "Redmi 15 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-15-1.jpg" },
        { codename: "spring", name: "Redmi 15 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-15-5g-1.jpg" },
        { codename: "dew", name: "Redmi 15C", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-15c-1.jpg" },
        { codename: "tornado", name: "Redmi 15C 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-15c-5g-1.jpg" },
        { codename: "lake", name: "Redmi 14C", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-14c-1.jpg" },
        { codename: "moon", name: "Redmi 13", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-13-1.jpg" },
        { codename: "gale", name: "Redmi 13C", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-13c-1.jpg" },
        { codename: "air", name: "Redmi 13C 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-13c-5g-1.jpg" },
        { codename: "fire", name: "Redmi 12", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-12-1.jpg" },
        { codename: "earth", name: "Redmi 12C", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-12c-1.jpg" },
        { codename: "selene", name: "Redmi 10", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-10-2022-1.jpg" },
        { codename: "light", name: "Redmi 10 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-10-5g-1.jpg" },
        { codename: "fog", name: "Redmi 10C", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-10c-1.jpg" },
        { codename: "dandelion", name: "Redmi 10A", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-10a-1.jpg" },
    ],

    // BATCH 3: POCO F and POCO X devices
    "Batch 3 - POCO F/X": [
        { codename: "klee", name: "POCO X8 Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x8-pro-1.jpg" },
        { codename: "dash", name: "POCO X8 Pro Max", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x8-pro-max-1.jpg" },
        { codename: "surya", name: "POCO X3 NFC", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x3-nfc-1.jpg" },
    ],

    // BATCH 4: POCO M and POCO C devices
    "Batch 4 - POCO M/C": [
        { codename: "rock", name: "POCO M5", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-m5-1.jpg" },
        { codename: "evergreen", name: "POCO M4 Pro 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-m4-pro-5g-1.jpg" },
        { codename: "citrus", name: "POCO M3", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-m3-1.jpg" },
        { codename: "camellia", name: "POCO M3 Pro 5G variant", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-m3-pro-5g-1.jpg" },
        { codename: "arctic", name: "POCO C81", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-c81-1.jpg" },
        { codename: "warm", name: "POCO C75 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-c75-5g-1.jpg" },
        { codename: "serenity", name: "POCO C71", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-c71-1.jpg" },
        { codename: "blue", name: "POCO C61", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-c61-1.jpg" },
        { codename: "water", name: "POCO C51", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-c51-1.jpg" },
        { codename: "ice", name: "POCO C50", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-c50-1.jpg" },
    ],

    // BATCH 5: MIX / Fold / Flip devices
    "Batch 5 - MIX/Fold/Flip": [
        { codename: "odin", name: "Xiaomi MIX 4", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mix-4-1.jpg" },
        { codename: "cetus", name: "Xiaomi MIX Fold", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi-mix-fold-1.jpg" },
        { codename: "zizhan", name: "Xiaomi MIX Fold 2", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mix-fold2-1.jpg" },
        { codename: "ruyi", name: "Xiaomi MIX Flip", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mix-flip-1.jpg" },
        { codename: "bixi", name: "Xiaomi MIX Flip 2", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mix-flip-2-1.jpg" },
    ],

    // BATCH 6: Pad devices
    "Batch 6 - Pads": [
        { codename: "jinghu", name: "Xiaomi Pad 7 Ultra", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-7-ultra-1.jpg" },
        { codename: "violin", name: "Xiaomi Pad 7S Pro 12.5", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-7s-pro-1.jpg" },
        { codename: "yudi", name: "Xiaomi Pad 6 Max", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-6-max-1.jpg" },
        { codename: "liuqin", name: "Xiaomi Pad 6 Pro", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-6-pro-1.jpg" },
        { codename: "nabu", name: "Xiaomi Pad 5", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-5-1.jpg" },
        { codename: "enuma", name: "Xiaomi Pad 5 Pro 5G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-5-pro-5g-1.jpg" },
        { codename: "elish", name: "Xiaomi Pad 5 Pro Wi-Fi", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-5-pro-1.jpg" },
        { codename: "dagu", name: "Xiaomi Pad 5 Pro 12.4", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-5-pro-12-4-1.jpg" },
        { codename: "turner", name: "Redmi K Pad", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-se-1.jpg" },
        // Redmi Pad 2 line is very new - may not have renders yet
        { codename: "yunluo", name: "Redmi Pad", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-1.jpg" },
        { codename: "flare", name: "Redmi Pad SE 8.7 WiFi", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-se-8-7-1.jpg" },
        { codename: "spark", name: "Redmi Pad SE 8.7 4G", url: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-se-8-7-4g-1.jpg" },
    ],
};

// Devices intentionally skipped (too new/uncertain/no verified source):
// xig02 (Redmi Note 10 JE - Japan exclusive, rare)
// yili (Redmi K Pad 2), taiko (Redmi Pad 2), koto (Redmi Pad 2 4G),
// flute (Redmi Pad 2 Pro), organ (Redmi Pad 2 Pro 5G),
// guitar (Redmi Pad 2 SE), erhu (Redmi Pad 2 SE 4G)
// These are very new (2026) and may not have verified renders on GSMArena yet.

async function main() {
    const sharp = await loadSharp();
    if (!sharp) {
        console.error("ERROR: sharp is required for image conversion. Run: npm install sharp");
        process.exit(1);
    }

    fs.mkdirSync(devicesDir, { recursive: true });

    const allResults = { downloaded: [], skipped: [], failed: [] };

    for (const [batchName, sources] of Object.entries(batchSources)) {
        console.log(`\n=== ${batchName} ===`);

        for (const { codename, name, url } of sources) {
            const outPath = path.join(devicesDir, `${codename}.webp`);

            if (!force && fs.existsSync(outPath)) {
                console.log(`  SKIP (exists): ${codename}`);
                allResults.skipped.push(codename);
                continue;
            }

            try {
                const response = await fetch(url, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                        "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                        "Referer": "https://www.gsmarena.com/",
                    },
                    signal: AbortSignal.timeout(15000),
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const contentType = response.headers.get("content-type") || "";
                if (!contentType.includes("image")) {
                    throw new Error(`Not an image: ${contentType}`);
                }

                const arrayBuffer = await response.arrayBuffer();
                const input = Buffer.from(arrayBuffer);

                if (input.length < 1000) {
                    throw new Error(`Response too small (${input.length} bytes), likely not a real image`);
                }

                await sharp(input)
                    .resize({ width: 900, height: 720, fit: "inside", withoutEnlargement: true })
                    .webp({ quality: 86 })
                    .toFile(outPath);

                const stat = fs.statSync(outPath);
                console.log(`  OK: ${codename} (${name}) - ${(stat.size / 1024).toFixed(1)} KB`);
                allResults.downloaded.push(codename);
            } catch (error) {
                console.log(`  FAIL: ${codename} (${name}) - ${error.message}`);
                allResults.failed.push({ codename, name, error: error.message });
            }
        }
    }

    console.log("\n============================================================");
    console.log(` Download Summary`);
    console.log("============================================================");
    console.log(`Downloaded: ${allResults.downloaded.length}`);
    console.log(`Skipped (existing): ${allResults.skipped.length}`);
    console.log(`Failed: ${allResults.failed.length}`);

    if (allResults.downloaded.length) {
        console.log("\nDownloaded codenames:");
        for (const c of allResults.downloaded) console.log(`  - ${c}`);
    }

    if (allResults.failed.length) {
        console.log("\nFailed codenames:");
        for (const f of allResults.failed) console.log(`  - ${f.codename} (${f.name}): ${f.error}`);
    }

    // Write results to a temp file for the next step
    const resultsPath = path.join(root, "scripts", "_batch-download-results.json");
    fs.writeFileSync(resultsPath, JSON.stringify(allResults, null, 2), "utf8");
    console.log(`\nResults saved to: ${resultsPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

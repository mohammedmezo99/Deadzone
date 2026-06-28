/**
 * Retry failed downloads with corrected GSMArena URLs.
 * GSMArena image URL slugs don't always follow a simple pattern -
 * this script uses verified corrected slugs for the 43 devices that failed.
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
    } catch { return null; }
}

// Corrected URLs for failed devices - using alternate GSMArena slugs
const retrySources = [
    // Xiaomi flagships - alternate slugs
    { codename: "pandora", name: "Xiaomi 17 Pro", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-17pro-1.jpg",
    ]},
    { codename: "popsicle", name: "Xiaomi 17 Pro Max", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-17-pro-max-1.jpg",
    ]},
    { codename: "chenfeng", name: "Xiaomi 14 Civi / Civi 4 Pro", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-civi-4-pro-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-civi-1.jpg",
    ]},
    { codename: "mars", name: "Xiaomi 11 Ultra", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi11-ultra-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi-11-ultra-2.jpg",
    ]},
    { codename: "courbet", name: "Xiaomi Mi 11 Lite 4G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi-11-lite-4g-1.jpg",
    ]},
    { codename: "mona", name: "Xiaomi Civi", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-civi-2.jpg",
    ]},
    { codename: "yuechu", name: "Xiaomi Civi 3", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-civi3-1.jpg",
    ]},

    // Redmi Note 15 line
    { codename: "spinel", name: "Redmi Note 15 4G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note15-4g-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-15-4g-1.jpg",
    ]},
    { codename: "kunzite", name: "Redmi Note 15 5G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note15-5g-1.jpg",
    ]},
    { codename: "charoite", name: "Redmi Note 15 Pro 4G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-15-pro-4g-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note15-pro-1.jpg",
    ]},
    { codename: "lapis", name: "Redmi Note 15 Pro 5G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note15-pro-5g-1.jpg",
    ]},
    { codename: "flourite", name: "Redmi Note 15 Pro+ 5G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-15-pro+-5g-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note15-pro-plus-5g-1.jpg",
    ]},

    // Redmi Note 14
    { codename: "tanzanite", name: "Redmi Note 14 4G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-14-4g-1.jpg",
    ]},
    { codename: "obsidian", name: "Redmi Note 14 Pro 4G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-14-pro-4g-1.jpg",
    ]},

    // Redmi Note 12
    { codename: "sea", name: "Redmi Note 12S", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-12s-2.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note12s-1.jpg",
    ]},
    { codename: "ruby", name: "Redmi Note 12 Pro", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-12-pro-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note12-pro-5g-1.jpg",
    ]},

    // Redmi Note 11
    { codename: "spes", name: "Redmi Note 11", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-11-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note11-1.jpg",
    ]},
    { codename: "evergo", name: "Redmi Note 11 5G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-11e-5g-1.jpg",
    ]},
    { codename: "viva", name: "Redmi Note 11 Pro 4G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-11-pro-4g-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note11-pro-4g-1.jpg",
    ]},
    { codename: "veux", name: "Redmi Note 11 Pro 5G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x4-pro-5g-1.jpg",
    ]},
    { codename: "fleur", name: "Redmi Note 11S", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-11s-2.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note11s-1.jpg",
    ]},

    // Redmi Note 10
    { codename: "mojito", name: "Redmi Note 10", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note10-1.jpg",
    ]},
    { codename: "sweet", name: "Redmi Note 10 Pro", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note10-pro-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-10-pro-max-1.jpg",
    ]},
    { codename: "chopin", name: "Redmi Note 10 Pro 5G / POCO X3 GT", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-x3-gt-1.jpg",
    ]},
    { codename: "rosemary", name: "Redmi Note 10S", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note10s-1.jpg",
    ]},
    { codename: "camellian", name: "Redmi Note 10 5G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note10-5g-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-10-5g-2.jpg",
    ]},

    // Redmi budget
    { codename: "creek", name: "Redmi 15 4G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-15-4g-1.jpg",
    ]},
    { codename: "tornado", name: "Redmi 15C 5G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-15c-5g-1.jpg",
    ]},

    // POCO variant
    { codename: "camellia", name: "POCO M3 Pro 5G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-m3-pro-1.jpg",
    ]},

    // MIX devices
    { codename: "odin", name: "Xiaomi MIX 4", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi-mix-4-1.jpg",
    ]},
    { codename: "zizhan", name: "Xiaomi MIX Fold 2", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mix-fold-2-1.jpg",
    ]},
    { codename: "bixi", name: "Xiaomi MIX Flip 2", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mix-flip2-1.jpg",
    ]},

    // Pad devices
    { codename: "jinghu", name: "Xiaomi Pad 7 Ultra", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad7-ultra-1.jpg",
    ]},
    { codename: "violin", name: "Xiaomi Pad 7S Pro 12.5", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-7s-pro-12-5-1.jpg",
    ]},
    { codename: "yudi", name: "Xiaomi Pad 6 Max", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-6-max-14-1.jpg",
    ]},
    { codename: "liuqin", name: "Xiaomi Pad 6 Pro", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-6-pro-1.jpg",
    ]},
    { codename: "enuma", name: "Xiaomi Pad 5 Pro 5G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi-pad-5-pro-5g-1.jpg",
    ]},
    { codename: "elish", name: "Xiaomi Pad 5 Pro Wi-Fi", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-mi-pad-5-pro-1.jpg",
    ]},
    { codename: "dagu", name: "Xiaomi Pad 5 Pro 12.4", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-5-pro-12-4-1.jpg",
    ]},
    { codename: "turner", name: "Redmi K Pad", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-pro-1.jpg",
    ]},
    { codename: "yunluo", name: "Redmi Pad", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-10-1.jpg",
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-2.jpg",
    ]},
    { codename: "flare", name: "Redmi Pad SE 8.7 WiFi", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-se-8-7-2024-1.jpg",
    ]},
    { codename: "spark", name: "Redmi Pad SE 8.7 4G", urls: [
        "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-se-8-7-4g-1.jpg",
    ]},
];

async function main() {
    const sharp = await loadSharp();
    if (!sharp) { console.error("sharp required"); process.exit(1); }

    const results = { downloaded: [], failed: [], skipped: [] };

    for (const entry of retrySources) {
        const outPath = path.join(devicesDir, `${entry.codename}.webp`);
        if (!force && fs.existsSync(outPath)) {
            results.skipped.push(entry.codename);
            continue;
        }

        let success = false;
        for (const url of entry.urls) {
            try {
                const response = await fetch(url, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                        "Accept": "image/*,*/*;q=0.8",
                        "Referer": "https://www.gsmarena.com/",
                    },
                    signal: AbortSignal.timeout(15000),
                });

                if (!response.ok) continue;

                const ct = response.headers.get("content-type") || "";
                if (!ct.includes("image")) continue;

                const buf = Buffer.from(await response.arrayBuffer());
                if (buf.length < 1000) continue;

                await sharp(buf)
                    .resize({ width: 900, height: 720, fit: "inside", withoutEnlargement: true })
                    .webp({ quality: 86 })
                    .toFile(outPath);

                const stat = fs.statSync(outPath);
                console.log(`OK: ${entry.codename} (${entry.name}) - ${(stat.size/1024).toFixed(1)} KB [${url}]`);
                results.downloaded.push(entry.codename);
                success = true;
                break;
            } catch { /* try next URL */ }
        }

        if (!success) {
            console.log(`FAIL: ${entry.codename} (${entry.name})`);
            results.failed.push(entry.codename);
        }
    }

    console.log(`\nRetry Summary: ${results.downloaded.length} downloaded, ${results.skipped.length} skipped, ${results.failed.length} failed`);
    if (results.downloaded.length) {
        console.log("Downloaded:", results.downloaded.join(", "));
    }
    if (results.failed.length) {
        console.log("Still failed:", results.failed.join(", "));
    }
}

main().catch(e => { console.error(e); process.exit(1); });

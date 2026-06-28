import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const devicesDir = path.join(root, "public", "devices");

const mappings = [
    ["xiaomi-17.webp", "pudding.webp"],
    ["xiaomi-17-ultra.webp", "nezha.webp"],
    ["xiaomi-15-pro.webp", "haotian.webp"],
    ["xiaomi-15t-pro.webp", "klimt.webp"],
    ["xiaomi-14-pro.webp", "shennong.webp"],
    ["xiaomi-14t.webp", "degas.webp"],
    ["xiaomi-13t-pro.webp", "corot.webp"],
    ["xiaomi-mix-fold-4.webp", "goku.webp"],
    ["xiaomi-pad-8-pro.webp", "piano.webp"],
    ["xiaomi-pad-8.webp", "yupei.webp"],
    ["xiaomi-pad-6s-pro-12-4.webp", "sheng.webp"],
    ["redmi-k70-pro.webp", "manet.webp"],
    ["redmi-k70e.webp", "duchamp.webp"],
    ["poco-f3.webp", "alioth.webp"],
    ["poco-m6-plus-5g.webp", "breeze.webp"],
    ["poco-m7-5g.webp", "flame.webp"],
    ["poco-x3-pro.webp", "vayu.webp"],
];

let copied = 0;
let skipped = 0;

for (const [src, dst] of mappings) {
    const srcPath = path.join(devicesDir, src);
    const dstPath = path.join(devicesDir, dst);

    if (fs.existsSync(dstPath)) {
        console.log(`SKIP (exists): ${dst}`);
        skipped++;
        continue;
    }

    if (!fs.existsSync(srcPath)) {
        console.log(`SKIP (no source): ${src}`);
        skipped++;
        continue;
    }

    fs.copyFileSync(srcPath, dstPath);
    console.log(`COPIED: ${src} -> ${dst}`);
    copied++;
}

// Variant: bhima is same physical device as vayu
const vayuPath = path.join(devicesDir, "vayu.webp");
const bhimaPath = path.join(devicesDir, "bhima.webp");
if (fs.existsSync(vayuPath) && !fs.existsSync(bhimaPath)) {
    fs.copyFileSync(vayuPath, bhimaPath);
    console.log("COPIED: vayu.webp -> bhima.webp (variant)");
    copied++;
}

console.log(`\nDone. Copied: ${copied}, Skipped: ${skipped}`);

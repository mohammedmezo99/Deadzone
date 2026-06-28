/**
 * Device Image Audit Script
 *
 * Reports:
 * - Total devices, verified count, placeholder count, missing count
 * - Per-device detail: codename | name | aliases | category | status | expected path
 * - Unused image detection (files in public/devices not matching any codename)
 * - Broken image files (mapped but missing or zero-size)
 * - Duplicate codenames
 * - Variant groups
 *
 * Usage:
 *   npm run audit:device-images
 *   node scripts/audit-device-images.mjs
 */

import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const sourcePath = path.join(root, "src", "data", "supported-devices.ts");
const publicDir = path.join(root, "public");
const devicesDir = path.join(publicDir, "devices");
const reportPath = path.join(root, "device-image-audit.txt");

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

const {
    supportedDevices,
    supportedDeviceStats,
    supportedDeviceMergeLog,
    supportedDeviceVariantGroups,
    verifiedDeviceImageByCodename,
} = loadTsModule(sourcePath);

// --- Collect per-device details ---
const uniqueCodenames = new Set();
const duplicateCodenames = new Set();
const missingImageCodenames = [];
const missingImageNames = [];
const devicesWithoutCodename = [];
const missingMappedImageFiles = [];
const brokenImageFiles = [];
const deviceDetails = [];

const imageExtensions = [".png", ".webp", ".jpg", ".jpeg"];

for (const device of supportedDevices) {
    if (!device.codename) {
        devicesWithoutCodename.push(device.name);
        continue;
    }

    if (uniqueCodenames.has(device.codename)) {
        duplicateCodenames.add(device.codename);
    }
    uniqueCodenames.add(device.codename);

    const aliases = device.aliases?.join(", ") || "";
    const category = device.category || "Unknown";

    if (!device.image) {
        const expectedPath = `public/devices/${device.codename}.webp`;
        missingImageCodenames.push(device.codename);
        missingImageNames.push(device.name);
        deviceDetails.push(`${device.codename} | ${device.name} | ${aliases} | ${category} | ${expectedPath} | missing`);
        continue;
    }

    // Check if the mapped file exists
    const relativeImagePath = device.image.replace(/^\//, "").replaceAll("/", path.sep);
    const absoluteImagePath = path.join(publicDir, relativeImagePath);

    if (!fs.existsSync(absoluteImagePath)) {
        missingMappedImageFiles.push(`${device.codename}: ${device.image}`);
        brokenImageFiles.push(`${device.codename}: ${device.image} (file not found)`);
        deviceDetails.push(`${device.codename} | ${device.name} | ${aliases} | ${category} | ${device.image} | broken`);
    } else {
        const stat = fs.statSync(absoluteImagePath);
        if (stat.size === 0) {
            brokenImageFiles.push(`${device.codename}: ${device.image} (zero size)`);
            deviceDetails.push(`${device.codename} | ${device.name} | ${aliases} | ${category} | ${device.image} | broken (zero size)`);
        } else {
            deviceDetails.push(`${device.codename} | ${device.name} | ${aliases} | ${category} | ${device.image} | verified`);
        }
    }
}

// Also check verifiedDeviceImageByCodename for missing files
for (const [codename, imagePath] of Object.entries(verifiedDeviceImageByCodename)) {
    const relativeImagePath = imagePath.replace(/^\//, "").replaceAll("/", path.sep);
    const absoluteImagePath = path.join(publicDir, relativeImagePath);
    if (!fs.existsSync(absoluteImagePath)) {
        const alreadyReported = missingMappedImageFiles.some((item) => item.startsWith(`${codename}:`));
        if (!alreadyReported) {
            missingMappedImageFiles.push(`${codename}: ${imagePath}`);
        }
    }
}

// --- Unused image detection ---
const allCodenames = new Set(supportedDevices.map((d) => d.codename));
const unusedImages = [];

if (fs.existsSync(devicesDir)) {
    const files = fs.readdirSync(devicesDir);
    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!imageExtensions.includes(ext)) continue;

        const basename = path.basename(file, ext);
        if (!allCodenames.has(basename)) {
            const filePath = path.join(devicesDir, file);
            const stat = fs.statSync(filePath);
            unusedImages.push(`${file} (${(stat.size / 1024).toFixed(1)} KB)`);
        }
    }
}

// --- Build report ---
const verifiedImageCount = supportedDevices.length - missingImageCodenames.length;
const placeholderCount = missingImageCodenames.length;
const mergedDuplicateCodenames = Array.from(new Set(supportedDeviceMergeLog.map((item) => item.codename)));

const lines = [
    "============================================================",
    " DeadZone Device Image Audit Report",
    ` Generated: ${new Date().toISOString()}`,
    "============================================================",
    "",
    "--- Summary ---",
    `total supported device records: ${supportedDevices.length}`,
    `source entries: ${supportedDeviceStats.sourceEntries}`,
    `unique codenames: ${uniqueCodenames.size}`,
    `duplicate codenames: ${duplicateCodenames.size}`,
    `duplicate codenames merged: ${mergedDuplicateCodenames.length}`,
    `verified image count: ${verifiedImageCount}`,
    `placeholder count: ${placeholderCount}`,
    `broken image files: ${brokenImageFiles.length}`,
    `unused image files: ${unusedImages.length}`,
    `devices without codename: ${devicesWithoutCodename.length}`,
    `missing mapped image files: ${missingMappedImageFiles.length}`,
    "",
    "--- Per-Device Detail ---",
    "codename | name | aliases | category | image path | status",
    "------------------------------------------------------------",
    ...deviceDetails,
    "",
    "--- Merged Duplicate Codename Details ---",
    ...(mergedDuplicateCodenames.length
        ? mergedDuplicateCodenames.map((codename) => {
            const merged = supportedDeviceMergeLog
                .filter((item) => item.codename === codename)
                .flatMap((item) => item.mergedNames);
            return `- ${codename}: ${Array.from(new Set(merged)).join(", ")}`;
        })
        : ["- none"]),
    "",
    "--- Variant Codename Groups ---",
    ...supportedDeviceVariantGroups.map((group) => `- ${group.label}: ${group.codenames.join(", ")}`),
    "",
    "--- Missing Image Codenames ---",
    ...(missingImageCodenames.length ? missingImageCodenames.map((codename) => `- ${codename}`) : ["- none"]),
    "",
    "--- Missing Image Names ---",
    ...(missingImageNames.length ? missingImageNames.map((name) => `- ${name}`) : ["- none"]),
    "",
    "--- Broken Image Files ---",
    ...(brokenImageFiles.length ? brokenImageFiles.map((item) => `- ${item}`) : ["- none"]),
    "",
    "--- Unused Image Files ---",
    "(files in public/devices/ not matching any supported device codename)",
    ...(unusedImages.length ? unusedImages.map((item) => `- ${item}`) : ["- none"]),
    "",
    "--- Missing Mapped Image Files ---",
    ...(missingMappedImageFiles.length ? missingMappedImageFiles.map((item) => `- ${item}`) : ["- none"]),
    "",
    "--- Devices Without Codename ---",
    ...(devicesWithoutCodename.length ? devicesWithoutCodename.map((name) => `- ${name}`) : ["- none"]),
    "",
];

fs.writeFileSync(reportPath, `${lines.join("\n")}\n`, "utf8");
console.log(lines.join("\n"));

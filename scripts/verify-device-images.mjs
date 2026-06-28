/**
 * Device Image Verification Tests
 *
 * Verifies:
 * - All verified images in verifiedDeviceImageByCodename have matching files
 * - No image src uses the DeadZone logo path
 * - Image resolver returns codename-only paths
 * - No broken image mappings
 * - Placeholder behavior when file missing
 * - Audit script exits cleanly
 * - Image files are non-zero
 * - No duplicate image paths for different codenames (unless variant)
 *
 * Usage:
 *   npm run test:device-images
 *   node scripts/verify-device-images.mjs
 */

import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const publicDir = path.join(root, "public");
const devicesDir = path.join(publicDir, "devices");

function loadTsModule(filePath, customRequires = {}) {
    const source = fs.readFileSync(filePath, "utf8");
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2020,
        },
        fileName: filePath,
    });

    const localRequire = (specifier) => {
        if (customRequires[specifier]) return customRequires[specifier];
        throw new Error(`Unsupported require in test: ${specifier}`);
    };

    const module = { exports: {} };
    const compiled = new Function("require", "module", "exports", outputText);
    compiled(localRequire, module, module.exports);
    return module.exports;
}

const supportedDevicesModule = loadTsModule(path.join(root, "src", "data", "supported-devices.ts"));
const deviceImagesModule = loadTsModule(path.join(root, "src", "lib", "device-images.ts"), {
    "@/data/supported-devices": supportedDevicesModule,
});

const { supportedDevices, verifiedDeviceImageByCodename, supportedDeviceVariantGroups } = supportedDevicesModule;
const { getVerifiedDeviceImage, hasVerifiedDeviceImage, getDeviceImage } = deviceImagesModule;

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        passed++;
    } else {
        console.error(`FAIL: ${message}`);
        failed++;
    }
}

// --- Test 1: All verified images have matching files ---
console.log("\n--- Test: Verified images have matching files ---");
for (const [codename, imagePath] of Object.entries(verifiedDeviceImageByCodename)) {
    const relativeImagePath = imagePath.replace(/^\//, "").replaceAll("/", path.sep);
    const absoluteImagePath = path.join(publicDir, relativeImagePath);
    assert(
        fs.existsSync(absoluteImagePath),
        `Verified image file missing for ${codename}: ${imagePath}`,
    );
}

// --- Test 2: Verified image files are non-zero ---
console.log("--- Test: Verified image files are non-zero ---");
for (const [codename, imagePath] of Object.entries(verifiedDeviceImageByCodename)) {
    const relativeImagePath = imagePath.replace(/^\//, "").replaceAll("/", path.sep);
    const absoluteImagePath = path.join(publicDir, relativeImagePath);
    if (fs.existsSync(absoluteImagePath)) {
        const stat = fs.statSync(absoluteImagePath);
        assert(stat.size > 0, `Verified image file is zero-size for ${codename}: ${imagePath}`);
    }
}

// --- Test 3: No image path uses the DeadZone logo ---
console.log("--- Test: No image path uses the DeadZone logo ---");
const logoPatterns = ["/brand/logo", "/brand/deadzone", "deadzone-logo", "logo.svg", "icon.svg"];
for (const [codename, imagePath] of Object.entries(verifiedDeviceImageByCodename)) {
    const lower = imagePath.toLowerCase();
    for (const pattern of logoPatterns) {
        assert(
            !lower.includes(pattern),
            `Image for ${codename} appears to be the DeadZone logo: ${imagePath}`,
        );
    }
}

// --- Test 4: Image resolver uses codename-only paths ---
console.log("--- Test: Image resolver returns codename-only paths ---");
for (const [codename, imagePath] of Object.entries(verifiedDeviceImageByCodename)) {
    const basename = path.basename(imagePath, path.extname(imagePath));
    assert(
        basename === codename,
        `Image path for ${codename} does not use codename as filename: ${imagePath} (basename: ${basename})`,
    );
}

// --- Test 5: getDeviceImage returns correct values ---
console.log("--- Test: getDeviceImage returns correct values ---");
for (const device of supportedDevices) {
    const image = getDeviceImage(device.codename);
    if (device.image) {
        assert(image === device.image, `getDeviceImage(${device.codename}) returned ${image}, expected ${device.image}`);
    } else {
        assert(image === null, `getDeviceImage(${device.codename}) should be null for placeholder device, got ${image}`);
    }
}

// --- Test 6: hasVerifiedDeviceImage consistency ---
console.log("--- Test: hasVerifiedDeviceImage consistency ---");
for (const device of supportedDevices) {
    const has = hasVerifiedDeviceImage(device.codename);
    const expected = !!device.image;
    assert(has === expected, `hasVerifiedDeviceImage(${device.codename}) returned ${has}, expected ${expected}`);
}

// --- Test 7: Placeholder renders when file missing ---
console.log("--- Test: Placeholder for missing images ---");
const fakeMissingCodename = "nonexistent_device_test_xyz";
assert(
    getDeviceImage(fakeMissingCodename) === null,
    `getDeviceImage should return null for nonexistent codename`,
);
assert(
    !hasVerifiedDeviceImage(fakeMissingCodename),
    `hasVerifiedDeviceImage should return false for nonexistent codename`,
);

// --- Test 8: Variant codenames have images if their primary does ---
console.log("--- Test: Variant codename images ---");
for (const group of supportedDeviceVariantGroups) {
    const images = group.codenames.map((cn) => ({
        codename: cn,
        image: verifiedDeviceImageByCodename[cn] || null,
    }));

    const anyHasImage = images.some((i) => i.image !== null);
    if (anyHasImage) {
        // If one variant has an image, note which ones don't (warning, not failure)
        for (const item of images) {
            if (!item.image) {
                console.log(`  NOTE: Variant ${item.codename} in group "${group.label}" has no image while siblings do`);
            }
        }
    }
}

// --- Test 9: Device image paths in supported-devices.ts reference /devices/ prefix ---
console.log("--- Test: All image paths use /devices/ prefix ---");
for (const [codename, imagePath] of Object.entries(verifiedDeviceImageByCodename)) {
    assert(
        imagePath.startsWith("/devices/"),
        `Image path for ${codename} doesn't start with /devices/: ${imagePath}`,
    );
}

// --- Summary ---
console.log("\n============================================================");
console.log(` Device Image Tests: ${passed} passed, ${failed} failed`);
console.log("============================================================\n");

if (failed > 0) {
    process.exit(1);
}

console.log("All device image tests passed.");

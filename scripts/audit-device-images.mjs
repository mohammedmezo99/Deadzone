import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const sourcePath = path.join(root, "src", "data", "supported-devices.ts");
const publicDir = path.join(root, "public");
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

const uniqueCodenames = new Set();
const duplicateCodenames = new Set();
const missingImageCodenames = [];
const missingImageNames = [];
const devicesWithoutCodename = [];
const missingMappedImageFiles = [];

for (const device of supportedDevices) {
    if (!device.codename) {
        devicesWithoutCodename.push(device.name);
        continue;
    }

    if (uniqueCodenames.has(device.codename)) {
        duplicateCodenames.add(device.codename);
    }
    uniqueCodenames.add(device.codename);

    if (!device.image) {
        missingImageCodenames.push(device.codename);
        missingImageNames.push(device.name);
        continue;
    }

    const relativeImagePath = device.image.replace(/^\//, "").replaceAll("/", path.sep);
    const absoluteImagePath = path.join(publicDir, relativeImagePath.replace(/^devices[\\/]/, `devices${path.sep}`));

    if (!fs.existsSync(absoluteImagePath)) {
        missingMappedImageFiles.push(`${device.codename}: ${device.image}`);
    }
}

for (const [codename, imagePath] of Object.entries(verifiedDeviceImageByCodename)) {
    const relativeImagePath = imagePath.replace(/^\//, "").replaceAll("/", path.sep);
    const absoluteImagePath = path.join(publicDir, relativeImagePath);
    if (!fs.existsSync(absoluteImagePath)) {
        missingMappedImageFiles.push(`${codename}: ${imagePath}`);
    }
}

const verifiedImageCount = supportedDevices.length - missingImageCodenames.length;
const placeholderCount = missingImageCodenames.length;
const mergedDuplicateCodenames = Array.from(new Set(supportedDeviceMergeLog.map((item) => item.codename)));

const lines = [
    `total supported device records: ${supportedDevices.length}`,
    `source entries: ${supportedDeviceStats.sourceEntries}`,
    `unique codenames: ${uniqueCodenames.size}`,
    `duplicate codenames: ${duplicateCodenames.size}`,
    `duplicate codenames merged: ${mergedDuplicateCodenames.length}`,
    `verified image count: ${verifiedImageCount}`,
    `placeholder count: ${placeholderCount}`,
    `devices without codename: ${devicesWithoutCodename.length}`,
    `missing mapped image files: ${missingMappedImageFiles.length}`,
    "",
    "merged duplicate codename details:",
    ...(mergedDuplicateCodenames.length
        ? mergedDuplicateCodenames.map((codename) => {
            const merged = supportedDeviceMergeLog
                .filter((item) => item.codename === codename)
                .flatMap((item) => item.mergedNames);
            return `- ${codename}: ${Array.from(new Set(merged)).join(", ")}`;
        })
        : ["- none"]),
    "",
    "variant codename groups:",
    ...supportedDeviceVariantGroups.map((group) => `- ${group.label}: ${group.codenames.join(", ")}`),
    "",
    "missing image codenames:",
    ...(missingImageCodenames.length ? missingImageCodenames.map((codename) => `- ${codename}`) : ["- none"]),
    "",
    "missing image names:",
    ...(missingImageNames.length ? missingImageNames.map((name) => `- ${name}`) : ["- none"]),
    "",
    "missing mapped image files:",
    ...(missingMappedImageFiles.length ? missingMappedImageFiles.map((item) => `- ${item}`) : ["- none"]),
    "",
    "devices without codename:",
    ...(devicesWithoutCodename.length ? devicesWithoutCodename.map((name) => `- ${name}`) : ["- none"]),
];

fs.writeFileSync(reportPath, `${lines.join("\n")}\n`, "utf8");
console.log(lines.join("\n"));

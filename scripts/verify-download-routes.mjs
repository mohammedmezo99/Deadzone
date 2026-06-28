const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const forbiddenDemoValues = [
    "https://drive.google.com/file/d/api/view",
    "https://example.com/changelog/api",
    "2222222222222222222222222222222222222222222222222222222222222222",
    "OS3.0.123.0",
    "DeadZoneLite_v1.06_ZIRCON_OS3.0.123.0_Global-A16.zip",
];

const checks = [
    {
        path: "/downloads",
        includes: ["DeadZone Download Center", "Supported Devices", "Active Devices", "Available Builds", "Premium Styles", "Search by device name, alias, or codename", "Copy Command", "Style: All", "Open Details", "Load More"],
    },
    {
        path: "/downloads?codename=zircon",
        includes: ["zircon", "Redmi Note 13 Pro+ 5G"],
    },
    {
        path: "/downloads?style=Lite",
        includes: ["Lite", "Copy Command"],
    },
    {
        path: "/downloads?codename=venus",
        includes: ["venus", "Xiaomi 11"],
    },
    {
        path: "/downloads?codename=zircon&style=Lite",
        includes: ["zircon", "Lite"],
    },
    {
        path: "/downloads?codename=dada",
        includes: ["dada", "Xiaomi 15"],
    },
    {
        path: "/downloads/zircon",
        includes: ["Redmi Note 13 Pro+ 5G", "zircon", "Available DeadZone Builds", "Copy Command", "Back to Download Center", "DeadZone Version", "v1.06", "Request on Telegram"],
    },
    {
        path: "/downloads/dada",
        includes: ["No public ROM file is available yet.", "This device is supported by DeadZone, but no public ROM file has been published on the website yet. You can request a build through Telegram.", "Request on Telegram", "v1.06"],
    },
    {
        path: "/downloads/not-a-real-device",
        includes: ["Device not found.", "Back to Download Center", "View Supported Devices", "Contact MEZO"],
    },
];

async function verifyBuildValidationHelpers() {
    const ts = await import("typescript");
    const fs = await import("node:fs");
    const path = await import("node:path");

    const root = process.cwd();
    const helperPath = path.join(root, "src", "lib", "builds.ts");
    const source = fs.readFileSync(helperPath, "utf8");
    const transpiled = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2020,
            baseUrl: root,
            paths: {
                "@/*": ["src/*"],
            },
        },
        fileName: helperPath,
    }).outputText;

    const localRequire = (specifier) => {
        if (specifier === "@/lib/deadzone-version") {
            return { getDeadZoneVersion: () => "v1.06" };
        }
        throw new Error(`Unsupported helper require: ${specifier}`);
    };

    const module = { exports: {} };
    const compiled = new Function("require", "module", "exports", transpiled);
    compiled(localRequire, module, module.exports);

    const {
        sanitizeBuildForPublicResponse,
        hasPublishedFile,
        getBuildAvailabilityStatus,
        deriveHyperOsVersion,
        deriveRegion,
    } = module.exports;

    const incomplete = sanitizeBuildForPublicResponse({
        id: "bad-build",
        deviceName: "Redmi Note 13 Pro+ 5G",
        codename: "zircon",
        style: "Lite",
        status: "Available",
        deadZoneVersion: "v1.06",
        androidVersion: "A16",
        hyperOsVersion: "OS3",
        romVersion: "OS3.0.xxx",
        region: "Global",
        filename: "real-final-file.zip",
        updatedAt: "2026-06-28T00:00:00.000Z",
    });

    if (hasPublishedFile(incomplete)) {
        throw new Error("incomplete build was incorrectly treated as published");
    }
    if (incomplete.status !== "Upload Pending") {
        throw new Error("incomplete build was not normalized to Upload Pending");
    }
    if (incomplete.downloadUrl || incomplete.sha256 || incomplete.fileSize) {
        throw new Error("incomplete build retained restricted file metadata");
    }

    const complete = sanitizeBuildForPublicResponse({
        id: "good-build",
        deviceName: "Redmi Note 13 Pro+ 5G",
        codename: "zircon",
        style: "Lite",
        status: "Available",
        deadZoneVersion: "v1.06",
        androidVersion: "A16",
        hyperOsVersion: "OS3",
        romVersion: "OS3.0.xxx",
        region: "Global",
        filename: "real-final-file.zip",
        downloadUrl: "https://drive.google.com/file/d/real/view",
        sha256: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        fileSize: "5.4 GB",
        updatedAt: "2026-06-28T00:00:00.000Z",
    });

    if (!hasPublishedFile(complete)) {
        throw new Error("complete build was not treated as published");
    }
    if (complete.status !== "Available") {
        throw new Error("complete build lost Available status");
    }

    const uploadedPending = sanitizeBuildForPublicResponse({
        id: "upload-pending",
        deviceName: "Redmi Note 13 Pro+ 5G",
        codename: "zircon",
        style: "Lite",
        status: "Available",
        deadZoneVersion: "v1.06",
        filename: "real-final-file.zip",
    });

    if (uploadedPending.status !== "Upload Pending") {
        throw new Error("filename-only build did not normalize to Upload Pending");
    }
    if (hasPublishedFile(uploadedPending)) {
        throw new Error("filename-only build was incorrectly treated as published");
    }

    const processingOnly = sanitizeBuildForPublicResponse({
        id: "processing-only",
        deviceName: "Redmi Note 13 Pro+ 5G",
        codename: "zircon",
        style: "Lite",
        status: "Available",
        deadZoneVersion: "v1.06",
        downloadUrl: "https://drive.google.com/file/d/real/view",
    });

    if (processingOnly.status !== "ROM Link Available") {
        throw new Error("downloadUrl-only build did not normalize to ROM Link Available");
    }
    if (hasPublishedFile(processingOnly)) {
        throw new Error("downloadUrl-only build was incorrectly treated as published");
    }

    const metadataIncomplete = sanitizeBuildForPublicResponse({
        id: "metadata-incomplete",
        deviceName: "Redmi Note 13 Pro+ 5G",
        codename: "zircon",
        style: "Lite",
        status: "Available",
        deadZoneVersion: "v1.06",
        filename: "real-final-file.zip",
        downloadUrl: "https://drive.google.com/file/d/real/view",
    });

    if (metadataIncomplete.status !== "Metadata Incomplete") {
        throw new Error("downloadUrl+filename build did not normalize to Metadata Incomplete");
    }
    if (hasPublishedFile(metadataIncomplete)) {
        throw new Error("metadata-incomplete build was incorrectly treated as published");
    }
    if (getBuildAvailabilityStatus(metadataIncomplete) !== "Metadata Incomplete") {
        throw new Error("metadata-incomplete build availability status mismatch");
    }

    if (deriveHyperOsVersion("OS3.0.303.0.WNOCNXM") !== "OS3") {
        throw new Error("failed to derive OS3 from China ROM version");
    }
    if (deriveHyperOsVersion("OS3.0.6.0.WNOEUXM") !== "OS3") {
        throw new Error("failed to derive OS3 from EEA ROM version");
    }
    if (deriveRegion("", "OS3.0.303.0.WNOCNXM") !== "ChinaStable") {
        throw new Error("failed to derive ChinaStable region");
    }
    if (deriveRegion("", "OS3.0.6.0.WNOEUXM") !== "EEAStable") {
        throw new Error("failed to derive EEAStable region");
    }
    if (deriveRegion("", "V14.0.2.0.TMCMIXM") !== "GlobalStable") {
        throw new Error("failed to derive GlobalStable region");
    }
}

async function verifyRoute({ path, includes = [], includesAny = [] }) {
    const response = await fetch(`${baseUrl}${path}`);

    if (!response.ok) {
        throw new Error(`${path} returned ${response.status}`);
    }

    const html = await response.text();

    if (html.includes('href="/downloadscodename=')) {
        throw new Error(`${path} contains malformed /downloadscodename route`);
    }

    if (html.includes('href="/downloadsstyle=')) {
        throw new Error(`${path} contains malformed /downloadsstyle route`);
    }

    for (const expected of includes) {
        if (!html.includes(expected)) {
            throw new Error(`${path} is missing expected content: ${expected}`);
        }
    }

    if (includesAny.length > 0 && !includesAny.some((expected) => html.includes(expected))) {
        throw new Error(`${path} is missing all expected content variants: ${includesAny.join(", ")}`);
    }

    if (path === "/downloads") {
        const detailLinks = html.match(/href="\/downloads\/[a-z0-9-]+"/g) || [];
        if (detailLinks.length === 0) {
            throw new Error("/downloads is missing canonical detail links");
        }
    }

    if (html.includes("Dead Zone")) {
        throw new Error(`${path} contains forbidden "Dead Zone" text`);
    }

    if (html.includes("v3.2")) {
        throw new Error(`${path} still contains fake v3.2 version text`);
    }

    if (html.includes("DeadZone-zircon-Lite-v3.2.zip")) {
        throw new Error(`${path} still contains fake filename text`);
    }

    if (html.includes("4f4a6f9c69b0cf6a951f4e7292fc25e6b38a1b4d1ea70a3f5f6e97a7ab12c9d4")) {
        throw new Error(`${path} still contains fake SHA256 text`);
    }

    for (const forbidden of forbiddenDemoValues) {
        if (html.includes(forbidden)) {
            throw new Error(`${path} contains forbidden demo metadata: ${forbidden}`);
        }
    }

    if ((path === "/downloads/zircon" || path === "/downloads/dada") && !html.includes('href="https://t.me/xDeadZoneh"')) {
        throw new Error(`${path} is missing the request Telegram link`);
    }

    console.log(`PASS ${path}`);
}

async function main() {
    await verifyBuildValidationHelpers();

    const apiResponse = await fetch(`${baseUrl}/api/builds`);
    if (!apiResponse.ok) {
        throw new Error(`/api/builds returned ${apiResponse.status}`);
    }
    const apiPayload = await apiResponse.json();
    if (apiPayload?.ok !== true || !Array.isArray(apiPayload?.builds) || apiPayload.builds.length !== 0) {
        throw new Error("/api/builds did not return a clean empty payload");
    }
    const serializedPayload = JSON.stringify(apiPayload);
    for (const forbidden of forbiddenDemoValues) {
        if (serializedPayload.includes(forbidden)) {
            throw new Error(`/api/builds contains forbidden demo metadata: ${forbidden}`);
        }
    }

    for (const check of checks) {
        await verifyRoute(check);
    }
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

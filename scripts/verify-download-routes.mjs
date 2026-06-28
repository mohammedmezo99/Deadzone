const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

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

    if ((path === "/downloads/zircon" || path === "/downloads/dada") && !html.includes('href="https://t.me/xDeadZoneh"')) {
        throw new Error(`${path} is missing the request Telegram link`);
    }

    console.log(`PASS ${path}`);
}

async function main() {
    for (const check of checks) {
        await verifyRoute(check);
    }
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

const checks = [
    {
        path: "/downloads",
        includes: ["DeadZone Downloads", "DeadZone Build Index"],
    },
    {
        path: "/downloads?codename=zircon",
        includes: ["zircon", "Redmi Note 13 Pro+ 5G"],
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
        includesAny: ["No public builds found for codename: dada", "dada"],
    },
];

async function verifyRoute({ path, includes = [], includesAny = [] }) {
    const response = await fetch(`${baseUrl}${path}`);

    if (!response.ok) {
        throw new Error(`${path} returned ${response.status}`);
    }

    const html = await response.text();

    for (const expected of includes) {
        if (!html.includes(expected)) {
            throw new Error(`${path} is missing expected content: ${expected}`);
        }
    }

    if (includesAny.length > 0 && !includesAny.some((expected) => html.includes(expected))) {
        throw new Error(`${path} is missing all expected content variants: ${includesAny.join(", ")}`);
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

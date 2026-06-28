const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const forbiddenDemoValues = [
    "https://drive.google.com/file/d/api/view",
    "https://example.com/changelog/api",
    "2222222222222222222222222222222222222222222222222222222222222222",
    "OS3.0.123.0",
    "DeadZoneLite_v1.06_ZIRCON_OS3.0.123.0_Global-A16.zip",
];

async function main() {
    const response = await fetch(`${baseUrl}/premium`);

    if (!response.ok) {
        throw new Error(`/premium returned ${response.status}`);
    }

    const html = await response.text();

    const expected = [
        "DeadZone Premium",
        "Unlock GamingPlus, Legend, and Ninja builds with premium DeadZone access by MEZO.",
        "GamingPlus",
        "Legend",
        "Ninja",
        "Feature",
        "Lite",
        "GamingPlus",
        "Legend",
        "Ninja",
        "Contact MEZO",
        'href="/gallery"',
        'href="/devices"',
        "View gallery screenshots",
    ];

    for (const item of expected) {
        if (!html.includes(item)) {
            throw new Error(`/premium is missing expected content: ${item}`);
        }
    }

    if (html.includes("Dead Zone")) {
        throw new Error('/premium contains forbidden "Dead Zone" text');
    }

    for (const forbidden of forbiddenDemoValues) {
        if (html.includes(forbidden)) {
            throw new Error(`/premium contains forbidden demo metadata: ${forbidden}`);
        }
    }

    console.log("PASS /premium");
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

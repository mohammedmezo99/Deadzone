const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

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
        'href="/styles"',
        'href="/devices"',
        "View style screenshots",
    ];

    for (const item of expected) {
        if (!html.includes(item)) {
            throw new Error(`/premium is missing expected content: ${item}`);
        }
    }

    if (html.includes("Dead Zone")) {
        throw new Error('/premium contains forbidden "Dead Zone" text');
    }

    console.log("PASS /premium");
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

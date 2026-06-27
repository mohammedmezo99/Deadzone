const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

async function main() {
    const response = await fetch(`${baseUrl}/guide`);

    if (!response.ok) {
        throw new Error(`/guide returned ${response.status}`);
    }

    const html = await response.text();

    const expected = [
        "DeadZone Install Guide",
        "Before You Flash",
        "Required Information",
        "How to Request DeadZone Lite",
        "Premium Styles",
        "Important Warning",
        "Contact MEZO",
        'href="/contact"',
        'href="/devices"',
        'href="/downloads"',
        "Support Template",
        "View Supported Devices",
        "Check Downloads",
    ];

    for (const item of expected) {
        if (!html.includes(item)) {
            throw new Error(`/guide is missing expected content: ${item}`);
        }
    }

    if (html.includes("Dead Zone")) {
        throw new Error('/guide contains forbidden "Dead Zone" text');
    }

    console.log("PASS /guide");
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

async function main() {
    const response = await fetch(`${baseUrl}/status`);

    if (!response.ok) {
        throw new Error(`/status returned ${response.status}`);
    }

    const html = await response.text();

    const expected = [
        "DeadZone Status",
        "Build System",
        "Telegram Bot",
        "Downloads",
        "Premium Support",
        "Maintenance",
        "Contact MEZO",
        'href="/contact"',
        'href="/devices"',
        "Support Template",
        "View Supported Devices",
    ];

    for (const item of expected) {
        if (!html.includes(item)) {
            throw new Error(`/status is missing expected content: ${item}`);
        }
    }

    if (html.includes("Dead Zone")) {
        throw new Error('/status contains forbidden "Dead Zone" text');
    }

    console.log("PASS /status");
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

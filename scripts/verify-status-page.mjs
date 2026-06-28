const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const forbiddenDemoValues = [
    "https://drive.google.com/file/d/api/view",
    "https://example.com/changelog/api",
    "2222222222222222222222222222222222222222222222222222222222222222",
    "OS3.0.123.0",
    "DeadZoneLite_v1.06_ZIRCON_OS3.0.123.0_Global-A16.zip",
];

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

    for (const forbidden of forbiddenDemoValues) {
        if (html.includes(forbidden)) {
            throw new Error(`/status contains forbidden demo metadata: ${forbidden}`);
        }
    }

    console.log("PASS /status");
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

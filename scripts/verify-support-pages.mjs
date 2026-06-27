const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

async function verifyHome() {
    const response = await fetch(`${baseUrl}/`);

    if (!response.ok) {
        throw new Error(`/ returned ${response.status}`);
    }

    const html = await response.text();

    const expected = [
        "🛠 DeadZone Maintenance Active",
        "MEZO is currently checking reported issues.",
    ];

    for (const item of expected) {
        if (!html.includes(item)) {
            throw new Error(`/ is missing expected content: ${item}`);
        }
    }

    console.log("PASS /");
}

async function verifyContact() {
    const response = await fetch(`${baseUrl}/contact`);

    if (!response.ok) {
        throw new Error(`/contact returned ${response.status}`);
    }

    const html = await response.text();

    const expected = [
        "Support Report Template",
        "Copy Support Template",
        "Contact MEZO",
        "View Supported Devices",
        "Reports without device codename and clear problem details cannot be checked properly.",
        "href=\"/devices\"",
    ];

    for (const item of expected) {
        if (!html.includes(item)) {
            throw new Error(`/contact is missing expected content: ${item}`);
        }
    }

    console.log("PASS /contact");
}

async function main() {
    await verifyHome();
    await verifyContact();
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

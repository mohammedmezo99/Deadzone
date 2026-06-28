const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

async function main() {
    const response = await fetch(`${baseUrl}/styles`);

    if (!response.ok) {
        throw new Error(`/styles returned ${response.status}`);
    }

    const html = await response.text();

    const expected = [
        "DeadZone Builds Showcase",
        "Explore DeadZone styles and system previews for supported Xiaomi, Redmi, and POCO devices.",
        "DeadZone Lite",
        "DeadZone GamingPlus",
        "DeadZone Legend",
        "DeadZone Ninja",
        "Screenshot Preview Slots",
        "Home Screen",
        "Settings",
        "Control Center",
        'href="/downloads?style=Lite"',
        "Contact MEZO",
    ];

    for (const item of expected) {
        if (!html.includes(item)) {
            throw new Error(`/styles is missing expected content: ${item}`);
        }
    }

    if (html.includes('href="/downloadsstyle=Lite"')) {
        throw new Error('/styles still contains malformed Lite CTA route');
    }

    console.log("PASS /styles showcase");
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

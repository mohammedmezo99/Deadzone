const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const forbiddenDemoValues = [
    "https://drive.google.com/file/d/api/view",
    "https://example.com/changelog/api",
    "2222222222222222222222222222222222222222222222222222222222222222",
    "OS3.0.123.0",
    "DeadZoneLite_v1.06_ZIRCON_OS3.0.123.0_Global-A16.zip",
];

async function main() {
    const response = await fetch(`${baseUrl}/devices`);

    if (!response.ok) {
        throw new Error(`/devices returned ${response.status}`);
    }

    const html = await response.text();

    if (!html.includes("DeadZone Supported Devices")) {
        throw new Error("/devices is missing the page title");
    }

    const canonicalLinks = html.match(/href="\/downloads\/[a-z0-9-]+"/g) || [];
    if (canonicalLinks.length < 24) {
        throw new Error("/devices is missing canonical detail links");
    }

    if (html.includes('href="/downloadscodename=')) {
        throw new Error('/devices still contains malformed downloads path routes');
    }

    if (html.includes('href="/downloadsstyle=')) {
        throw new Error('/devices still contains malformed downloads style routes');
    }

    if (!html.includes("Copy Command")) {
        throw new Error("/devices is missing the Copy Command button");
    }

    if (!html.includes("Contact MEZO")) {
        throw new Error("/devices is missing the Contact MEZO button");
    }

    if (!html.includes("Load More")) {
        throw new Error("/devices is missing the Load More control");
    }

    if (!html.includes("Supported Devices") || !html.includes("Xiaomi Devices") || !html.includes("Verified Images") || !html.includes("Placeholder Images")) {
        throw new Error("/devices is missing required stats cards");
    }

    if (!html.includes("Category: All") || !html.includes("Family: All") || !html.includes("Image: All") || !html.includes("Style: All")) {
        throw new Error("/devices is missing required filters");
    }

    if (!html.includes("Open Details")) {
        throw new Error("/devices is missing the Open Details button");
    }

    if (!html.includes("Verified Image") || !html.includes("Placeholder")) {
        throw new Error("/devices is missing image status badges");
    }

    if (!html.includes("Not sure about your codename?")) {
        throw new Error("/devices is missing the codename helper block");
    }

    const deviceCards = html.match(/data-device-card="true"/g) || [];
    if (deviceCards.length !== 24) {
        throw new Error(`/devices should render 24 cards by default, found ${deviceCards.length}`);
    }

    if (!html.includes("Family: All")) {
        throw new Error("/devices is missing the family filter");
    }

    if (html.includes("Dead Zone")) {
        throw new Error('/devices contains forbidden "Dead Zone" text');
    }

    for (const forbidden of forbiddenDemoValues) {
        if (html.includes(forbidden)) {
            throw new Error(`/devices contains forbidden demo metadata: ${forbidden}`);
        }
    }

    console.log("PASS /devices");
    console.log(`PASS canonical links ${canonicalLinks.length}`);
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

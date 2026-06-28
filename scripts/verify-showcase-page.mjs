const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

async function main() {
    const response = await fetch(`${baseUrl}/styles`);

    if (!response.ok) {
        throw new Error(`/styles returned ${response.status}`);
    }

    const html = await response.text();

    /* ── Existing showcase checks ──────────────────────────────── */
    const showcaseExpected = [
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
        "Contact MEZO",
    ];

    for (const item of showcaseExpected) {
        if (!html.includes(item)) {
            throw new Error(`/styles is missing expected content: ${item}`);
        }
    }

    /* ── Lite Highlights gallery checks ────────────────────────── */
    const galleryExpected = [
        "DeadZone Lite Highlights",
        "Explore the public DeadZone Lite experience",
        "Get DeadZone Lite",
        "Public Lite builds can be requested through the DeadZone Telegram bot",
        "lite-gallery",                               // section anchor id
        "Previous screenshot",                         // prev button aria-label
        "Next screenshot",                             // next button aria-label
        "deadzone-lite",                               // screenshot folder reference (in img src or RSC payload)
        "Lite Screenshot 1",                           // first screenshot label
        "object-contain",                              // image display mode (visible in rendered img tag)
    ];

    for (const item of galleryExpected) {
        if (!html.includes(item)) {
            throw new Error(`/styles gallery is missing: ${item}`);
        }
    }

    /* ── CTA link checks ─────────────────────────────────────── */
    if (!html.includes("/downloads?style=Lite")) {
        throw new Error("/styles is missing View Lite Builds CTA link");
    }

    if (!html.includes("/devices")) {
        throw new Error("/styles is missing Supported Devices CTA link");
    }

    /* ── Negative checks ─────────────────────────────────────── */
    if (html.includes('href="/downloadsstyle=Lite"')) {
        throw new Error("/styles still contains malformed Lite CTA route");
    }

    if (html.includes('href="/downloadscodename=')) {
        throw new Error("/styles still contains malformed codename route");
    }

    // "Dead Zone" with a space should never appear
    const deadZoneMatch = html.match(/Dead\s+Zone/g);
    if (deadZoneMatch) {
        const badMatches = deadZoneMatch.filter(m => m.includes(" "));
        if (badMatches.length > 0) {
            throw new Error(`/styles contains "Dead Zone" with a space: "${badMatches[0]}"`);
        }
    }

    console.log("PASS /styles showcase");
    console.log("PASS /styles lite gallery");
    console.log("PASS /styles nav controls & object-contain");
    console.log("PASS /styles CTA links");
    console.log("PASS /styles no malformed routes");
    console.log("PASS /styles branding check");
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

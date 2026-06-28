import fs from "fs";
import path from "path";

const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

const liteFolder = path.join(process.cwd(), "public", "showcase", "deadzone-lite");
const liteImages = fs.readdirSync(liteFolder).filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

async function main() {
    const galleryResponse = await fetch(`${baseUrl}/gallery`);

    if (!galleryResponse.ok) {
        throw new Error(`/gallery returned ${galleryResponse.status}`);
    }

    const html = await galleryResponse.text();

    const expected = [
        "DeadZone Gallery",
        "Explore DeadZone screenshots and visual previews for Lite, GamingPlus, Legend, and Ninja.",
        "Gallery",
        "DeadZone Lite",
        "DeadZone GamingPlus",
        "DeadZone Legend",
        "DeadZone Ninja",
        "GamingPlus screenshots coming soon.",
        "Legend screenshots coming soon.",
        "Ninja screenshots coming soon.",
        "Get DeadZone Lite",
        "Public Lite builds can be requested through the DeadZone Telegram bot for supported devices.",
        "lite-gallery",
        "Previous screenshot",
        "Next screenshot",
        "Contact MEZO",
        'href="/downloads?style=Lite"',
        'href="/premium"',
        'href="/devices"',
        "object-contain",
    ];

    for (const item of expected) {
        if (!html.includes(item)) {
            throw new Error(`/gallery is missing expected content: ${item}`);
        }
    }

    if (!html.includes(">Gallery<")) {
        throw new Error("/gallery is missing the Gallery navigation label");
    }

    if (!/1(?:<!--.*?-->)*\s*<span[^>]*>\/</s.test(html)) {
        throw new Error("/gallery is missing the image counter");
    }

    if (html.includes("object-cover")) {
        throw new Error("/gallery contains object-cover where screenshots should use object-contain");
    }

    for (const [index, file] of liteImages.entries()) {
        const src = `/showcase/deadzone-lite/${file}`;
        const alt = `Lite Screenshot ${index + 1}`;

        if (!html.includes(src)) {
            throw new Error(`/gallery is missing screenshot source: ${src}`);
        }

        if (!html.includes(alt)) {
            throw new Error(`/gallery is missing screenshot alt text: ${alt}`);
        }
    }

    if (html.includes("Dead Zone")) {
        throw new Error('/gallery contains forbidden "Dead Zone" text');
    }

    if (!html.includes('href="/downloads?style=Lite"')) {
        throw new Error("/gallery is missing the canonical Lite CTA route");
    }

    if (html.includes('href="/downloadsstyle=Lite"') || html.includes('href="/downloadscodename=')) {
        throw new Error("/gallery contains malformed legacy downloads routes in rendered UI");
    }

    const legacyResponse = await fetch(`${baseUrl}/styles`, { redirect: "manual" });

    if ([307, 308].includes(legacyResponse.status)) {
        const location = legacyResponse.headers.get("location");
        if (location !== "/gallery") {
            throw new Error(`/styles redirected to ${location ?? "null"} instead of /gallery`);
        }
    } else if (legacyResponse.status === 200) {
        const legacyHtml = await legacyResponse.text();
        const safelyRedirects = legacyHtml.includes('http-equiv="refresh"') && legacyHtml.includes("url=/gallery");
        const safelyRenders = legacyHtml.includes("DeadZone Gallery");
        if (!safelyRedirects && !safelyRenders) {
            throw new Error('/styles returned 200 but did not safely redirect or render the gallery');
        }
    } else {
        throw new Error(`/styles returned ${legacyResponse.status} instead of 200/307/308`);
    }

    console.log("PASS /gallery");
    console.log("PASS /styles -> /gallery");
    console.log(`PASS lite screenshots ${liteImages.length}`);
    console.log("PASS gallery navigation and controls");
    console.log("PASS gallery branding and routes");
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

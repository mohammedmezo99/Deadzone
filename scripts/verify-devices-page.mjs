const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

async function main() {
    const response = await fetch(`${baseUrl}/devices`);

    if (!response.ok) {
        throw new Error(`/devices returned ${response.status}`);
    }

    const html = await response.text();

    if (!html.includes("DeadZone Supported Devices")) {
        throw new Error("/devices is missing the page title");
    }

    const canonicalLinks = html.match(/href="\/downloads\?codename=[^"]+"/g) || [];
    if (canonicalLinks.length === 0) {
        throw new Error("/devices is missing canonical Check Builds links");
    }

    if (html.includes('href="/downloadscodename=')) {
        throw new Error('/devices still contains malformed downloads path routes');
    }

    if (!html.includes("Copy Command")) {
        throw new Error("/devices is missing the Copy Command button");
    }

    if (!html.includes("Request Build")) {
        throw new Error("/devices is missing the Request Build button");
    }

    if (!html.includes("Load More")) {
        throw new Error("/devices is missing the Load More control");
    }

    if (!html.includes("Family: All")) {
        throw new Error("/devices is missing the family filter");
    }

    if (html.includes("Dead Zone")) {
        throw new Error('/devices contains forbidden "Dead Zone" text');
    }

    console.log("PASS /devices");
    console.log(`PASS canonical links ${canonicalLinks.length}`);
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

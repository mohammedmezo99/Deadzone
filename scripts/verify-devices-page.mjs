const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

const expectedLinks = [
    '/downloads?codename=zircon',
    '/downloads?codename=venus',
    '/downloads?codename=dada',
];

async function main() {
    const response = await fetch(`${baseUrl}/devices`);

    if (!response.ok) {
        throw new Error(`/devices returned ${response.status}`);
    }

    const html = await response.text();

    if (!html.includes("DeadZone Device Gallery")) {
        throw new Error("/devices is missing the page title");
    }

    for (const href of expectedLinks) {
        if (!html.includes(href)) {
            throw new Error(`/devices is missing expected Check Builds link: ${href}`);
        }
    }

    if (!html.includes("Copy Command")) {
        throw new Error("/devices is missing the Copy Command button");
    }

    if (!html.includes("Request Build")) {
        throw new Error("/devices is missing the Request Build button");
    }

    console.log("PASS /devices");
    for (const href of expectedLinks) {
        console.log(`PASS link ${href}`);
    }
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");

const checks = [
    {
        path: "/downloadscodename=zircon",
        location: "/downloads?codename=zircon",
    },
    {
        path: "/downloadscodename=zircon&style=Lite",
        location: "/downloads?codename=zircon&style=Lite",
    },
];

async function verifyRedirect({ path, location }) {
    const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });

    if (![307, 308].includes(response.status)) {
        throw new Error(`${path} returned ${response.status} instead of 307/308`);
    }

    const target = response.headers.get("location");
    if (target !== location) {
        throw new Error(`${path} redirected to ${target ?? "null"} instead of ${location}`);
    }

    console.log(`PASS ${path} -> ${location}`);
}

async function main() {
    for (const check of checks) {
        await verifyRedirect(check);
    }
}

main().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exit(1);
});

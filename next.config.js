/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["placeholder.supabase.co"],
    },
    async redirects() {
        return [
            {
                source: "/downloadscodename=:codename",
                destination: "/downloads?codename=:codename",
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        domains: ['cdn.resales-online.com', 'resource.resales-online.com'],
        unoptimized: true
    },
};

module.exports = nextConfig;

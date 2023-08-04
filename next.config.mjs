/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
        serverActions: true,
    },
    output: 'standalone',
};

export default nextConfig;

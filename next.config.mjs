/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // output: 'export',
    experimental: {
        appDir: true,
    },
    // async rewrites() {
    //     return {
    //         fallback: [
    //             {
    //                 source: '/api/:path*',
    //                 destination: `http://101.201.224.2:46943/api/:path*`,
    //             },
    //             {
    //               source: '/rest/:path*',
    //               destination: `http://101.201.224.2:46943/rest/:path*`,
    //           },
    //         ],
    //     };
    // },
};

export default nextConfig;

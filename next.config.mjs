/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'data.livriz.com',
            },
            {
                protocol: 'https',
                hostname: 'www.latercera.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
            },
            {
                protocol: 'https',
                hostname: 'nest-app-6t3h.onrender.com',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/proxy/:path*",
                destination: "https://nest-app-6t3h.onrender.com/:path*",
            },
        ];
    },
};

export default nextConfig;

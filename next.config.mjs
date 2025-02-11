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
                source: "/productos/con-autor",
                destination: "https://nest-app-6t3h.onrender.com/api/v1/product/with-author",
            },
        ];
    },
};

export default nextConfig;

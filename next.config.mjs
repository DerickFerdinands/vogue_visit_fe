/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dribbble.com',
                port: '',
                pathname: '/**',
            },

            {
                protocol: 'https',
                hostname: 'voguebebucket.s3.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;

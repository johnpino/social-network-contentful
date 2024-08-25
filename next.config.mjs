/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'place-hold.it',
                port: ''
            }
        ]
    }
};

export default nextConfig;

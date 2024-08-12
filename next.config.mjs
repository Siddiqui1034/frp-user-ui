/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
       remotePatterns : [
        {   protocol: 'https',
            hostname: 'www.google.com', 
            pathname: '**'
        },
        {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '**',
        },
        ],    
    },   
};

export default nextConfig;


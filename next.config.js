/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.linkedin.com',
        port: '',
        pathname: '/v1/**',
      },
    ],
  },
}

module.exports = nextConfig

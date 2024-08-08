/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'm.media-amazon.com'],
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;

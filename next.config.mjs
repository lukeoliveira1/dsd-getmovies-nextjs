/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com", "m.media-amazon.com"],
  },
  env: {
    OMDB_API_KEY: process.env.OMDB_API_KEY,
    API_HOST: process.env.API_HOST,
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    NEXT_PUBLIC_GITHUB_CALLBACK: process.env.NEXT_PUBLIC_GITHUB_CALLBACK,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CALLBACK: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK,
  },
};

export default nextConfig;

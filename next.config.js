/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL:
      process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
    NEXT_PUBLIC_FIXER_API_KEY: process.env.NEXT_PUBLIC_FIXER_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;

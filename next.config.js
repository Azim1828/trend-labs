/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.dummyjson.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

module.exports = nextConfig;

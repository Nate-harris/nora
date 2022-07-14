/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  env: {
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN || "sanity-token-not-set",
    SANITY_PROJECT_DATASET:
      process.env.SANITY_PROJECT_DATASET || "dataset-not-set",
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID || "project-not-set",
  },
};

module.exports = nextConfig;

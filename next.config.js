/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["three"]);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(frag|vert)$/,
      type: "asset/source",
    });
    return config;
  },
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

module.exports = withTM(nextConfig);

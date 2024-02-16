const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "healtystorages.s3.amazonaws.com",
        port: "",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);

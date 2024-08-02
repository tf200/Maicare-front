const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: "build",
  images: {
    remotePatterns: [
      {
        // Allow loading images from any domain/subdomain.
        hostname: "**",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);

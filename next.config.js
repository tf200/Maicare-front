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

module.exports = nextConfig;

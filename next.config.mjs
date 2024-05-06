/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "womo-assets.s3.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;

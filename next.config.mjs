/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // loader: "custom",
    // loaderFile: "./my/image/loader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lms6.iantlms.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;

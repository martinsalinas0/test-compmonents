import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options here */
  images: {
    domains: ["randomuser.me"], // ✅ allow external images from this domain
  },
};

export default nextConfig;

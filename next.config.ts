import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000","friendly-cod-grjjqx6v7xx39rjv-3000.app.github.dev","*.app.github.dev"]
    }
  }
};

export default nextConfig;

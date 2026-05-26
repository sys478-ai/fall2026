import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  basePath: '/fall2026',
  assetPrefix: '/fall2026/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;

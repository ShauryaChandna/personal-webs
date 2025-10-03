import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/personal-webs',
  assetPrefix: '/personal-webs',
};

export default nextConfig;

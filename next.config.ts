import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/sama",
  trailingSlash: true,
};

export default nextConfig;

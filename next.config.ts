import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH=/brick-agency-landing — для GitHub Pages (project pages)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;

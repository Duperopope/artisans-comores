import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export" removed — the CMS dashboard requires server-side API routes.
  // Deploy to Vercel (not GitHub Pages) to enable content editing at /dashboard.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;

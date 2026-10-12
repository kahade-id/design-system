import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@kahade/ui"],
  // Situs showcase punya lockfile sendiri di dalam repo DS — tetapkan root
  // agar Turbopack tidak menebak root dari lockfile induk.
  turbopack: { root: process.cwd() },
};

export default nextConfig;

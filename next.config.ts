import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  ...(process.platform === "win32" && !process.env.VERCEL
    ? {
        experimental: {
          turbopackPluginRuntimeStrategy: "forceWorkerThreads" as const,
        },
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

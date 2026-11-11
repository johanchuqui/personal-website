import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build the site as plain static files (in the `out/` folder) so it can be
  // hosted anywhere, including Cloudflare. See README → Deploy.
  output: "export",
  // Static hosting has no image-resizing server, so serve images as-is.
  images: { unoptimized: true },
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

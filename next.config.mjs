/**
 * The demo is a fully static site: no server rendering, no API routes, all
 * personal state in localStorage. That lets `next build` emit plain HTML into
 * /out, which is what GitHub Pages serves.
 *
 * On GitHub Pages the site lives under /<repo>/, so the workflow passes
 * NEXT_PUBLIC_BASE_PATH. Locally the variable is unset and the site runs at /.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  // Each route becomes <route>/index.html, which static hosts resolve cleanly.
  trailingSlash: true,
  images: {
    // There is no server to optimise images on a static host.
    unoptimized: true,
  },
};

export default nextConfig;

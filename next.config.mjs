import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── GitHub Pages static export ──────────────────────────────
  output: "export",          // generates /out directory as pure static HTML
  trailingSlash: true,       // /aiguablava → /aiguablava/index.html (GitHub Pages needs this)
  // ────────────────────────────────────────────────────────────

  turbopack: {
    root,
  },
  images: {
    unoptimized: true,       // required for static export — no server to optimize at runtime
  },
};

export default nextConfig;

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── GitHub Pages static export ──────────────────────────────
  output: "export",          // genera carpeta /out con HTML puro
  trailingSlash: true,       // /aiguablava → /aiguablava/index.html (GitHub Pages lo necesita)

  // basePath: si el repo NO es usuario.github.io (es un repo normal),
  // configura NEXT_PUBLIC_BASE_PATH=/nombre-de-tu-repo en los Secrets de GitHub Actions.
  // En local no se define y funciona igual (localhost:3001).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // ────────────────────────────────────────────────────────────

  turbopack: {
    root,
  },
  images: {
    unoptimized: true,       // obligatorio para export estático — no hay servidor que optimice
  },
};

export default nextConfig;

/**
 * Returns the basePath prefix for public/ assets.
 *
 * next/image automatically prepends basePath to its src when the component
 * renders server-side (SSR), but with `output: "export"` (static HTML),
 * the <img> src is written literally into the HTML file.  We therefore
 * must prepend NEXT_PUBLIC_BASE_PATH ourselves for every image that lives
 * in /public and is referenced from a component.
 *
 * Usage:
 *   import { withBase } from "@/lib/basePath";
 *   <Image src={withBase("/aiguablava/hero.png")} … />
 */
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export function withBase(path: string): string {
  // Avoid double-prefixing
  if (path.startsWith(BASE_PATH + "/")) return path;
  return `${BASE_PATH}${path}`;
}

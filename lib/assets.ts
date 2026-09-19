/**
 * Resolve a path to a file in /public.
 *
 * On GitHub Pages the site is served from /<repo>/, and `next/image` does not
 * prefix the base path itself when images are unoptimised — so local asset
 * paths have to be resolved explicitly or they 404 in production.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  return `${basePath}${path}`;
}

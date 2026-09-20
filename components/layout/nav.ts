/** The three sections of the passport, shared by the desktop and mobile navs. */
export const sections = [
  { href: "/brand/rabanne", label: "Brands", match: ["/brand", "/line", "/product", "/my-picks"] },
  { href: "/compare", label: "Comparisons", match: ["/compare"] },
  { href: "/sales", label: "Sales", match: ["/sales"] },
] as const;

export function isSectionActive(pathname: string, match: readonly string[]): boolean {
  return match.some((prefix) => pathname.startsWith(prefix));
}

"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";

/**
 * Everything below the header.
 *
 * The home page is a single full-height screen, so it carries no footer and no
 * spacer for the mobile tab bar — its height is exactly the viewport.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const isHome = usePathname() === "/";

  if (isHome) return <>{children}</>;

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col">
      <div className="flex-1">{children}</div>
      <Footer />
      {/* Clearance for the mobile tab bar. */}
      <div aria-hidden className="h-20 md:hidden" />
    </div>
  );
}

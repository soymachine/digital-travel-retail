"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isSectionActive, sections } from "@/components/layout/nav";

const icons: Record<string, React.ReactElement> = {
  Brands: (
    <>
      <path d="M10 3h4v3h-4zM9 6h6l1.5 3.5V21H7.5V9.5z" />
      <path d="M9.5 13h5" />
    </>
  ),
  Comparisons: (
    <>
      <path d="M12 4v16M5 8h14" />
      <path d="M5 8 2.5 14h5zM19 8l-2.5 6h5z" />
    </>
  ),
  Sales: (
    <>
      <path d="M4 20V10M10 20V5M16 20v-7M21 20H3" />
      <path d="m14 8 4-4 3 3" />
    </>
  ),
};

/** Mobile tab bar, mirroring the three sections of the desktop header. */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper-panel/95 backdrop-blur md:hidden"
    >
      <ul className="flex">
        {sections.map((section) => {
          const active = isSectionActive(pathname, section.match);
          return (
            <li key={section.href} className="flex-1">
              <Link
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex flex-col items-center gap-1 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3 text-[11px] transition-colors duration-200",
                  active ? "text-ink" : "text-taupe",
                ].join(" ")}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {icons[section.label]}
                </svg>
                <span className={active ? "font-semibold" : ""}>{section.label}</span>
                <span
                  aria-hidden
                  className={["h-0.5 w-8 rounded-full", active ? "bg-cocoa" : "bg-transparent"].join(" ")}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

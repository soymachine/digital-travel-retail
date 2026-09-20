"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { isSectionActive, sections } from "@/components/layout/nav";
import { assetPath } from "@/lib/assets";

/**
 * Desktop: wordmark on the left, the three sections on the right with the
 * active one underlined. Mobile: a passport-cover bar — back, title, search —
 * with the sections living in the bottom tab bar instead.
 */
/**
 * The mark that sits before the wordmark.
 *
 * PLACEHOLDER: drop the brand artwork at /public/brand/logo.svg and this picks
 * it up — nothing else references the file.
 */
function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Image
      src={assetPath("/brand/logo.svg")}
      alt=""
      width={32}
      height={32}
      priority
      className={className}
    />
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-chrome-bg text-chrome-ink">
      {/* Mobile */}
      <div className="flex h-14 items-center justify-between px-4 md:hidden">
        {isHome ? (
          <span className="w-9" aria-hidden />
        ) : (
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="-ml-2 flex h-9 w-9 items-center justify-center text-chrome-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium uppercase tracking-signage text-chrome-ink"
        >
          <Wordmark className="h-6 w-6" />
          {isHome ? "Travel Retail" : "Passport"}
        </Link>

        {/* Search lives inside a collection, so the icon goes to the field when
            there is one and to the brand list otherwise. */}
        <Link
          href={pathname.startsWith("/line/") ? "#search" : "/brands"}
          aria-label={pathname.startsWith("/line/") ? "Go to search" : "Browse brands to search"}
          className="-mr-2 flex h-9 w-9 items-center justify-center text-chrome-ink"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" strokeLinecap="round" />
          </svg>
        </Link>
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden h-14 max-w-6xl items-center justify-between px-6 md:flex">
        <Link
          href="/"
          className="flex items-center gap-3 text-base font-medium uppercase tracking-signage text-chrome-ink"
        >
          <Wordmark className="h-7 w-7" />
          Travel Retail
        </Link>

        <nav aria-label="Main" className="flex items-center gap-9">
          {sections.map((section) => {
            const active = isSectionActive(pathname, section.match);
            return (
              <Link
                key={section.href}
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "border-b-2 pb-1 text-[15px] transition-colors duration-200",
                  active
                    ? "border-chrome-ink font-semibold text-chrome-ink"
                    : "border-transparent text-chrome-ink/60 hover:text-chrome-ink",
                ].join(" ")}
              >
                {section.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { usePassport } from "@/components/personalisation/PassportStateProvider";

const links = [
  { href: "/line/million", label: "Catalogue" },
  { href: "/compare", label: "Compare" },
  { href: "/my-picks", label: "My Picks" },
];

export function Header() {
  const pathname = usePathname();
  const { favourites, compare, ready } = usePassport();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center border border-gold/60 font-display text-sm text-gold"
          >
            TR
          </span>
          <span className="signage text-ivory/80 transition-colors duration-200 group-hover:text-gold">
            Sales Passport
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "signage transition-colors duration-200",
                  active ? "text-gold" : "text-ivory/65 hover:text-ivory",
                ].join(" ")}
              >
                {link.label}
                {link.href === "/compare" && ready && compare.length > 0 && (
                  <span className="ml-2 text-teal">{compare.length}</span>
                )}
              </Link>
            );
          })}

          <Link
            href="/my-picks"
            aria-label={`Favourites: ${ready ? favourites.length : 0}`}
            className="flex items-center gap-2 text-ivory/65 transition-colors duration-200 hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden focusable="false">
              <path
                d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z"
                fill={ready && favourites.length > 0 ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            <span className="signage-sm">{ready ? favourites.length : 0}</span>
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="signage border border-ivory/25 px-3 py-2 text-ivory/75 md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="animate-fade-in border-t border-ink-line px-4 pb-4 pt-2 md:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="signage block border-b border-ink-line py-4 text-ivory/75 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

import Link from "next/link";
import { Fragment } from "react";

export type Crumb = {
  label: string;
  href?: string;
};

/** The passport itinerary: RABANNE / MILLION / MILLION GOLD. */
export function PassportNav({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-ink-line bg-ink-soft/60">
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 sm:px-6">
        {trail.map((crumb, index) => (
          <Fragment key={`${crumb.label}-${index}`}>
            {index > 0 && (
              <li aria-hidden className="signage-sm text-gold/60">
                /
              </li>
            )}
            <li>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="signage text-ivory/60 transition-colors duration-200 hover:text-gold"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="signage text-ivory">
                  {crumb.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

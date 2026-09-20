import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sales" };

/**
 * Placeholder section. Sales sits in the navigation so the shape of the full
 * platform is visible in the demo, but nothing here is built yet — the page
 * says so plainly rather than pretending.
 */
export default function SalesPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl animate-page-in px-4 py-6 sm:px-6 sm:py-10">
      <p className="eyebrow">Sales</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        Coming in the next phase
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-taupe-deep">
        This section is where the sales module will live. It is not part of the
        catalogue demo: the three fragrances, their stamps and the comparison are.
      </p>

      <div className="mt-10 rounded-xl border border-line bg-paper-panel p-7">
        <h2 className="eyebrow-muted">What it could hold</h2>
        <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-taupe-deep">
          {[
            "Sell-out and sell-in by airport, terminal and door.",
            "Which fragrances an advisor recommends most, and which convert.",
            "Launch targets and how a door is tracking against them.",
            "Content performance: what the sales force actually opens before a shift.",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="text-cocoa">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/brand/rabanne"
          className="rounded-full bg-bark px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ink"
        >
          Back to the catalogue
        </Link>
        <Link
          href="/my-picks"
          className="rounded-full border border-line px-7 py-3.5 text-sm text-taupe-deep transition-colors duration-200 hover:border-cocoa-soft hover:text-ink"
        >
          My stamps
        </Link>
      </div>
    </main>
  );
}

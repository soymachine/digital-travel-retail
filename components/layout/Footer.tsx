/** The machine-readable strip along the bottom edge of a passport page. */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <p
          aria-hidden
          className="overflow-hidden whitespace-nowrap font-mono text-xs tracking-wide2 text-taupe/70"
        >
          P&lt;TRAVEL&lt;RETAIL&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        </p>
        <p className="sr-only">Travel Retail Perfume Sales Passport — demonstration build.</p>
        <p className="mt-3 text-[11px] text-taupe">
          Demonstration build · product copy pending brand approval
        </p>
      </div>
    </footer>
  );
}

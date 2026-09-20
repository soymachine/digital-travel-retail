import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <p className="eyebrow">Gate closed</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Page not found</h1>
      <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-taupe-deep">
        This entry is not in the passport. The demo covers Rabanne and the Million collection.
      </p>
      <Link
        href="/line/million"
        className="mt-9 inline-block rounded-full bg-bark px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ink"
      >
        Back to the collection
      </Link>
    </main>
  );
}

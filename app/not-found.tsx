import Link from "next/link";

import { PassportFrame } from "@/components/passport/PassportFrame";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <PassportFrame page="00" code="RBN / MLN / 404">
        <p className="signage-sm text-ink/45">Gate closed</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink">Page not found</h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">
          This entry is not in the passport. The demo covers Rabanne and the Million collection.
        </p>
        <Link
          href="/line/million"
          className="signage mt-8 inline-block border border-ink/25 px-4 py-2 text-ink transition-colors duration-200 hover:border-gold-deep hover:text-gold-deep"
        >
          Back to the collection
        </Link>
      </PassportFrame>
    </main>
  );
}

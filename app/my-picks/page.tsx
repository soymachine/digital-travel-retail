import Link from "next/link";
import type { Metadata } from "next";

import { MyPicksView } from "@/components/personalisation/MyPicksView";
import { getProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "My stamps" };

export default function MyPicksPage() {
  const products = getProducts();

  return (
    <main id="main" className="mx-auto max-w-6xl animate-page-in px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href="/brands"
        className="inline-flex items-center gap-2 text-sm text-taupe-deep transition-colors duration-200 hover:text-ink"
      >
        <span aria-hidden>←</span>
        Brands
      </Link>

      <p className="eyebrow mt-6">My passport</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">My stamps</h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-taupe-deep">
        What this advisor recommends first, and what they have marked as worth remembering.
      </p>

      <div className="mt-10">
        <MyPicksView products={products} />
      </div>
    </main>
  );
}

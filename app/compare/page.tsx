import type { Metadata } from "next";

import { CompareView } from "@/components/catalogue/CompareView";
import { getLines, getProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Comparisons" };

export default function ComparePage() {
  return (
    <main id="main" className="mx-auto max-w-6xl animate-page-in px-4 py-6 sm:px-6 sm:py-10">
      <p className="eyebrow">Comparisons</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        Side by side
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-taupe-deep">
        For the moment in the conversation when the customer is deciding between two or three
        fragrances. One collection at a time — each brand sets its own intensity scale.
      </p>

      <div className="mt-10">
        <CompareView products={getProducts()} lines={getLines()} />
      </div>
    </main>
  );
}

import type { Metadata } from "next";

import { CompareView } from "@/components/catalogue/CompareView";
import { getBrand, getLine, getProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Comparisons" };

export default function ComparePage() {
  const products = getProducts();
  const brand = getBrand("rabanne")!;
  const line = getLine("million")!;

  return (
    <main id="main" className="mx-auto max-w-6xl animate-page-in px-4 py-6 sm:px-6 sm:py-10">
      <p className="eyebrow">Comparisons</p>
      <h1 className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <span className="text-4xl font-bold lowercase tracking-tight text-ink sm:text-5xl">
          {brand.name}
        </span>
        <span aria-hidden className="hidden h-9 w-px bg-line sm:block" />
        <span className="text-4xl font-bold tracking-tight text-cocoa sm:text-5xl">
          {line.name} collection
        </span>
      </h1>

      <div className="mt-10">
        <CompareView products={products} />
      </div>
    </main>
  );
}

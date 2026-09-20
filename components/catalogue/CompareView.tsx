"use client";

import Link from "next/link";
import { useState } from "react";

import { ComparisonColumns } from "@/components/catalogue/ComparisonColumns";
import { MAX_COMPARE, usePassport } from "@/components/personalisation/PassportStateProvider";
import type { CatalogueProduct, ProductLine } from "@/types/catalogue";

/**
 * A comparison covers one collection: each brand publishes its own lightness →
 * intensity axis, so lining up fragrances from different houses would compare
 * numbers that do not share a scale.
 */
export function CompareView({
  products,
  lines,
}: {
  products: CatalogueProduct[];
  lines: ProductLine[];
}) {
  const { compare, compareLine, clearCompare, toggleCompare, ready } = usePassport();
  const [chosenLine, setChosenLine] = useState<string | null>(null);

  const activeLine = chosenLine ?? compareLine ?? lines[0]?.id ?? null;
  const lineProducts = products.filter((product) => product.lineId === activeLine);
  const selected = lineProducts.filter((product) => compare.includes(product.id));

  if (!ready) {
    return <div className="h-72 animate-pulse rounded-xl bg-paper-deep" aria-hidden />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-5">
        <span className="mr-2 text-sm text-taupe">Collection</span>
        {lines.map((line) => {
          const active = line.id === activeLine;
          return (
            <button
              key={line.id}
              type="button"
              onClick={() => setChosenLine(line.id)}
              aria-pressed={active}
              className={[
                "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                active
                  ? "border-cocoa bg-cocoa/10 font-medium text-cocoa"
                  : "border-line text-taupe-deep hover:border-cocoa-soft hover:text-ink",
              ].join(" ")}
            >
              {line.name}
            </button>
          );
        })}
      </div>

      {/* The picker stays on the page whether or not anything is selected — it
          is the only place a fragrance enters the comparison. */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-taupe">
          {selected.length} of {MAX_COMPARE} selected
        </p>
        <div className="flex flex-wrap gap-2">
          {lineProducts.map((product) => {
            const active = compare.includes(product.id);
            const full = compare.length >= MAX_COMPARE && !active && compareLine === activeLine;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => toggleCompare(product.id, product.lineId)}
                aria-pressed={active}
                disabled={full}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40",
                  active
                    ? "border-cocoa bg-cocoa/10 font-medium text-cocoa"
                    : "border-line text-taupe-deep hover:border-cocoa-soft hover:text-ink",
                ].join(" ")}
              >
                {product.name}
              </button>
            );
          })}
          {selected.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="rounded-full border border-line px-4 py-2 text-sm text-taupe transition-colors duration-200 hover:border-cocoa-soft hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {selected.length > 0 ? (
        <div className="mt-10">
          <ComparisonColumns products={selected} />
        </div>
      ) : (
        <div className="mt-10 animate-fade-in rounded-xl border border-dashed border-line px-6 py-20 text-center">
          <p className="text-xl font-bold text-ink">Nothing selected yet</p>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-taupe-deep">
            Pick up to {MAX_COMPARE} fragrances above, or add them from a product page, and they
            will line up here side by side.
          </p>
          <Link
            href="/brands"
            className="mt-8 inline-block rounded-full bg-bark px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ink"
          >
            Browse the brands
          </Link>
        </div>
      )}
    </div>
  );
}

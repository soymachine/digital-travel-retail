"use client";

import Link from "next/link";

import { ComparisonTable } from "@/components/catalogue/ComparisonTable";
import { MAX_COMPARE, usePassport } from "@/components/personalisation/PassportStateProvider";
import type { CatalogueProduct } from "@/types/catalogue";

export function CompareView({ products }: { products: CatalogueProduct[] }) {
  const { compare, clearCompare, toggleCompare, ready } = usePassport();

  // Always read in collection order, regardless of the order they were picked.
  const selected = products.filter((product) => compare.includes(product.id));

  if (!ready) {
    return <div className="h-64 animate-pulse border border-ink/10 bg-ivory-deep/50" aria-hidden />;
  }

  if (selected.length === 0) {
    return (
      <div className="on-ivory animate-fade-in border border-dashed border-ink/25 px-6 py-16 text-center text-ink">
        <p className="signage text-ink/70">Nothing selected yet</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/55">
          Select up to {MAX_COMPARE} fragrances from the collection and they will line up here,
          side by side.
        </p>
        <Link
          href="/line/million"
          className="signage mt-6 inline-block border border-ink/25 px-4 py-2 text-ink transition-colors duration-200 hover:border-gold-deep hover:text-gold-deep"
        >
          Go to the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="on-ivory flex flex-wrap items-center justify-between gap-4 text-ink">
        <p className="signage-sm text-ink/45">
          {selected.length} of {MAX_COMPARE} selected
        </p>
        <div className="flex flex-wrap gap-2">
          {products.map((product) => {
            const active = compare.includes(product.id);
            const full = compare.length >= MAX_COMPARE && !active;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => toggleCompare(product.id)}
                aria-pressed={active}
                disabled={full}
                title={full ? `You can compare up to ${MAX_COMPARE} products` : undefined}
                className={[
                  "disabled:cursor-not-allowed disabled:opacity-40",
                  "signage border px-3 py-2 transition-colors duration-200",
                  active
                    ? "border-teal-deep bg-teal-deep/10 text-teal-deep"
                    : "border-ink/20 text-ink/55 hover:border-ink/40 hover:text-ink",
                ].join(" ")}
              >
                {product.name}
              </button>
            );
          })}
          <button
            type="button"
            onClick={clearCompare}
            className="signage border border-ink/20 px-3 py-2 text-ink/55 transition-colors duration-200 hover:border-gold-deep hover:text-gold-deep"
          >
            Clear
          </button>
        </div>
      </div>

      <ComparisonTable products={selected} />
    </div>
  );
}

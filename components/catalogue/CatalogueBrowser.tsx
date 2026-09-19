"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ProductFilters } from "@/components/catalogue/ProductFilters";
import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { ProductSearch } from "@/components/catalogue/ProductSearch";
import { ProductSort } from "@/components/catalogue/ProductSort";
import { usePassport } from "@/components/personalisation/PassportStateProvider";
import { track } from "@/lib/analytics";
import { emptyFilters, filterProducts, hasActiveFilters, sortProducts, type CatalogueFilters, type SortKey } from "@/lib/search";
import type { CatalogueProduct } from "@/types/catalogue";

export function CatalogueBrowser({
  products,
  families,
  concentrations,
}: {
  products: CatalogueProduct[];
  families: string[];
  concentrations: string[];
}) {
  const { stickers, compare, ready } = usePassport();
  const [filters, setFilters] = useState<CatalogueFilters>(emptyFilters);
  const [sort, setSort] = useState<SortKey>("default");
  const searchRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const filtered = filterProducts(products, filters, stickers);
    return sortProducts(filtered, sort);
  }, [filters, products, sort, stickers]);

  // Keyboard shortcut: "/" focuses search, Escape clears it.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "SELECT" || target?.isContentEditable;

      if (event.key === "/" && !typing) {
        event.preventDefault();
        searchRef.current?.querySelector("input")?.focus();
      }
      if (event.key === "Escape" && typing) {
        setFilters((current) => ({ ...current, query: "" }));
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (filters.query.trim()) track({ name: "search", query: filters.query, results: visible.length });
  }, [filters.query, visible.length]);

  const active = hasActiveFilters(filters);

  return (
    <div className="on-ivory space-y-8 text-ink">
      <div ref={searchRef} className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <ProductSearch
          value={filters.query}
          onChange={(query) => setFilters((current) => ({ ...current, query }))}
          resultCount={visible.length}
        />
        <ProductSort value={sort} onChange={setSort} />
      </div>

      <ProductFilters
        families={families}
        concentrations={concentrations}
        filters={filters}
        onChange={setFilters}
      />

      <div className="flex items-center justify-between gap-4 border-t border-ivory-line pt-4">
        <p className="signage-sm text-ink/45">
          {active ? "Filters active" : "No active filters"}
          <span className="ml-3 hidden text-ink/30 sm:inline">Press / to search</span>
        </p>
        {active && (
          <button
            type="button"
            onClick={() => setFilters(emptyFilters)}
            className="signage border border-ink/20 px-3 py-2 text-ink/60 transition-colors duration-200 hover:border-gold-deep hover:text-gold-deep"
          >
            Clear filters
          </button>
        )}
      </div>

      {!ready ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
          {products.map((product) => (
            <li key={product.id} className="h-[28rem] animate-pulse border border-ivory-line bg-ivory-deep/50" />
          ))}
        </ul>
      ) : visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <div className="animate-fade-in border border-dashed border-ink/25 px-6 py-16 text-center">
          <p className="signage text-ink/70">No products found</p>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/55">
            Try another fragrance family, product name or note.
          </p>
          <button
            type="button"
            onClick={() => setFilters(emptyFilters)}
            className="signage mt-6 border border-ink/25 px-4 py-2 text-ink transition-colors duration-200 hover:border-gold-deep hover:text-gold-deep"
          >
            Clear filters
          </button>
        </div>
      )}

      {ready && compare.length > 0 && (
        <div className="sticky bottom-4 z-20 flex animate-fade-in items-center justify-between gap-4 border border-teal-deep/40 bg-ink px-4 py-3 text-ivory">
          <p className="signage-sm text-ivory/70">
            {compare.length} selected for comparison
          </p>
          <Link
            href="/compare"
            className="signage border border-teal px-4 py-2 text-teal transition-colors duration-200 hover:bg-teal hover:text-ink"
          >
            Open comparison
          </Link>
        </div>
      )}
    </div>
  );
}

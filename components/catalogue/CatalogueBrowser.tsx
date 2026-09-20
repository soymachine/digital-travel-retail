"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ProductFilters } from "@/components/catalogue/ProductFilters";
import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { ProductSearch } from "@/components/catalogue/ProductSearch";
import { ProductSort } from "@/components/catalogue/ProductSort";
import { usePassport } from "@/components/personalisation/PassportStateProvider";
import { track } from "@/lib/analytics";
import {
  emptyFilters,
  filterProducts,
  hasActiveFilters,
  sortProducts,
  type CatalogueFilters,
  type SortKey,
} from "@/lib/search";
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
  const { stickers, compare, stickerCount, ready } = usePassport();
  const [filters, setFilters] = useState<CatalogueFilters>(emptyFilters);
  const [sort, setSort] = useState<SortKey>("default");
  const searchRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () => sortProducts(filterProducts(products, filters, stickers), sort),
    [filters, products, sort, stickers],
  );

  // Keyboard shortcut: "/" focuses search, Escape clears it.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "SELECT" || target?.isContentEditable;

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
    if (filters.query.trim()) {
      track({ name: "search", query: filters.query, results: visible.length });
    }
  }, [filters.query, visible.length]);

  const active = hasActiveFilters(filters);

  return (
    <div className="space-y-8">
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

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="text-sm text-taupe">
          {active ? "Filters active" : "No active filters"}
          <span className="ml-3 hidden text-taupe/70 sm:inline">Press / to search</span>
        </p>

        <div className="flex items-center gap-3">
          {ready && stickerCount > 0 && (
            <Link
              href="/my-picks"
              className="rounded-full border border-line px-4 py-2 text-sm text-taupe-deep transition-colors duration-200 hover:border-cocoa-soft hover:text-ink"
            >
              My stamps <span className="font-medium text-cocoa">{stickerCount}</span>
            </Link>
          )}
          {active && (
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="rounded-full border border-line px-4 py-2 text-sm text-taupe-deep transition-colors duration-200 hover:border-cocoa-soft hover:text-ink"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <div className="animate-fade-in rounded-xl border border-dashed border-line px-6 py-20 text-center">
          <p className="text-xl font-bold text-ink">No fragrances found</p>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-taupe-deep">
            Try another olfactive family, product name or note.
          </p>
          <button
            type="button"
            onClick={() => setFilters(emptyFilters)}
            className="mt-8 rounded-full bg-bark px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ink"
          >
            Clear filters
          </button>
        </div>
      )}

      {ready && compare.length > 0 && (
        <div className="sticky bottom-24 z-20 flex animate-fade-in items-center justify-between gap-4 rounded-full border border-line bg-paper-panel px-5 py-3 shadow-lg md:bottom-6">
          <p className="text-sm text-taupe-deep">{compare.length} selected for comparison</p>
          <Link
            href="/compare"
            className="rounded-full bg-bark px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ink"
          >
            Open comparison
          </Link>
        </div>
      )}
    </div>
  );
}

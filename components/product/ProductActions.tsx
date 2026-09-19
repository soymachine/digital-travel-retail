"use client";

import { CompareToggle } from "@/components/personalisation/CompareToggle";
import { FavouriteButton } from "@/components/personalisation/FavouriteButton";
import type { CatalogueProduct } from "@/types/catalogue";

export function ProductActions({ product }: { product: CatalogueProduct }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <FavouriteButton productId={product.id} productName={product.name} tone="ivory" />
      <CompareToggle productId={product.id} productName={product.name} tone="ivory" />
    </div>
  );
}

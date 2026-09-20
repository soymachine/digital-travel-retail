import type { CatalogueProduct } from "@/types/catalogue";

/**
 * Client-side catalogue search and filtering.
 *
 * Deliberately simple: the dataset is tiny and the demo must feel instant, so
 * everything runs synchronously against already-loaded objects.
 */

export type CatalogueFilters = {
  query: string;
  families: string[];
  concentrations: string[];
  /** Personal sticker ids — matched against the advisor's local stickers. */
  stickers: string[];
};

export type SortKey = "default" | "name-asc" | "name-desc" | "family";

export const emptyFilters: CatalogueFilters = {
  query: "",
  families: [],
  concentrations: [],
  stickers: [],
};

export function hasActiveFilters(filters: CatalogueFilters): boolean {
  return (
    filters.query.trim().length > 0 ||
    filters.families.length > 0 ||
    filters.concentrations.length > 0 ||
    filters.stickers.length > 0
  );
}

/** Everything a product can be found by. */
function searchCorpus(product: CatalogueProduct): string {
  return [
    product.name,
    product.subtitle ?? "",
    product.brand.name,
    product.line.name,
    product.concentration,
    product.descriptor,
    product.positioning ?? "",
    product.shortDescription ?? "",
    product.story ?? "",
    product.productCode,
    product.familyLabel,
    ...product.fragranceFamily,
    ...product.keyNotes,
    ...(product.perfumers ?? []),
    ...(product.sellingArguments ?? []),
    ...(product.recommendFor ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

export function filterProducts(
  items: CatalogueProduct[],
  filters: CatalogueFilters,
  stickersByProduct: Record<string, string[]> = {},
): CatalogueProduct[] {
  const terms = filters.query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return items.filter((product) => {
    if (terms.length > 0) {
      const corpus = searchCorpus(product);
      if (!terms.every((term) => corpus.includes(term))) return false;
    }

    if (filters.families.length > 0) {
      const matches = product.fragranceFamily.some((family) => filters.families.includes(family));
      if (!matches) return false;
    }

    if (filters.concentrations.length > 0 && !filters.concentrations.includes(product.concentration)) {
      return false;
    }

    if (filters.stickers.length > 0) {
      const applied = stickersByProduct[product.id] ?? [];
      const matches = filters.stickers.some((sticker) => applied.includes(sticker));
      if (!matches) return false;
    }

    return true;
  });
}

export function sortProducts(items: CatalogueProduct[], sort: SortKey): CatalogueProduct[] {
  const sorted = [...items];

  switch (sort) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "family":
      return sorted.sort((a, b) => a.fragranceFamily[0].localeCompare(b.fragranceFamily[0]));
    default:
      return sorted;
  }
}

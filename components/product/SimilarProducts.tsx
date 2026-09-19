import { ProductGrid } from "@/components/catalogue/ProductGrid";
import type { CatalogueProduct } from "@/types/catalogue";

export function SimilarProducts({ products }: { products: CatalogueProduct[] }) {
  if (products.length === 0) return null;
  return <ProductGrid products={products} />;
}

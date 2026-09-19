import { ProductCard } from "@/components/catalogue/ProductCard";
import type { CatalogueProduct } from "@/types/catalogue";

export function ProductGrid({ products }: { products: CatalogueProduct[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id} className="relative animate-page-in">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

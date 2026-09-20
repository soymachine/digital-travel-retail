import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { ProductHero } from "@/components/product/ProductHero";
import { RecommendFor } from "@/components/product/RecommendFor";
import { SellingArguments } from "@/components/product/SellingArguments";
import { getProduct, getProducts, getProductsByIds } from "@/lib/catalogue";

type Params = { params: Promise<{ productSlug: string }> };

/** The catalogue is fully known at build time: anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getProduct(productSlug);
  return {
    title: product ? product.name : "Product not found",
    description: product?.shortDescription,
  };
}

export default async function ProductPage({ params }: Params) {
  const { productSlug } = await params;
  const product = getProduct(productSlug);
  if (!product) notFound();

  const related = getProductsByIds(product.relatedProducts);

  return (
    <main id="main" className="mx-auto max-w-6xl animate-page-in px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/line/${product.line.slug}`}
        className="inline-flex items-center gap-2 text-sm text-taupe-deep transition-colors duration-200 hover:text-ink"
      >
        <span aria-hidden>←</span>
        {product.line.name} collection
      </Link>

      <header className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
        <h1 className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <span className="text-4xl font-bold lowercase tracking-tight text-ink sm:text-5xl">
            {product.brand.name}
          </span>
          <span aria-hidden className="hidden h-9 w-px bg-line sm:block" />
          <span className="text-4xl font-bold tracking-tight text-cocoa sm:text-5xl">
            {product.name}
          </span>
        </h1>
      </header>
      <p className="mt-2 text-lg text-taupe-deep">{product.concentration.toLowerCase()}</p>

      <div className="mt-10">
        <ProductHero product={product} />
      </div>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="eyebrow">The story</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-taupe-deep">{product.story}</p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="eyebrow">Selling arguments</h2>
        <div className="mt-6">
          <SellingArguments arguments={product.sellingArguments} />
        </div>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="eyebrow">Recommend it when</h2>
        <div className="mt-6 max-w-2xl">
          <RecommendFor items={product.recommendFor} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12 border-t border-line pt-10">
          <h2 className="eyebrow">You may also like</h2>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </main>
  );
}

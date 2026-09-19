import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PassportNav } from "@/components/layout/PassportNav";
import { PassportFrame } from "@/components/passport/PassportFrame";
import { SectionLabel } from "@/components/passport/SectionLabel";
import { FragranceFamily } from "@/components/product/FragranceFamily";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductNotes } from "@/components/product/ProductNotes";
import { ProductTags } from "@/components/product/ProductTags";
import { RecommendFor } from "@/components/product/RecommendFor";
import { SellingArguments } from "@/components/product/SellingArguments";
import { SimilarProducts } from "@/components/product/SimilarProducts";
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
    title: product ? `${product.name}` : "Product not found",
    description: product?.shortDescription,
  };
}

export default async function ProductPage({ params }: Params) {
  const { productSlug } = await params;
  const product = getProduct(productSlug);
  if (!product) notFound();

  const related = getProductsByIds(product.relatedProducts);

  return (
    <>
      <PassportNav
        trail={[
          { label: "Passport", href: "/" },
          { label: product.brand.name, href: `/brand/${product.brand.slug}` },
          { label: product.line.name, href: `/line/${product.line.slug}` },
          { label: product.name },
        ]}
      />

      <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* The frame animates, so it owns a stacking context: lift it above the
            related-products section or the sticker panel opens behind those cards. */}
        <PassportFrame page="04" code={product.productCode} className="relative z-10">
          <ProductHero product={product} />

          <div className="mt-14 space-y-14">
            <section>
              <SectionLabel index="01" tone="ivory">
                Fragrance family
              </SectionLabel>
              <div className="mt-6">
                <FragranceFamily families={product.fragranceFamily} />
              </div>
            </section>

            <section>
              <SectionLabel index="02" tone="ivory">
                Key notes
              </SectionLabel>
              <div className="mt-6">
                <ProductNotes notes={product.notes} />
              </div>
            </section>

            <section>
              <SectionLabel index="03" tone="ivory">
                The story
              </SectionLabel>
              <p className="mt-6 max-w-2xl font-display text-xl leading-relaxed text-ink/80">
                {product.story}
              </p>
            </section>

            <section>
              <SectionLabel index="04" tone="ivory">
                Selling arguments
              </SectionLabel>
              <div className="mt-6">
                <SellingArguments arguments={product.sellingArguments} />
              </div>
            </section>

            <section>
              <SectionLabel index="05" tone="ivory">
                Recommend it when
              </SectionLabel>
              <div className="mt-6 max-w-2xl">
                <RecommendFor items={product.recommendFor} />
              </div>
            </section>

            {/* Sits above the related-products section so the picker panel is never covered. */}
            <section className="relative z-30">
              <SectionLabel index="06" tone="ivory">
                My stickers
              </SectionLabel>
              <div className="mt-6">
                <ProductTags productId={product.id} productName={product.name} />
              </div>
            </section>
          </div>
        </PassportFrame>

        {related.length > 0 && (
          <section className="mt-12">
            <SectionLabel index="07" tone="ink">
              You may also like
            </SectionLabel>
            <div className="mt-6">
              <SimilarProducts products={related} />
            </div>
          </section>
        )}
      </main>
    </>
  );
}

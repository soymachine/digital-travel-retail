import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ProductLineCard } from "@/components/catalogue/ProductLineCard";
import { PassportNav } from "@/components/layout/PassportNav";
import { BoardingPassLabel } from "@/components/passport/BoardingPassLabel";
import { PassportFrame } from "@/components/passport/PassportFrame";
import { PassportStamp } from "@/components/passport/PassportStamp";
import { SectionLabel } from "@/components/passport/SectionLabel";
import { countProducts, getBrand, getBrands, getLines } from "@/lib/catalogue";

type Params = { params: Promise<{ brandSlug: string }> };

/** The catalogue is fully known at build time: anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getBrands().map((brand) => ({ brandSlug: brand.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { brandSlug } = await params;
  const brand = getBrand(brandSlug);
  return { title: brand ? brand.name : "Brand not found" };
}

export default async function BrandPage({ params }: Params) {
  const { brandSlug } = await params;
  const brand = getBrand(brandSlug);
  if (!brand) notFound();

  const lines = getLines(brand.id);

  return (
    <>
      <PassportNav trail={[{ label: "Passport", href: "/" }, { label: brand.name }]} />

      <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <PassportFrame page="02" code={`${brand.code} / IDENTITY`}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div>
              <p className="signage-sm text-ink/45">Brand</p>
              <h1 className="mt-3 font-display text-5xl leading-none tracking-wide2 text-ink sm:text-6xl">
                {brand.name}
              </h1>

              <div className="mt-8 space-y-1">
                {brand.tagline.map((line) => (
                  <p key={line} className="font-display text-2xl leading-snug text-ink/80">
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-10 border-t border-ivory-line pt-6">
                <BoardingPassLabel
                  tone="ivory"
                  fields={[
                    { label: "Brand", value: brand.name },
                    { label: "Origin", value: brand.origin },
                    { label: "Category", value: brand.category },
                    { label: "Collections", value: String(lines.length) },
                  ]}
                />
              </div>
            </div>

            <div className="flex items-start justify-center md:justify-end">
              <PassportStamp code={brand.code} caption="Paris" tone="gold" className="text-gold-deep" />
            </div>
          </div>
        </PassportFrame>

        <section className="mt-12">
          <SectionLabel index="02" tone="ink">
            Collections
          </SectionLabel>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {lines.map((line) => (
              <ProductLineCard
                key={line.id}
                line={line}
                brandName={brand.name}
                productCount={countProducts({ lineId: line.id })}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

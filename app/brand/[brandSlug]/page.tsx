import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
    <main id="main" className="mx-auto max-w-6xl animate-page-in px-4 py-6 sm:px-6 sm:py-10">
      <p className="eyebrow">Brands</p>
      <h1 className="mt-3 text-5xl font-bold lowercase tracking-tight text-ink sm:text-6xl">
        {brand.name}
      </h1>

      <div className="mt-6 max-w-lg space-y-1">
        {brand.tagline.map((line) => (
          <p key={line} className="text-xl text-taupe-deep">
            {line}
          </p>
        ))}
      </div>

      <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-y border-line py-6">
        {[
          ["Origin", brand.origin],
          ["Category", brand.category],
          ["Collections", String(lines.length)],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="eyebrow-muted">{label}</dt>
            <dd className="mt-1 text-[15px] text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-12">
        <h2 className="eyebrow">Collections</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {lines.map((line) => (
            <Link
              key={line.id}
              href={`/line/${line.slug}`}
              className="group rounded-xl border border-line bg-paper-panel p-7 transition-shadow duration-200 hover:shadow-[0_12px_40px_-24px_rgba(31,16,12,0.5)]"
            >
              <h3 className="flex flex-wrap items-baseline gap-x-4">
                <span className="text-3xl font-bold lowercase tracking-tight text-ink">
                  {brand.name}
                </span>
                <span aria-hidden className="hidden h-7 w-px bg-line sm:block" />
                <span className="text-3xl font-bold tracking-tight text-cocoa">
                  {line.name} collection
                </span>
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-taupe-deep">
                {line.description}
              </p>
              <p className="mt-6 text-sm font-medium text-cocoa">
                {countProducts({ lineId: line.id })} fragrances
                <span aria-hidden className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

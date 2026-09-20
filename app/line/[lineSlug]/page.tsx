import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CatalogueBrowser } from "@/components/catalogue/CatalogueBrowser";
import {
  getBrandById,
  getConcentrations,
  getFragranceFamilies,
  getLine,
  getLines,
  getProducts,
} from "@/lib/catalogue";

type Params = { params: Promise<{ lineSlug: string }> };

/** The catalogue is fully known at build time: anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getLines().map((line) => ({ lineSlug: line.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lineSlug } = await params;
  const line = getLine(lineSlug);
  return { title: line ? `${line.name} collection` : "Collection not found" };
}

export default async function LinePage({ params }: Params) {
  const { lineSlug } = await params;
  const line = getLine(lineSlug);
  if (!line) notFound();

  const brand = getBrandById(line.brandId);
  if (!brand) notFound();

  const products = getProducts({ lineId: line.id });

  return (
    <main id="main" className="mx-auto max-w-6xl animate-page-in px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/brand/${brand.slug}`}
        className="inline-flex items-center gap-2 text-sm text-taupe-deep transition-colors duration-200 hover:text-ink"
      >
        <span aria-hidden>←</span>
        {brand.name}
      </Link>

      <p className="eyebrow mt-6">Brands</p>
      <h1 className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <span className="text-4xl font-bold lowercase tracking-tight text-ink sm:text-5xl">
          {brand.name}
        </span>
        <span aria-hidden className="hidden h-9 w-px bg-line sm:block" />
        <span className="text-4xl font-bold tracking-tight text-cocoa sm:text-5xl">
          {line.name} collection
        </span>
      </h1>

      <div className="mt-10">
        <CatalogueBrowser
          products={products}
          families={getFragranceFamilies(line.id)}
          concentrations={getConcentrations(line.id)}
        />
      </div>
    </main>
  );
}

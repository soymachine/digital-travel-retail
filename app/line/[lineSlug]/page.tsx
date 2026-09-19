import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CatalogueBrowser } from "@/components/catalogue/CatalogueBrowser";
import { PassportNav } from "@/components/layout/PassportNav";
import { BoardingPassLabel } from "@/components/passport/BoardingPassLabel";
import { PassportFrame } from "@/components/passport/PassportFrame";
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
  return { title: line ? line.name : "Collection not found" };
}

export default async function LinePage({ params }: Params) {
  const { lineSlug } = await params;
  const line = getLine(lineSlug);
  if (!line) notFound();

  const resolvedBrand = getBrandById(line.brandId);
  if (!resolvedBrand) notFound();

  const products = getProducts({ lineId: line.id });

  return (
    <>
      <PassportNav
        trail={[
          { label: "Passport", href: "/" },
          { label: resolvedBrand.name, href: `/brand/${resolvedBrand.slug}` },
          { label: line.name },
        ]}
      />

      <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="border border-ink-line bg-ink-soft doc-pattern-dark px-5 py-10 sm:px-10">
          <p className="signage text-gold">Boarding · {resolvedBrand.name} → {line.name}</p>
          <h1 className="mt-6 font-display text-4xl leading-none tracking-wide2 text-ivory sm:text-6xl">
            {line.name}
          </h1>
          <p className="signage mt-4 text-ivory/55">{line.strapline}</p>

          <div className="mt-10 border-t border-ink-line pt-6">
            <BoardingPassLabel
              fields={[
                { label: "From", value: resolvedBrand.name },
                { label: "To", value: line.name },
                { label: "Products", value: String(products.length) },
                { label: "Code", value: `${resolvedBrand.code} / ${line.code}` },
              ]}
            />
          </div>
        </div>

        <PassportFrame page="03" code={`${resolvedBrand.code} / ${line.code} / CATALOGUE`} className="mt-8">
          <CatalogueBrowser
            products={products}
            families={getFragranceFamilies(line.id)}
            concentrations={getConcentrations(line.id)}
          />
        </PassportFrame>
      </main>
    </>
  );
}

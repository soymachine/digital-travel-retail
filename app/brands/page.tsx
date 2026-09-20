import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { countProducts, getBrands, getLines, getProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Brands" };

export default function BrandsPage() {
  const brands = getBrands();

  return (
    <main id="main" className="mx-auto max-w-6xl animate-page-in px-4 py-6 sm:px-6 sm:py-10">
      <p className="eyebrow">Brands</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        In the passport
      </h1>

      <ul className="mt-10 space-y-6">
        {brands.map((brand) => {
          const lines = getLines(brand.id);
          // One bottle per collection, as the brand's calling card.
          const covers = lines
            .map((line) => getProducts({ lineId: line.id })[0])
            .filter(Boolean)
            .slice(0, 3);

          return (
            <li key={brand.id}>
              <Link
                href={`/brand/${brand.slug}`}
                className="group flex flex-wrap items-center justify-between gap-6 rounded-xl border border-line bg-paper-panel p-6 transition-shadow duration-200 hover:shadow-[0_12px_40px_-24px_rgba(31,16,12,0.5)] sm:p-8"
              >
                <div>
                  <h2 className="text-3xl font-bold lowercase tracking-tight text-ink sm:text-4xl">
                    {brand.name}
                  </h2>
                  <p className="mt-3 text-[15px] text-taupe-deep">
                    {lines.map((line) => line.name).join(" · ")}
                  </p>
                  <p className="mt-1 text-sm text-taupe">
                    {countProducts({ brandId: brand.id })} fragrances
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </p>
                </div>

                <div className="flex items-end gap-5">
                  {covers.map((product) => (
                    <div key={product.id} className="relative h-28 w-20">
                      <Image
                        src={product.productImage}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain object-bottom"
                      />
                    </div>
                  ))}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

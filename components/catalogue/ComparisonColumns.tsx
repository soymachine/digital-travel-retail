"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { FamilyLine } from "@/components/product/FamilyLine";
import { NoteRow } from "@/components/notes/NoteIcon";
import { StampRail } from "@/components/personalisation/StampRail";
import { usePassport } from "@/components/personalisation/PassportStateProvider";
import { track } from "@/lib/analytics";
import type { CatalogueProduct } from "@/types/catalogue";

/** Side-by-side columns, one per selected fragrance, plus the intensity axis. */
export function ComparisonColumns({ products }: { products: CatalogueProduct[] }) {
  const { toggleCompare } = usePassport();

  useEffect(() => {
    if (products.length >= 2) {
      track({ name: "comparison_completed", productIds: products.map((product) => product.id) });
    }
  }, [products]);

  return (
    <div>
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-0">
        {products.map((product, index) => (
          <li
            key={product.id}
            className={[
              "flex flex-col items-center text-center lg:px-8",
              index > 0 ? "lg:border-l lg:border-line" : "",
            ].join(" ")}
          >
            <p className="text-sm lowercase text-taupe">{product.brand.name}</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-ink">
              <Link href={`/product/${product.slug}`} className="hover:text-cocoa">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-taupe-deep">
              {product.concentration.toLowerCase()}
              {product.year ? ` · ${product.year}` : ""}
            </p>

            <div className="relative my-7 h-56 w-full">
              <Image
                src={product.productImage}
                alt={`${product.name} bottle`}
                fill
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="object-contain"
              />
            </div>

            <FamilyLine label={product.familyLabel} className="text-xl" />

            <NoteRow notes={product.keyNotes} signatureNotes={product.signatureNotes} className="mt-5" />

            <p className="mt-5 text-lg font-bold lowercase text-ink">{product.descriptor}</p>

            <div className="mt-6 w-full border-t border-line pt-5">
              <StampRail productId={product.id} productName={product.name} align="center" />
            </div>

            <button
              type="button"
              onClick={() => toggleCompare(product.id)}
              className="mt-5 text-sm text-taupe transition-colors duration-200 hover:text-cocoa"
            >
              Remove from comparison
              <span className="sr-only"> — {product.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <IntensityAxis products={products} />
    </div>
  );
}

/**
 * Where each fragrance sits between fresh and intense.
 *
 * Each house publishes this axis for its own collection, so the scales are not
 * shared: a mixed comparison says so instead of drawing one.
 */
function IntensityAxis({ products }: { products: CatalogueProduct[] }) {
  const ordered = [...products].sort((a, b) => a.intensity - b.intensity);
  const singleCollection = new Set(products.map((product) => product.lineId)).size === 1;

  if (!singleCollection) {
    return (
      <section className="mt-14 border-t border-line pt-8">
        <h3 className="sr-only">Intensity</h3>
        <p className="text-sm leading-relaxed text-taupe">
          The fresh → intense axis is shown when every fragrance comes from the same collection:
          each house sets that scale for its own line, so positions from different houses cannot be
          read against each other.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-14 border-t border-line pt-8">
      <h3 className="sr-only">Intensity</h3>

      <div className="flex items-center justify-between text-sm text-taupe-deep">
        <span>+ fresh</span>
        <span>+ intense</span>
      </div>

      <div className="relative mt-4 h-px bg-taupe-deep/40">
        {ordered.map((product) => (
          <span
            key={product.id}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${product.intensity}%` }}
          >
            <span className="block h-3.5 w-3.5 rounded-full bg-cocoa" aria-hidden />
          </span>
        ))}
      </div>

      <ul className="relative mt-4 h-5">
        {ordered.map((product) => (
          <li
            key={product.id}
            className="absolute -translate-x-1/2 whitespace-nowrap text-sm font-medium text-ink"
            style={{ left: `${product.intensity}%` }}
          >
            {product.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { usePassport } from "@/components/personalisation/PassportStateProvider";
import { track } from "@/lib/analytics";
import type { CatalogueProduct } from "@/types/catalogue";

const rows: { label: string; value: (product: CatalogueProduct) => string }[] = [
  { label: "Type", value: (product) => product.concentration },
  { label: "Family", value: (product) => product.fragranceFamily.join(" / ") },
  { label: "Top notes", value: (product) => product.notes.top.join(", ") },
  { label: "Heart", value: (product) => product.notes.heart.join(", ") },
  { label: "Base", value: (product) => product.notes.base.join(", ") },
  { label: "Positioning", value: (product) => product.genderPositioning ?? "—" },
  { label: "Lead argument", value: (product) => product.sellingArguments[0] },
];

export function ComparisonTable({ products }: { products: CatalogueProduct[] }) {
  const { toggleCompare } = usePassport();

  useEffect(() => {
    if (products.length >= 2) {
      track({ name: "comparison_completed", productIds: products.map((product) => product.id) });
    }
  }, [products]);

  return (
    <div className="on-ivory overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">Comparison of the selected fragrances</caption>
        <thead>
          <tr>
            <th scope="col" className="w-36 border-b border-ink/15 py-4 align-bottom">
              <span className="signage-sm text-ink/45">Product</span>
            </th>
            {products.map((product) => (
              <th key={product.id} scope="col" className="border-b border-ink/15 px-4 py-4 align-bottom">
                <Image
                  src={product.productImage}
                  alt={`${product.name} bottle`}
                  width={80}
                  height={110}
                  unoptimized
                  className="h-24 w-auto"
                />
                <Link
                  href={`/product/${product.slug}`}
                  className="mt-3 block font-display text-xl leading-tight text-ink hover:text-gold-deep"
                >
                  {product.name}
                </Link>
                <button
                  type="button"
                  onClick={() => toggleCompare(product.id)}
                  className="signage-sm mt-2 text-ink/45 hover:text-gold-deep"
                >
                  Remove
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="align-top">
              <th scope="row" className="border-b border-ink/10 py-4 pr-4">
                <span className="signage-sm text-ink/45">{row.label}</span>
              </th>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="border-b border-ink/10 px-4 py-4 text-sm leading-relaxed text-ink/75"
                >
                  {row.value(product)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

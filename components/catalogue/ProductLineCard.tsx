import Link from "next/link";

import type { ProductLine } from "@/types/catalogue";

export function ProductLineCard({
  line,
  brandName,
  productCount,
}: {
  line: ProductLine;
  brandName: string;
  productCount: number;
}) {
  return (
    <Link
      href={`/line/${line.slug}`}
      className="group block border border-ink-line bg-ink p-6 transition-colors duration-200 hover:border-gold/60 sm:p-8"
    >
      <p className="signage-sm text-ivory/45">Collection</p>
      <h3 className="mt-2 font-display text-3xl tracking-wide2 text-ivory">{line.name}</h3>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/60">{line.description}</p>
      <p className="signage mt-6 text-gold transition-colors duration-200 group-hover:text-gold-soft">
        {brandName} · {productCount} products →
      </p>
    </Link>
  );
}

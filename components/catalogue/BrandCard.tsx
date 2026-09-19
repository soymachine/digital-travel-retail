import Link from "next/link";

import { PassportStamp } from "@/components/passport/PassportStamp";
import type { Brand } from "@/types/catalogue";

export function BrandCard({ brand, productCount }: { brand: Brand; productCount: number }) {
  return (
    <Link
      href={`/brand/${brand.slug}`}
      className="group flex items-center justify-between gap-6 border border-ink-line bg-ink-soft p-6 transition-colors duration-200 hover:border-gold/60 sm:p-8"
    >
      <div>
        <p className="signage-sm text-ivory/45">Brand</p>
        <h3 className="mt-2 font-display text-3xl tracking-wide2 text-ivory sm:text-4xl">
          {brand.name}
        </h3>
        <p className="signage mt-4 text-ivory/50">
          {brand.origin} · {productCount} products
        </p>
      </div>
      <PassportStamp
        code={brand.code}
        caption="Travel Retail"
        className="transition-transform duration-200 group-hover:rotate-0"
      />
    </Link>
  );
}

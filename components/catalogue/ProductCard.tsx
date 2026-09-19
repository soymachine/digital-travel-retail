"use client";

import Image from "next/image";
import Link from "next/link";

import { CompareToggle } from "@/components/personalisation/CompareToggle";
import { FavouriteButton } from "@/components/personalisation/FavouriteButton";
import { Sticker } from "@/components/personalisation/Sticker";
import { usePassport } from "@/components/personalisation/PassportStateProvider";
import type { CatalogueProduct } from "@/types/catalogue";

/** Compact catalogue card: bottle, identity, family, key notes and personal stamps. */
export function ProductCard({ product }: { product: CatalogueProduct }) {
  const { stickersFor, ready } = usePassport();
  const applied = ready ? stickersFor(product.id) : [];

  return (
    <article className="group flex h-full flex-col border border-ivory-line bg-ivory text-ink transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl on-ivory">
      <div className="relative flex items-center justify-center overflow-hidden bg-ivory-deep/60 doc-pattern px-6 py-8">
        <Image
          // Local SVG packshot placeholders — swap the file for the Puig asset.
          src={product.productImage}
          alt={`${product.brand.name} ${product.name} bottle`}
          width={200}
          height={260}
          unoptimized
          // The catalogue is three products: load every packshot up front so a
          // card is never blank as the advisor scrolls.
          loading="eager"
          className="h-44 w-auto transition-transform duration-200 group-hover:scale-[1.03]"
        />

        {product.isNew && (
          <span className="signage-sm absolute right-3 top-3 border border-gold-deep/60 px-2 py-1 text-gold-deep">
            New
          </span>
        )}

        <span className="signage-sm absolute bottom-3 left-3 text-ink/35">{product.productCode}</span>
      </div>

      <div className="flex flex-1 flex-col gap-4 border-t border-ivory-line p-5">
        <div>
          <p className="signage-sm text-ink/45">{product.brand.name}</p>
          <h3 className="mt-1 font-display text-2xl leading-tight">
            <Link
              href={`/product/${product.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {product.name}
            </Link>
          </h3>
          <p className="signage-sm mt-1 text-ink/55">{product.concentration}</p>
        </div>

        <div>
          <p className="signage text-gold-deep">{product.fragranceFamily.join(" • ")}</p>
          <p className="signage-sm mt-2 text-ink/50">{product.descriptor}</p>
        </div>

        <p className="text-sm leading-relaxed text-ink/70">{product.keyNotes.join(" · ")}</p>

        {applied.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {applied.map((stickerId) => (
              <Sticker key={stickerId} stickerId={stickerId} tone="ivory" size="sm" />
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-ivory-line pt-4">
          <Link
            href={`/product/${product.slug}`}
            className="signage relative z-10 whitespace-nowrap border border-ink/20 px-4 py-2 text-ink transition-colors duration-200 hover:border-gold-deep hover:text-gold-deep"
          >
            View product
          </Link>

          <div className="relative z-10 flex items-center gap-2">
            <CompareToggle productId={product.id} productName={product.name} tone="ivory" />
            <FavouriteButton productId={product.id} productName={product.name} tone="ivory" />
          </div>
        </div>
      </div>
    </article>
  );
}

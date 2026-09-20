"use client";

import Image from "next/image";
import Link from "next/link";

import { FamilyLine } from "@/components/product/FamilyLine";
import { NoteRow } from "@/components/notes/NoteIcon";
import { StampRail } from "@/components/personalisation/StampRail";
import type { CatalogueProduct } from "@/types/catalogue";

/** Catalogue card: bottle, identity, family, notes, descriptor and stamps. */
export function ProductCard({ product }: { product: CatalogueProduct }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-line bg-paper-panel p-5 transition-shadow duration-200 hover:shadow-[0_12px_40px_-24px_rgba(31,16,12,0.5)]">
      <div className="relative mx-auto h-48 w-full">
        <Image
          src={product.productImage}
          alt={`${product.brand.name} ${product.name} bottle`}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 28vw"
          loading="eager"
          className="object-contain transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-5 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-ink">
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-taupe-deep">
          {product.concentration.toLowerCase()}
          {product.year ? ` · ${product.year}` : ""}
        </p>
      </div>

      <FamilyLine label={product.familyLabel} className="mt-5 text-center" />

      <NoteRow notes={product.keyNotes} signatureNotes={product.signatureNotes} className="mt-4" />

      <p className="mt-4 text-center text-lg font-bold lowercase text-ink">{product.descriptor}</p>

      {/* Above the card-wide title link, or the overlay swallows the click. */}
      <div className="relative z-10 mt-auto border-t border-line pt-4">
        <StampRail productId={product.id} productName={product.name} align="center" />
      </div>
    </article>
  );
}

import type { Metadata } from "next";

import { CompareView } from "@/components/catalogue/CompareView";
import { PassportNav } from "@/components/layout/PassportNav";
import { PassportFrame } from "@/components/passport/PassportFrame";
import { getProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Compare" };

export default function ComparePage() {
  const products = getProducts();

  return (
    <>
      <PassportNav trail={[{ label: "Passport", href: "/" }, { label: "Compare" }]} />

      <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <PassportFrame page="05" code="RBN / MLN / COMPARE">
          <p className="signage-sm text-ink/45">Side by side</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Compare products
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/65">
            For the moment in the conversation when the customer is deciding between two or three
            fragrances.
          </p>

          <div className="mt-10">
            <CompareView products={products} />
          </div>
        </PassportFrame>
      </main>
    </>
  );
}

import type { Metadata } from "next";

import { PassportNav } from "@/components/layout/PassportNav";
import { MyPicksView } from "@/components/personalisation/MyPicksView";
import { PassportFrame } from "@/components/passport/PassportFrame";
import { getProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "My Picks" };

export default function MyPicksPage() {
  const products = getProducts();

  return (
    <>
      <PassportNav trail={[{ label: "Passport", href: "/" }, { label: "My Picks" }]} />

      <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <PassportFrame page="06" code="RBN / MLN / PICKS">
          <p className="signage-sm text-ink/45">Personal page</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">My Picks</h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/65">
            The advisor&apos;s own stamps: what they recommend first, and what they have marked as
            worth remembering.
          </p>

          <div className="mt-10">
            <MyPicksView products={products} />
          </div>
        </PassportFrame>
      </main>
    </>
  );
}

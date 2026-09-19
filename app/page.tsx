import Link from "next/link";

import { BoardingPassLabel } from "@/components/passport/BoardingPassLabel";
import { PassportFrame } from "@/components/passport/PassportFrame";
import { PassportStamp } from "@/components/passport/PassportStamp";
import { countProducts, getBrand, getLine } from "@/lib/catalogue";

export default function HomePage() {
  const brand = getBrand("rabanne")!;
  const line = getLine("million")!;
  const productCount = countProducts({ lineId: line.id });

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="relative overflow-hidden border border-ink-line bg-ink-soft doc-pattern-dark px-5 py-14 sm:px-10 sm:py-20">
        <PassportStamp
          code="TR"
          caption="Travel Retail"
          className="absolute right-6 top-6 hidden sm:flex"
        />

        <p className="signage text-gold">Travel Retail Perfume Sales Passport</p>

        <h1 className="mt-8 max-w-3xl font-display text-4xl leading-tight text-ivory sm:text-6xl">
          Welcome, sales advisor.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/65">
          Your product knowledge, always ready for take-off.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/brand/${brand.slug}`}
            className="signage border border-gold bg-gold px-6 py-4 text-ink transition-colors duration-200 hover:bg-gold-soft"
          >
            Explore {brand.name}
          </Link>
          <Link
            href={`/line/${line.slug}`}
            className="signage border border-ivory/25 px-6 py-4 text-ivory/80 transition-colors duration-200 hover:border-gold hover:text-gold"
          >
            View collection
          </Link>
        </div>

        <div className="mt-14 border-t border-ink-line pt-8">
          <BoardingPassLabel
            fields={[
              { label: "Brand", value: brand.name },
              { label: "Collection", value: line.name },
              { label: "Products", value: `${productCount} available` },
              { label: "Sector", value: "Airport / Travel Retail" },
            ]}
          />
        </div>
      </section>

      <PassportFrame page="01" code={`${brand.code} / ${line.code} / INDEX`} className="mt-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="signage-sm text-ink/45">What this is</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink">
              A digital sales passport, not a catalogue website.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/70">
              Built for an advisor standing in an airport beauty environment who needs the
              fragrance family, the key notes and three convincing arguments in seconds — then
              wants to mark what works for them personally.
            </p>
          </div>

          <ul className="space-y-4 border-l border-ink/10 pl-6">
            {[
              ["01", "Brand", "Rabanne identity page"],
              ["02", "Collection", "Million, searchable and filterable"],
              ["03", "Fragrance", "Family, notes and selling story"],
              ["04", "Personal stamps", "Stickers and favourites, kept locally"],
              ["05", "Comparison", "Up to three fragrances side by side"],
            ].map(([index, label, detail]) => (
              <li key={index} className="flex gap-4">
                <span className="signage-sm text-gold-deep">{index}</span>
                <span>
                  <span className="signage text-ink">{label}</span>
                  <span className="mt-1 block text-sm text-ink/60">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PassportFrame>
    </main>
  );
}

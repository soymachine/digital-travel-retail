import Image from "next/image";
import Link from "next/link";

import { assetPath } from "@/lib/assets";
import { getBrand } from "@/lib/catalogue";

export default function HomePage() {
  const brand = getBrand("rabanne")!;

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 sm:pt-6">
      <section className="relative overflow-hidden rounded-2xl">
        <Image
          // Placeholder cover photograph — replace with the approved shot.
          src={assetPath("/home/passport-hero.jpg")}
          alt="A Perfume Sales Passport resting on a counter in an airport lounge, beside a boarding pass"
          width={1392}
          height={740}
          priority
          className="h-[60vh] min-h-[380px] w-full object-cover sm:h-[68vh]"
        />

      </section>

      {/* The button straddles the bottom edge of the photograph, so it never
          covers the passport itself whatever the crop. */}
      <div className="relative z-10 -mt-7 flex justify-center">
        <Link
          href={`/brand/${brand.slug}`}
          className="inline-flex items-center gap-3 rounded-full bg-bark px-8 py-4 text-[15px] font-medium text-paper shadow-lg transition-colors duration-200 hover:bg-ink"
        >
          Open passport
          <span aria-hidden>→</span>
        </Link>
      </div>

      <h1 className="sr-only">Travel Retail Perfume Sales Passport</h1>
    </main>
  );
}

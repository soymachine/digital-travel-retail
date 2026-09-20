import Image from "next/image";
import Link from "next/link";

import { assetPath } from "@/lib/assets";

/**
 * The home page is the only screen that breaks the site's max width: the cover
 * photograph runs the full width of the viewport.
 */
export default function HomePage() {
  return (
    <main id="main" className="pb-10">
      <section className="relative w-full">
        <Image
          // Placeholder cover photograph — replace with the approved shot.
          src={assetPath("/home/passport-hero.jpg")}
          alt="A Perfume Sales Passport resting on a counter in an airport lounge, beside a boarding pass"
          width={1586}
          height={992}
          priority
          sizes="100vw"
          // Narrow screens crop to a portrait-friendly band so the passport stays
          // large; from the small breakpoint up the photograph is shown whole,
          // capped so it never runs past the fold on very wide displays.
          className="h-[58vh] min-h-[340px] w-full object-cover object-center sm:h-auto sm:max-h-[calc(100vh-4.5rem)]"
        />
      </section>

      {/* The button straddles the bottom edge of the photograph, so it never
          covers the passport itself whatever the crop. */}
      <div className="relative z-10 -mt-7 flex justify-center">
        <Link
          href="/brands"
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

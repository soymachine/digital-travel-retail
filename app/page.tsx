import Image from "next/image";
import Link from "next/link";

import { assetPath } from "@/lib/assets";

/**
 * A single screen: the cover photograph fills the viewport below the header,
 * with no footer and nothing to scroll to.
 */
export default function HomePage() {
  return (
    <main
      id="main"
      className="relative h-[calc(100dvh-var(--header-height))] w-full overflow-hidden"
    >
      <Image
        // Placeholder cover photograph — replace with the approved shot.
        src={assetPath("/home/passport-hero.jpg")}
        alt="A Perfume Sales Passport resting on a counter in an airport lounge, beside a boarding pass"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Anchored to the bottom of the screen, clear of the mobile tab bar. */}
      <div className="absolute inset-x-0 bottom-24 z-10 flex justify-center md:bottom-10">
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

import type React from "react";

/**
 * Placeholder line icons for fragrance notes.
 *
 * Each glyph is matched to a note by keyword, with a neutral drop as fallback,
 * so a note the brand adds later still renders something sensible. Swapping in
 * commissioned artwork means replacing the glyphs in this one file.
 */

type Glyph =
  | "flower"
  | "wood"
  | "citrus"
  | "spice"
  | "resin"
  | "vanilla"
  | "coconut"
  | "musk"
  | "herb"
  | "grass"
  | "earth"
  | "fruit"
  | "leather"
  | "cocoa"
  | "drop";

// Order matters: the first pattern that matches wins.
const keywords: [RegExp, Glyph][] = [
  [/leather/i, "leather"],
  [/truffle|patchouli|earth|moss/i, "earth"],
  [/cocoa|chocolate|coffee/i, "cocoa"],
  [/vetiver|grass|hay/i, "grass"],
  [/sage|lavandin|lavender|mint|basil|thyme|rosemary/i, "herb"],
  [/plum|fig|apple|pear|berry|peach|cherry/i, "fruit"],
  [/rose|jasmin|ylang|flower|floral|geranium|iris|narcissus|orange blossom/i, "flower"],
  [/wood|cedar|sandal|oud|oak|cypriol|akigala/i, "wood"],
  [/lemon|mandarin|pomelo|bergamot|citrus|orange|grapefruit/i, "citrus"],
  [/cinnamon|cardamom|ginger|pepper|spice|clove|saffron/i, "spice"],
  [/amber|myrrh|incense|olibanum|resin|labdanum|frankincense/i, "resin"],
  [/vanilla|tonka|caramel|praline/i, "vanilla"],
  [/coconut|almond|milk/i, "coconut"],
  [/musk|cashmeran|skin/i, "musk"],
];

export function glyphForNote(note: string): Glyph {
  return keywords.find(([pattern]) => pattern.test(note))?.[1] ?? "drop";
}

const paths: Record<Glyph, React.ReactElement> = {
  flower: (
    <>
      <circle cx="24" cy="24" r="5" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={angle} cx="24" cy="12.5" rx="5" ry="7.5" transform={`rotate(${angle} 24 24)`} />
      ))}
    </>
  ),
  wood: (
    <>
      <path d="M24 6 14 20h20L24 6Z" />
      <path d="M24 17 12 33h24L24 17Z" />
      <path d="M24 41v-6" />
    </>
  ),
  citrus: (
    <>
      <circle cx="24" cy="26" r="15" />
      <path d="M24 11v30M9 26h30M13.4 15.4 34.6 36.6M34.6 15.4 13.4 36.6" />
    </>
  ),
  spice: (
    <>
      <path d="M15 40c6-10 9-22 8-33" />
      <path d="M21 40c6-10 9-22 8-33" />
      <path d="M27 40c6-10 9-22 8-33" />
    </>
  ),
  resin: (
    <>
      <path d="M24 6 40 18l-6 22H14L8 18 24 6Z" />
      <path d="M8 18h32M24 6v34" />
    </>
  ),
  vanilla: (
    <>
      {/* Two slender pods, tied. */}
      <path d="M18 8c-3 10-3 22 0 32 3-10 3-22 0-32Z" />
      <path d="M30 10c-3 9-3 20 0 29 3-9 3-20 0-29Z" />
      <path d="M13 28h22" />
    </>
  ),
  coconut: (
    <>
      {/* Half coconut: husk outside, flesh rim inside. */}
      <path d="M8 22a16 16 0 0 1 32 0 16 16 0 0 1-32 0Z" />
      <path d="M13 22a11 11 0 0 1 22 0 11 11 0 0 1-22 0Z" />
      <path d="M24 11v4M16 14l2.5 3M32 14l-2.5 3" />
    </>
  ),
  musk: (
    <>
      <path d="M10 29c0-7 6-12 12-11 2-6 10-7 13-2 6 0 9 6 6 11" />
      <path d="M12 35h24M16 41h16" />
    </>
  ),
  herb: (
    <>
      {/* Sprig of leaves. */}
      <path d="M24 42V12" />
      <path d="M24 20c-6-1-9-5-9-9 5 0 9 3 9 9ZM24 20c6-1 9-5 9-9-5 0-9 3-9 9Z" />
      <path d="M24 32c-6-1-9-5-9-9 5 0 9 3 9 9ZM24 32c6-1 9-5 9-9-5 0-9 3-9 9Z" />
    </>
  ),
  grass: (
    <>
      {/* Blades of vetiver rising from a root line. */}
      <path d="M12 40c1-12 5-20 10-26M20 40c0-13 2-21 5-27M28 40c1-12 4-19 8-24" />
      <path d="M10 41h28" />
    </>
  ),
  earth: (
    <>
      {/* Truffle: an irregular nugget. */}
      <path d="M13 30c-3-6 1-13 8-15 7-2 14 2 15 9 1 6-3 12-10 13-6 1-11-2-13-7Z" />
      <path d="M20 24c1.5-1 3 .5 2 2M27 28c1.5-1 3 .5 2 2" />
    </>
  ),
  fruit: (
    <>
      <path d="M24 14c6-4 15 0 15 10s-8 16-15 16-15-6-15-16 9-14 15-10Z" />
      <path d="M24 14V8M24 8c3-2 6-2 8 0-2 3-5 3-8 0Z" />
    </>
  ),
  leather: (
    <>
      {/* A hide with stitching. */}
      <path d="M10 16c6-4 22-4 28 0l-2 20c-6 4-18 4-24 0L10 16Z" />
      <path d="M15 22h18M15 28h18" strokeDasharray="3 3" />
    </>
  ),
  cocoa: (
    <>
      {/* Cocoa pod with its seam. */}
      <path d="M24 8c8 4 12 12 12 20s-4 12-12 12-12-4-12-12S16 12 24 8Z" />
      <path d="M24 10v30M18 18c2 8 2 14 0 20M30 18c-2 8-2 14 0 20" />
    </>
  ),
  drop: (
    <>
      <path d="M24 7c7 10 12 16 12 22a12 12 0 0 1-24 0c0-6 5-12 12-22Z" />
    </>
  ),
};

/** A single note: icon above, note name below. */
export function NoteIcon({
  note,
  signature = false,
  className = "",
}: {
  note: string;
  /** A note the brand singles out on its sheet. */
  signature?: boolean;
  className?: string;
}) {
  return (
    <li className={["flex w-20 flex-col items-center gap-2 text-center", className].join(" ")}>
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        focusable="false"
      >
        {paths[glyphForNote(note)]}
      </svg>
      <span
        className={[
          "text-xs leading-tight",
          signature ? "font-semibold text-ink underline decoration-cocoa/50 underline-offset-4" : "text-taupe-deep",
        ].join(" ")}
      >
        {note.toLowerCase()}
      </span>
    </li>
  );
}

/** The row of notes shown on cards, the product page and the comparison. */
export function NoteRow({
  notes,
  signatureNotes = [],
  className = "",
}: {
  notes: string[];
  signatureNotes?: string[];
  className?: string;
}) {
  return (
    <ul className={["flex flex-wrap items-start justify-center gap-4", className].join(" ")}>
      {notes.map((note) => (
        <NoteIcon key={note} note={note} signature={signatureNotes.includes(note)} />
      ))}
    </ul>
  );
}

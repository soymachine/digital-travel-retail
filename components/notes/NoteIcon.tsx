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
  | "drop";

const keywords: [RegExp, Glyph][] = [
  [/rose|jasmin|ylang|flower|floral|geranium|lavender/i, "flower"],
  [/wood|cedar|sandal|vetiver|cypriol|akigala/i, "wood"],
  [/lemon|mandarin|pomelo|bergamot|citrus|orange|grapefruit/i, "citrus"],
  [/cinnamon|cardamom|ginger|pepper|spice|clove/i, "spice"],
  [/amber|myrrh|incense|resin|labdanum/i, "resin"],
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
  drop: (
    <>
      <path d="M24 7c7 10 12 16 12 22a12 12 0 0 1-24 0c0-6 5-12 12-22Z" />
    </>
  ),
};

/** A single note: icon above, note name below. */
export function NoteIcon({ note, className = "" }: { note: string; className?: string }) {
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
      <span className="text-xs leading-tight text-taupe-deep">{note.toLowerCase()}</span>
    </li>
  );
}

/** The row of notes shown on cards, the product page and the comparison. */
export function NoteRow({ notes, className = "" }: { notes: string[]; className?: string }) {
  return (
    <ul className={["flex flex-wrap items-start justify-center gap-4", className].join(" ")}>
      {notes.map((note) => (
        <NoteIcon key={note} note={note} />
      ))}
    </ul>
  );
}

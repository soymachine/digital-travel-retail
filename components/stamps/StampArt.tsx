/**
 * Placeholder stamp artwork.
 *
 * These are drawn in SVG so the demo has no missing-image gaps. When the real
 * stamp artwork arrives, each one becomes an <Image> here and nothing else in
 * the app has to change — everything goes through <Stamp>.
 */

type StampArtProps = {
  label: string;
  /** Rubber-stamp ink colour. */
  tone: "red" | "brown";
  className?: string;
};

const tones = {
  red: "text-stamp",
  brown: "text-cocoa",
} as const;

/** Rectangular stamp with a double rule, used for NEW. */
export function RectStamp({ label, tone = "red", className = "" }: StampArtProps) {
  const text = label.toUpperCase();
  // 124px of usable width inside the inner rule, at ~0.62em per character.
  const fontSize = Math.min(30, 124 / (text.length * 0.62));

  return (
    <span
      className={["inline-flex -rotate-[4deg] select-none", tones[tone], className].join(" ")}
      aria-hidden
    >
      <svg viewBox="0 0 150 68" className="h-full w-auto" focusable="false">
        <rect
          x="3"
          y="3"
          width="144"
          height="62"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <rect
          x="10"
          y="10"
          width="130"
          height="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.75"
        />
        <text
          x="75"
          y={34 + fontSize * 0.36}
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
          fontSize={fontSize}
          fontWeight="700"
        >
          {text}
        </text>
      </svg>
    </span>
  );
}

/** Circular stamp with a small plane, used for TOP SELLER and the rest. */
export function CircleStamp({ label, tone = "brown", className = "" }: StampArtProps) {
  const words = label.toUpperCase().split(" ");
  const lines = words.length > 2 ? [words.slice(0, -1).join(" "), words.at(-1)!] : words;
  // 78px of usable width across the inner circle.
  const sizeFor = (line: string) => Math.min(19, 78 / (line.length * 0.62));

  return (
    <span
      className={["inline-flex -rotate-[4deg] select-none", tones[tone], className].join(" ")}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="h-full w-auto" focusable="false">
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.7"
        />
        {lines.map((line, index) => (
          <text
            key={line}
            x="60"
            y={lines.length === 1 ? 62 : 52 + index * 21}
            textAnchor="middle"
            fill="currentColor"
            fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
            fontSize={sizeFor(line)}
            fontWeight="700"
          >
            {line}
          </text>
        ))}
        {/* Travel-retail mark: a little departing plane. */}
        <path
          d="M60 86 l-11 5 2-5 -2-5 11 5 z M60 86 l12-6 2 6 -2 6 z"
          fill="currentColor"
          transform="translate(-6 0)"
        />
      </svg>
    </span>
  );
}

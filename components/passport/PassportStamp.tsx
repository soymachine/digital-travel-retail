/**
 * Decorative immigration-style stamp, e.g.
 *
 *   TR
 *   TRAVEL RETAIL
 */
export function PassportStamp({
  code,
  caption,
  tone = "gold",
  className = "",
}: {
  code: string;
  caption: string;
  tone?: "gold" | "teal" | "ivory";
  className?: string;
}) {
  const palette = {
    gold: "border-gold/50 text-gold/80",
    teal: "border-teal/45 text-teal/80",
    ivory: "border-ivory/35 text-ivory/60",
  }[tone];

  return (
    <span
      aria-hidden
      className={[
        "inline-flex h-24 w-24 shrink-0 -rotate-6 flex-col items-center justify-center rounded-full border-2 border-dashed text-center",
        palette,
        className,
      ].join(" ")}
    >
      <span className="font-display text-xl leading-none tracking-wide2">{code}</span>
      <span className="signage-sm mt-1.5 px-2 leading-tight">{caption}</span>
    </span>
  );
}

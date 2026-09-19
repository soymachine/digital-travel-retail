/** Airport signage section heading: "03  FRAGRANCE". */
export function SectionLabel({
  index,
  children,
  tone = "ink",
  className = "",
}: {
  index: string;
  children: string;
  tone?: "ink" | "ivory";
  className?: string;
}) {
  const isInk = tone === "ink";

  return (
    <h2
      className={[
        "flex items-center gap-3 signage",
        isInk ? "text-ivory/70" : "text-ink/60",
        className,
      ].join(" ")}
    >
      <span className={isInk ? "text-gold" : "text-gold-deep"}>{index}</span>
      <span>{children}</span>
      <span
        aria-hidden
        className={["h-px flex-1", isInk ? "bg-ivory/15" : "bg-ink/15"].join(" ")}
      />
    </h2>
  );
}

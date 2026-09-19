import { stickerById } from "@/data/stickers";

type StickerProps = {
  stickerId: string;
  tone?: "ink" | "ivory";
  size?: "sm" | "md";
  /** Plays the stamp animation — used when a sticker has just been applied. */
  animate?: boolean;
};

/**
 * A personal sticker rendered as a passport stamp rather than a web tag.
 * The label is always spelled out, so the meaning never depends on colour.
 */
export function Sticker({ stickerId, tone = "ink", size = "md", animate = false }: StickerProps) {
  const sticker = stickerById.get(stickerId);
  if (!sticker) return null;

  return (
    <span
      className={[
        "inline-flex -rotate-3 items-center gap-2 border-2 border-dashed font-mono uppercase tracking-wide2",
        size === "sm" ? "px-2 py-1 text-[9px]" : "px-3 py-1.5 text-[10px]",
        tone === "ink"
          ? "border-gold/60 bg-gold/10 text-gold-soft"
          : "border-gold-deep/60 bg-gold/10 text-gold-deep",
        animate ? "animate-stamp" : "",
      ].join(" ")}
    >
      <span aria-hidden className="opacity-60">
        {sticker.short}
      </span>
      {sticker.label}
    </span>
  );
}

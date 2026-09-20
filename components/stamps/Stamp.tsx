import { CircleStamp, RectStamp } from "@/components/stamps/StampArt";
import { stickerById } from "@/data/stickers";

const sizes = {
  sm: "h-10",
  md: "h-14",
  lg: "h-20",
} as const;

/**
 * A personal stamp as it appears on a product: rubber-stamp artwork with the
 * label spelled out for assistive technology, never colour alone.
 */
export function Stamp({
  stickerId,
  size = "md",
  animate = false,
  className = "",
}: {
  stickerId: string;
  size?: keyof typeof sizes;
  animate?: boolean;
  className?: string;
}) {
  const sticker = stickerById.get(stickerId);
  if (!sticker) return null;

  const Art = sticker.shape === "rect" ? RectStamp : CircleStamp;

  return (
    <span
      role="img"
      aria-label={`${sticker.label} stamp`}
      className={[sizes[size], animate ? "animate-stamp" : "", className].join(" ")}
    >
      <Art label={sticker.label} tone={sticker.tone} className="h-full" />
    </span>
  );
}

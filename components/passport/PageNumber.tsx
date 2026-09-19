export function PageNumber({ page, tone = "ivory" }: { page: string; tone?: "ivory" | "ink" }) {
  return (
    <span className={["signage-sm", tone === "ivory" ? "text-ink/50" : "text-ivory/50"].join(" ")}>
      Page {page}
    </span>
  );
}

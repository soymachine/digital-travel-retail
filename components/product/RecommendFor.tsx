export function RecommendFor({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/75">
          <span aria-hidden className="mt-1 text-gold-deep">
            →
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

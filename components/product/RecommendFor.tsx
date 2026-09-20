export function RecommendFor({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-taupe-deep">
          <span aria-hidden className="text-cocoa">
            →
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function SellingArguments({ arguments: items }: { arguments: string[] }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-3">
      {items.map((argument, index) => (
        <li key={argument}>
          <p className="text-sm font-semibold text-cocoa">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-taupe-deep">{argument}</p>
        </li>
      ))}
    </ol>
  );
}

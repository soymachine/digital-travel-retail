export function SellingArguments({ arguments: items }: { arguments: string[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-3">
      {items.map((argument, index) => (
        <li key={argument} className="border-t border-ink/15 pt-4">
          <p className="signage-sm text-gold-deep">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/75">{argument}</p>
        </li>
      ))}
    </ol>
  );
}

export function FragranceFamily({ families }: { families: string[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {families.map((family) => (
        <li
          key={family}
          className="signage border border-ink/20 px-4 py-2 text-ink/70"
        >
          {family}
        </li>
      ))}
    </ul>
  );
}

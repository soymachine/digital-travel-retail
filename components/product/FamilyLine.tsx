/**
 * The olfactive family as the brand writes it: leading words quiet and
 * lowercase, the family itself loud and uppercase — "woody AROMATIC".
 */
export function FamilyLine({
  families,
  className = "",
}: {
  families: string[];
  className?: string;
}) {
  const lead = families.slice(0, -1);
  const main = families.at(-1) ?? "";

  return (
    <p className={["family-line", className].join(" ")}>
      {lead.map((family) => (
        <span key={family}>{family.toLowerCase()} </span>
      ))}
      <strong>{main}</strong>
    </p>
  );
}

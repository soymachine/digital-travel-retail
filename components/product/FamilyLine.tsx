/**
 * The olfactive family exactly as the brand writes it, e.g. "AMBERY Aromatic"
 * or "woody FLORAL". Brands emphasise different halves, and they do it through
 * capitalisation — so the case in the data drives the styling rather than a
 * rule about word order.
 */
export function FamilyLine({ label, className = "" }: { label: string; className?: string }) {
  const words = label.split(" ").filter(Boolean);

  return (
    <p className={["family-line", className].join(" ")}>
      {words.map((word, index) => {
        const emphasised = word === word.toUpperCase();
        return (
          <span key={`${word}-${index}`}>
            {emphasised ? <strong>{word}</strong> : word.toLowerCase()}
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

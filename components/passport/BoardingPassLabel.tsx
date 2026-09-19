type Field = {
  label: string;
  value: string;
};

/**
 * Boarding-pass information module: a row of tracked-out label/value pairs
 * separated by a perforated rule.
 */
export function BoardingPassLabel({
  fields,
  tone = "ink",
  className = "",
}: {
  fields: Field[];
  tone?: "ink" | "ivory";
  className?: string;
}) {
  const isInk = tone === "ink";

  return (
    <dl
      className={[
        "grid gap-x-8 gap-y-4 sm:grid-flow-col sm:auto-cols-max",
        className,
      ].join(" ")}
    >
      {fields.map((field) => (
        <div key={field.label}>
          <dt className={["signage-sm", isInk ? "text-ivory/45" : "text-ink/45"].join(" ")}>
            {field.label}
          </dt>
          <dd
            className={[
              "mt-1 font-mono text-xs uppercase tracking-wide2",
              isInk ? "text-ivory" : "text-ink",
            ].join(" ")}
          >
            {field.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

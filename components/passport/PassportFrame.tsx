import type { ReactNode } from "react";

import { PageNumber } from "@/components/passport/PageNumber";

type PassportFrameProps = {
  children: ReactNode;
  /** Page number printed in the corner of the passport page, e.g. "01". */
  page?: string;
  /** Registration-style code printed on the bottom edge. */
  code?: string;
  tone?: "ivory" | "ink";
  className?: string;
};

/**
 * An ivory (or navy) passport page: thin rules, document texture, page number
 * and a registration code along the bottom edge.
 */
export function PassportFrame({
  children,
  page,
  code,
  tone = "ivory",
  className = "",
}: PassportFrameProps) {
  const isIvory = tone === "ivory";

  return (
    <section
      className={[
        "relative animate-page-in rounded-sm border",
        isIvory
          ? "on-ivory border-ivory-line bg-ivory text-ink doc-pattern"
          : "border-ink-line bg-ink-soft text-ivory doc-pattern-dark",
        className,
      ].join(" ")}
    >
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-2 rounded-sm border",
          isIvory ? "border-ink/10" : "border-ivory/10",
        ].join(" ")}
      />

      <div className="relative px-5 py-6 sm:px-8 sm:py-9 lg:px-12 lg:py-12">{children}</div>

      {(page || code) && (
        <div
          className={[
            "relative flex items-center justify-between border-t px-5 py-2 sm:px-8",
            isIvory ? "border-ivory-line text-ink/50" : "border-ink-line text-ivory/50",
          ].join(" ")}
        >
          <span className="signage-sm">{code}</span>
          {page && <PageNumber page={page} tone={tone} />}
        </div>
      )}
    </section>
  );
}

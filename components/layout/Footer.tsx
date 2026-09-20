import { SignOutButton } from "@/components/auth/SignOutButton";

export function Footer() {
  return (
    <footer className="mt-16 bg-chrome-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6">
        <p className="text-[11px] text-white">
          Demonstration build · product copy pending brand approval
        </p>
        <SignOutButton />
      </div>
    </footer>
  );
}

"use client";

import { ACCESS_KEY } from "@/components/auth/credentials";

/** Returns to the sign-in screen — handy when restarting a demo. */
export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.sessionStorage.removeItem(ACCESS_KEY);
        } catch {
          // Nothing to clear if storage is unavailable.
        }
        window.location.reload();
      }}
      className="text-[11px] text-white/70 transition-colors duration-200 hover:text-white"
    >
      Sign out
    </button>
  );
}

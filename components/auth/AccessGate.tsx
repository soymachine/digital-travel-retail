"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

import { SignInScreen } from "@/components/auth/SignInScreen";
import { ACCESS_KEY, DEMO_PASSWORD, DEMO_USERNAME } from "@/components/auth/credentials";

/**
 * Shows the sign-in screen until the demo credentials are entered.
 *
 * A façade for the demo, not a security control: see credentials.ts.
 */
export function AccessGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(window.sessionStorage.getItem(ACCESS_KEY) === "granted");
    } catch {
      // Storage can be unavailable; the screen simply asks again.
    }
    setReady(true);
  }, []);

  const unlock = useCallback((user: string, password: string) => {
    const matches =
      user.trim().toLowerCase() === DEMO_USERNAME && password === DEMO_PASSWORD;

    if (matches) {
      try {
        window.sessionStorage.setItem(ACCESS_KEY, "granted");
      } catch {
        // Not being able to remember it only means signing in again.
      }
      setUnlocked(true);
    }

    return matches;
  }, []);

  // Until session storage has been read, render the paper background rather
  // than flashing either screen.
  if (!ready) return <div className="min-h-[100dvh] bg-paper" aria-hidden />;

  if (!unlocked) return <SignInScreen onUnlock={unlock} />;

  return <>{children}</>;
}

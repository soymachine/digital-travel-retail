"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { assetPath } from "@/lib/assets";

/** The passport cover: sign in to open it. */
export function SignInScreen({ onUnlock }: { onUnlock: (user: string, password: string) => boolean }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const userId = useId();
  const passwordId = useId();
  const errorId = useId();

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!onUnlock(user, password)) {
      setError(true);
      setPassword("");
    }
  }

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-10">
      <Image
        src={assetPath("/home/passport-hero.jpg")}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/65" />

      <main
        id="main"
        className="relative w-full max-w-sm rounded-2xl border border-line/40 bg-paper-panel p-8 shadow-2xl"
      >
        <p className="text-center text-sm font-medium uppercase tracking-signage text-taupe">
          Travel Retail
        </p>
        <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-ink">
          Perfume Sales Passport
        </h1>
        <p className="mt-3 text-center text-sm leading-relaxed text-taupe-deep">
          Sign in to open your passport.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <label htmlFor={userId} className="eyebrow-muted">
              User
            </label>
            <input
              id={userId}
              name="username"
              type="text"
              value={user}
              onChange={(event) => {
                setUser(event.target.value);
                setError(false);
              }}
              autoComplete="username"
              autoCapitalize="none"
              autoFocus
              aria-invalid={error}
              aria-describedby={error ? errorId : undefined}
              className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink focus:border-cocoa-soft focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor={passwordId} className="eyebrow-muted">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id={passwordId}
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(false);
                }}
                autoComplete="current-password"
                aria-invalid={error}
                aria-describedby={error ? errorId : undefined}
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 pr-20 text-[15px] text-ink focus:border-cocoa-soft focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute inset-y-0 right-3 text-sm text-taupe transition-colors duration-200 hover:text-cocoa"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p id={errorId} role="alert" className="text-sm text-stamp">
              That user and password do not match.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-bark px-6 py-4 text-[15px] font-medium text-paper transition-colors duration-200 hover:bg-ink"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-relaxed text-taupe">
          Demonstration build. This screen is part of the demo, not a security
          control.
        </p>
      </main>
    </div>
  );
}

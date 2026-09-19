import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PassportStateProvider } from "@/components/personalisation/PassportStateProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Travel Retail Perfume Sales Passport",
    template: "%s — Sales Passport",
  },
  description:
    "A digital sales passport for the travel retail fragrance advisor. Demonstration build.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink text-ivory antialiased">
        <PassportStateProvider>
          <a
            href="#main"
            className="signage sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-gold focus:bg-ink focus:px-4 focus:py-2 focus:text-gold"
          >
            Skip to content
          </a>
          <Header />
          <div className="flex min-h-[calc(100vh-4rem)] flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </PassportStateProvider>
      </body>
    </html>
  );
}

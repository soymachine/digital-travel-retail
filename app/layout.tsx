import type { Metadata } from "next";

import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { PassportStateProvider } from "@/components/personalisation/PassportStateProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Travel Retail Perfume Sales Passport",
    template: "%s — Travel Retail",
  },
  description:
    "A digital sales passport for the travel retail fragrance advisor. Demonstration build.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper text-ink antialiased">
        <PassportStateProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-bark focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
          >
            Skip to content
          </a>
          <Header />
          <SiteChrome>{children}</SiteChrome>
          <BottomNav />
        </PassportStateProvider>
      </body>
    </html>
  );
}

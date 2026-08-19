import "@/app/globals.css";

import type { Metadata } from "next";

import { cormorantGaramond, dmSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Aiguablava Residence | Luxury Property in Begur, Costa Brava",
  description:
    "Discover an exceptional Mediterranean residence in Aiguablava, Begur, with sea views, private pool and elegant contemporary architecture. €1,725,000.",
  keywords: [
    "Aiguablava",
    "Begur",
    "Costa Brava",
    "luxury villa",
    "property Spain",
    "sea view villa",
    "Mediterranean residence",
    "private pool",
    "luxury real estate",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Aiguablava Residence | Luxury Property in Begur, Costa Brava",
    description:
      "Discover an exceptional Mediterranean residence in Aiguablava, Begur, with sea views, private pool and elegant contemporary architecture.",
    siteName: "Aiguablava Residence",
    images: [
      {
        url: "/aiguablava/hero.png",
        width: 1200,
        height: 630,
        alt: "Aiguablava Residence — Luxury Mediterranean Villa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aiguablava Residence | Luxury Property in Begur, Costa Brava",
    description:
      "An exceptional Mediterranean residence with sea views and private pool in Begur, Costa Brava.",
    images: ["/aiguablava/hero.png"],
  },
};

export default function AiguablavaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${cormorantGaramond.variable} ${dmSans.variable} ar-root`}
      style={{
        fontFamily: "var(--font-dm), system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        /* Override root dark layout for Aiguablava route */
        .ar-root,
        .ar-root * {
          --background: #F4F1EA;
          --foreground: #171717;
        }
        body:has(.ar-root) {
          background-color: #F4F1EA !important;
          color: #171717;
        }
      `}</style>
      {children}
    </div>
  );
}

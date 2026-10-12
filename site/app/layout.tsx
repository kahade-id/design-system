import type { Metadata, Viewport } from "next";
import { GOOGLE_FONTS_URL } from "@kahade/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kahade Design Language",
  description:
    "Token, komponen, dan pola halaman @kahade/ui — satu bahasa desain untuk semua web Kahade.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
      </head>
      <body>
        <a href="#konten-utama" className="kh-skip-link">
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}

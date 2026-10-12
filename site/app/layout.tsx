import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

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
    <html lang="id" className={jakarta.variable} data-scroll-behavior="smooth">
      <body>
        <a href="#konten-utama" className="kh-skip-link">
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}

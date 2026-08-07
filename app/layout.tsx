import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const display = Cormorant_Garamond({ subsets: ["cyrillic", "latin"], variable: "--font-display", weight: ["400", "500", "600"], display: "swap" });
const sans = Manrope({ subsets: ["cyrillic", "latin"], variable: "--font-sans", weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nuit-store.ru"),
  title: { default: "NUIT — официальный сайт", template: "%s — NUIT" },
  description: "Первая коллекция NUIT. Одежда, вдохновленная ночными городами, случайными встречами и моментами, которые остаются с нами.",
  openGraph: {
    title: "NUIT — официальный сайт",
    description: "Первая коллекция NUIT. Создано для ночей, которые остаются в памяти.",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/images/poster.jpeg", width: 1024, height: 1280, alt: "Первая коллекция NUIT" }],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#080807" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

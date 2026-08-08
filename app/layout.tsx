import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteOrigin, withBasePath } from "@/lib/site";

const display = Cormorant_Garamond({ subsets: ["cyrillic", "latin"], variable: "--font-display", weight: ["400", "500", "600"], display: "swap" });
const sans = Manrope({ subsets: ["cyrillic", "latin"], variable: "--font-sans", weight: ["400", "500", "600"], display: "swap" });
const siteDescription = "NUIT — after midnight. South Caucasus mood. Ночь, вкус, детали.";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteOrigin}/`),
  title: { default: "NUIT — официальный сайт", template: "%s — NUIT" },
  description: siteDescription,
  openGraph: {
    title: "NUIT — официальный сайт",
    description: siteDescription,
    locale: "ru_RU",
    type: "website",
    images: [{ url: withBasePath("/images/poster.jpeg"), width: 1024, height: 1280, alt: "Первая коллекция NUIT" }],
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

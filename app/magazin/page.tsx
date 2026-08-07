import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Магазин",
  description: "Первая коллекция NUIT. Футболки свободного силуэта, созданные для ночей, которые остаются в памяти.",
  openGraph: { title: "Магазин — NUIT", images: [{ url: "/images/walk-black.jpeg", width: 960, height: 1280 }] },
};

export default function ShopPage() {
  return (
    <section className="bg-paper pt-[calc(68px+env(safe-area-inset-top))] text-ink">
      <header className="site-container flex min-h-[42vh] flex-col justify-end pb-10 pt-20 sm:pb-14 lg:min-h-[56vh] lg:pb-20">
        <p className="eyebrow text-ink/45">FIRST DROP · 2026</p>
        <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h1 className="font-display text-[clamp(4rem,10vw,9rem)] font-medium leading-[.78] tracking-editorial">Магазин</h1>
          <p className="max-w-sm text-sm leading-relaxed text-ink/55 md:text-right">Первая коллекция NUIT. Черный и белый.</p>
        </div>
      </header>
      <div className="site-container grid grid-cols-2 gap-x-3 gap-y-12 border-t border-ink/15 pb-24 pt-10 sm:gap-x-6 lg:gap-x-10 lg:gap-y-20 lg:pb-36 lg:pt-16">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 2} />
        ))}
      </div>
    </section>
  );
}

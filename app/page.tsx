import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { getPublishedProducts } from "@/lib/products";
import { withBasePath } from "@/lib/site";

const campaignImages = [
  [withBasePath("/images/wheel-white.jpeg"), "Белая футболка NUIT у колеса обозрения"],
  [withBasePath("/images/two-front-night.jpeg"), "Черная и белая футболки NUIT в вечернем городе"],
  [withBasePath("/images/sunset-close.jpeg"), "Черная футболка NUIT на фоне заката"],
  [withBasePath("/images/two-front-day.jpeg"), "Герои NUIT у колеса обозрения"],
] as const;

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getPublishedProducts();
  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night text-paper" aria-labelledby="hero-title">
        <picture className="absolute inset-0 -z-20">
          <source media="(max-width: 767px)" srcSet={withBasePath("/images/hero-sunset-mobile.jpeg")} />
          <img
            src={withBasePath("/images/hero-sunset-optimized.jpeg")}
            alt="Футболка NUIT на фоне заката"
            fetchPriority="high"
            className="size-full object-cover object-[50%_42%] sm:object-[50%_38%]"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
        <div className="site-container pb-8 pt-40 sm:pb-12 lg:pb-14">
          <Reveal>
            <h1 id="hero-title" className="font-display text-[clamp(5.2rem,19vw,17rem)] font-medium leading-[0.72] tracking-[-0.06em]">
              NUIT
            </h1>
            <Link href="/magazin" className="button-light mt-8 gap-5">
              Смотреть коллекцию <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28 lg:py-40" aria-labelledby="collection-title">
        <div className="site-container">
          <Reveal className="mb-12 flex items-end justify-between gap-6 border-b border-ink/20 pb-5 sm:mb-16">
            <div>
              <p className="eyebrow text-ink/45">FIRST DROP</p>
              <h2 id="collection-title" className="mt-5 font-display text-[clamp(3.4rem,7vw,7rem)] leading-[0.85] tracking-editorial">
                Two Strangers
              </h2>
            </div>
            <Link href="/magazin" className="button-line hidden gap-3 sm:inline-flex">
              Коллекция <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </Reveal>
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-6 lg:gap-x-8">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
          <Link href="/magazin" className="button-dark mt-12 w-full gap-4 sm:hidden">
            Коллекция <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28 lg:py-36" aria-labelledby="campaign-title">
        <div className="site-container">
          <Reveal className="mb-12 flex items-end justify-between border-b border-ink/20 pb-5">
            <p className="eyebrow text-ink/45">NUIT / 2026</p>
            <h2 id="campaign-title" className="font-display text-[clamp(2.7rem,6vw,6rem)] leading-none tracking-editorial">Lookbook</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {campaignImages.map(([src, alt], index) => (
              <Reveal key={src} delay={index * 0.06} className={index % 2 ? "mt-10 lg:mt-20" : undefined}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[#d8d3c9]">
                  <Image src={src} alt={alt} fill quality={70} sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-700 ease-editorial hover:scale-[1.02]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

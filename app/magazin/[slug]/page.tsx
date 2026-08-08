import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getProduct, products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { absoluteUrl } from "@/lib/site";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.shortName,
    description: product.description,
    alternates: { canonical: absoluteUrl(`/magazin/${product.slug}/`) },
    openGraph: {
      title: `${product.name} — NUIT`,
      description: product.description,
      images: [{ url: product.cardImage, width: 960, height: 1280, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((item) => item.id !== product.id);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((image) => absoluteUrl(image)),
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: "NUIT" },
    color: product.color,
  };

  return (
    <article className="bg-paper pt-[calc(68px+env(safe-area-inset-top))] text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

      <div className="lg:grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="hide-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 pt-5 md:hidden">
            {product.images.map((src, index) => (
              <figure key={src} className="relative aspect-[3/4] w-[86vw] shrink-0 snap-center overflow-hidden bg-[#ddd8ce]">
                <Image src={src} alt={`${product.name}, фото ${index + 1}`} fill priority={index === 0} sizes="86vw" className={src.includes("/product-") ? "bg-[#0d0d0d] object-contain p-4" : "object-cover"} />
                <figcaption className="absolute bottom-3 right-3 bg-paper/90 px-2 py-1 text-[9px] tracking-label">0{index + 1} / 0{product.images.length}</figcaption>
              </figure>
            ))}
          </div>

          <div className="hidden grid-cols-2 gap-px bg-ink/10 md:grid">
            {product.images.map((src, index) => (
              <div key={src} className="relative aspect-[3/4] overflow-hidden bg-[#ddd8ce]">
                <Image src={src} alt={`${product.name}, фото ${index + 1}`} fill priority={index < 2} sizes="(max-width: 1024px) 50vw, 34vw" className={src.includes("/product-") ? "bg-[#0d0d0d] object-contain p-8" : "object-cover"} />
              </div>
            ))}
          </div>
        </div>

        <aside className="px-5 pb-16 pt-9 sm:px-8 lg:col-span-4 lg:px-10 lg:pb-24 lg:pt-14 xl:px-14">
          <div className="lg:sticky lg:top-28">
            <div className="border-b border-ink/15 pb-8">
              <h1 className="max-w-xl font-display text-[clamp(2.7rem,5vw,5.5rem)] font-medium leading-[.9] tracking-editorial">{product.shortName}</h1>
              <p className="mt-6 text-sm">{formatPrice(product.price)}</p>
            </div>
            <div className="border-b border-ink/15 py-7">
              <p className="eyebrow text-ink/45">Цвет</p>
              <p className="mt-3 text-sm">{product.color}</p>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="site-container border-t border-ink/15 py-20 lg:py-32" aria-labelledby="related-heading">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div><p className="eyebrow text-ink/45">NUIT 01</p><h2 id="related-heading" className="mt-3 font-display text-4xl leading-none sm:text-5xl">Другой цвет</h2></div>
          </div>
          <div className="grid max-w-[720px] grid-cols-2 gap-3 sm:gap-6">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      )}
    </article>
  );
}

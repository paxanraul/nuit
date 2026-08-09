import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group min-w-0">
      <Link href={`/magazin/${product.slug}`} data-press="soft" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0d0d]">
          <Image
            src={product.cardImage}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, 40vw"
            className="object-cover transition duration-700 ease-editorial md:group-hover:scale-[1.015] md:group-hover:opacity-0"
          />
          <Image
            src={product.hoverImage}
            alt={`${product.name}, вид сзади`}
            fill
            sizes="(max-width: 768px) 50vw, 40vw"
            className="hidden object-cover opacity-0 transition duration-700 ease-editorial group-hover:scale-[1.015] group-hover:opacity-100 md:block"
          />
        </div>
        <div className="flex items-start justify-between gap-4 pt-4 text-ink">
          <div>
            <h3 className="text-[13px] font-medium leading-snug">{product.shortName}</h3>
            <p className="mt-1 text-[11px] uppercase tracking-label text-ink/50">{product.color}</p>
          </div>
          <p className="shrink-0 text-[13px]">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}

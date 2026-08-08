import type { MetadataRoute } from "next";
import { getPublishedProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getPublishedProducts();
  const staticRoutes = ["", "/magazin", "/kontakty"];
  return [
    ...staticRoutes.map((route) => ({ url: absoluteUrl(`${route}/`), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 })),
    ...products.map((product) => ({ url: absoluteUrl(`/magazin/${product.slug}/`), changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}

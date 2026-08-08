import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/magazin", "/kontakty"];
  return [
    ...staticRoutes.map((route) => ({ url: absoluteUrl(`${route}/`), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 })),
    ...products.map((product) => ({ url: absoluteUrl(`/magazin/${product.slug}/`), changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}

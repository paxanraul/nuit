import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nuit-store.ru";
  const staticRoutes = ["", "/magazin"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 })),
    ...products.map((product) => ({ url: `${base}/magazin/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}

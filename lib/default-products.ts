import type { Product } from "@/lib/products";

/**
 * Products shown by the local storefront before a PostgreSQL database is
 * configured. The production database is seeded with the same two items.
 */
export const defaultProducts: Product[] = [
  {
    id: "two-strangers-black",
    slug: "two-strangers-black",
    name: "Футболка NUIT Two Strangers — Black",
    shortName: "Two Strangers — Black",
    price: 2222,
    color: "Черный",
    composition: "100% хлопок",
    density: "210 г/м²",
    description: "",
    images: [
      "/images/product-black-front.jpeg",
      "/images/product-black-back.jpeg",
      "/images/walk-black.jpeg",
      "/images/sunset-close.jpeg",
    ],
    cardImage: "/images/product-black-front.jpeg",
    hoverImage: "/images/product-black-back.jpeg",
  },
  {
    id: "two-strangers-white",
    slug: "two-strangers-white",
    name: "Футболка NUIT Two Strangers — White",
    shortName: "Two Strangers — White",
    price: 2222,
    color: "Белый",
    composition: "100% хлопок",
    density: "210 г/м²",
    description: "",
    images: [
      "/images/product-white-front.jpeg",
      "/images/product-white-back.jpeg",
      "/images/walk-white.jpeg",
      "/images/white-back.jpeg",
    ],
    cardImage: "/images/product-white-front.jpeg",
    hoverImage: "/images/product-white-back.jpeg",
  },
];

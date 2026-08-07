export type ProductColor = "Черный" | "Белый";

import { withBasePath } from "@/lib/site";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  color: ProductColor;
  images: string[];
  cardImage: string;
  hoverImage: string;
  description: string;
};

const shared = {
  description:
    "Футболка свободного силуэта с принтом первой коллекции NUIT. Плотный хлопок, спущенная линия плеча и крупная графика на спине.",
};

export const products: Product[] = [
  {
    ...shared,
    id: "two-strangers-black",
    slug: "two-strangers-black",
    name: "Футболка NUIT Two Strangers — Black",
    shortName: "Two Strangers — Black",
    price: 2222,
    color: "Черный",
    cardImage: withBasePath("/images/product-black-front.jpeg"),
    hoverImage: withBasePath("/images/product-black-back.jpeg"),
    images: [
      withBasePath("/images/product-black-front.jpeg"),
      withBasePath("/images/product-black-back.jpeg"),
      withBasePath("/images/walk-black.jpeg"),
      withBasePath("/images/sunset-close.jpeg"),
    ],
  },
  {
    ...shared,
    id: "two-strangers-white",
    slug: "two-strangers-white",
    name: "Футболка NUIT Two Strangers — White",
    shortName: "Two Strangers — White",
    price: 2222,
    color: "Белый",
    cardImage: withBasePath("/images/product-white-front.jpeg"),
    hoverImage: withBasePath("/images/product-white-back.jpeg"),
    images: [
      withBasePath("/images/product-white-front.jpeg"),
      withBasePath("/images/product-white-back.jpeg"),
      withBasePath("/images/walk-white.jpeg"),
      withBasePath("/images/white-back.jpeg"),
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

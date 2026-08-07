export type ProductColor = "Черный" | "Белый";

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
    cardImage: "/images/product-black-front.jpeg",
    hoverImage: "/images/product-black-back.jpeg",
    images: [
      "/images/product-black-front.jpeg",
      "/images/product-black-back.jpeg",
      "/images/walk-black.jpeg",
      "/images/sunset-close.jpeg",
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
    cardImage: "/images/product-white-front.jpeg",
    hoverImage: "/images/product-white-back.jpeg",
    images: [
      "/images/product-white-front.jpeg",
      "/images/product-white-back.jpeg",
      "/images/walk-white.jpeg",
      "/images/white-back.jpeg",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

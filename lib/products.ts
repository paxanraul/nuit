import { db, hasDatabase } from "@/lib/db";
import { defaultProducts } from "@/lib/default-products";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  color: string;
  composition: string;
  density: string;
  description: string;
  images: string[];
  cardImage: string;
  hoverImage: string;
};

export type AdminProduct = Product & { status: "draft" | "published" };

type ProductRow = Omit<Product, "cardImage" | "hoverImage"> & { price: string | number };

function shape(row: ProductRow): Product {
  return {
    ...row,
    price: Number(row.price),
    cardImage: row.images[0] ?? "/images/product-overview.jpeg",
    hoverImage: row.images[1] ?? row.images[0] ?? "/images/product-overview.jpeg",
  };
}

const columns = "id, slug, name, short_name as \"shortName\", price, color, composition, density, description, images";

export async function getPublishedProducts() {
  if (!hasDatabase) return defaultProducts;
  const { rows } = await db.query<ProductRow>(`select ${columns} from products where status = 'published' order by created_at desc`);
  return rows.map(shape);
}

export async function getProduct(slug: string) {
  if (!hasDatabase) return defaultProducts.find((product) => product.slug === slug);
  const { rows } = await db.query<ProductRow>(`select ${columns} from products where slug = $1 and status = 'published' limit 1`, [slug]);
  return rows[0] ? shape(rows[0]) : undefined;
}

export async function getAllProducts(): Promise<AdminProduct[]> {
  if (!hasDatabase) return defaultProducts.map((product) => ({ ...product, status: "published" }));
  const { rows } = await db.query<ProductRow & { status: string }>(`select ${columns}, status from products order by created_at desc`);
  return rows.map((row) => ({ ...shape(row), status: row.status === "published" ? "published" : "draft" }));
}

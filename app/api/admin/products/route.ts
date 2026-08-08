import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

function cleanSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function saveFiles(files: File[], slug: string) {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  return Promise.all(files.filter((file) => file.size > 0).map(async (file) => {
    if (!file.type.startsWith("image/") || file.size > 12 * 1024 * 1024) throw new Error("Можно загружать изображения до 12 МБ");
    const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const filename = `${slug}-${randomUUID()}.${extension}`;
    await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()));
    return `/uploads/${filename}`;
  }));
}

export async function GET() {
  if (!await getAdminSession()) return NextResponse.json({ error: "Нет доступа" }, { status: 401 });
  const { rows } = await db.query("select id, slug, name, short_name as \"shortName\", price, color, composition, density, description, images, status from products order by created_at desc");
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  if (!await getAdminSession()) return NextResponse.json({ error: "Нет доступа" }, { status: 401 });
  try {
    const form = await request.formData();
    const name = String(form.get("name") ?? "").trim();
    const slug = cleanSlug(String(form.get("slug") ?? name));
    const shortName = String(form.get("shortName") ?? name).trim();
    const price = Number(form.get("price"));
    const color = String(form.get("color") ?? "").trim();
    const composition = String(form.get("composition") ?? "100% хлопок").trim();
    const density = String(form.get("density") ?? "210 г/м²").trim();
    const description = String(form.get("description") ?? "").trim();
    const status = form.get("status") === "published" ? "published" : "draft";
    const files = form.getAll("images").filter((item): item is File => item instanceof File);
    if (!name || !slug || !shortName || !color || !Number.isInteger(price) || price < 0 || !files.length) throw new Error("Заполните название, цену, цвет и добавьте хотя бы одно фото");
    const images = await saveFiles(files, slug);
    const { rows } = await db.query(
      "insert into products (slug, name, short_name, price, color, composition, density, description, images, status) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning id",
      [slug, name, shortName, price, color, composition, density, description, images, status],
    );
    return NextResponse.json({ id: rows[0].id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Не удалось сохранить товар" }, { status: 400 });
  }
}

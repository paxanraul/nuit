import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAdminSession()) return NextResponse.json({ error: "Нет доступа" }, { status: 401 });
  try {
    const { id } = await params;
    const form = await request.formData();
    const name = String(form.get("name") ?? "").trim();
    const slug = String(form.get("slug") ?? "").trim();
    const shortName = String(form.get("shortName") ?? name).trim();
    const price = Number(form.get("price"));
    const color = String(form.get("color") ?? "").trim();
    const composition = String(form.get("composition") ?? "100% хлопок").trim();
    const density = String(form.get("density") ?? "210 г/м²").trim();
    const description = String(form.get("description") ?? "").trim();
    const status = form.get("status") === "published" ? "published" : "draft";
    const existing = JSON.parse(String(form.get("existingImages") ?? "[]"));
    const files = form.getAll("images").filter((item): item is File => item instanceof File);
    const images = [...existing, ...await saveFiles(files, slug)];
    if (!name || !slug || !shortName || !color || !Number.isInteger(price) || price < 0 || !images.length) throw new Error("Заполните обязательные поля и оставьте хотя бы одно фото");
    await db.query("update products set slug=$1, name=$2, short_name=$3, price=$4, color=$5, composition=$6, density=$7, description=$8, images=$9, status=$10, updated_at=now() where id=$11", [slug, name, shortName, price, color, composition, density, description, images, status, id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Не удалось обновить товар" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAdminSession()) return NextResponse.json({ error: "Нет доступа" }, { status: 401 });
  const { id } = await params;
  await db.query("delete from products where id = $1", [id]);
  return NextResponse.json({ ok: true });
}

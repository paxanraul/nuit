"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import type { AdminProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

type EditorProduct = Partial<AdminProduct> & { images: string[] };
const blank = (): EditorProduct => ({ name: "", shortName: "", slug: "", price: 2222, color: "", composition: "100% хлопок", density: "210 г/м²", description: "", status: "draft", images: [] });

export function AdminPanel({ initialProducts }: { initialProducts: AdminProduct[] }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState<EditorProduct | null>(null);
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);

  async function refresh() {
    const response = await fetch("/api/admin/products");
    if (response.ok) setProducts(await response.json());
    router.refresh();
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setPending(true);
    setNotice("");
    const form = new FormData(event.currentTarget);
    form.set("existingImages", JSON.stringify(editing.images));
    const endpoint = editing.id ? `/api/admin/products/${editing.id}` : "/api/admin/products";
    const response = await fetch(endpoint, { method: editing.id ? "PATCH" : "POST", body: form });
    setPending(false);
    if (!response.ok) return setNotice((await response.json()).error ?? "Не удалось сохранить");
    setEditing(null);
    setNotice("Товар сохранён");
    await refresh();
  }

  async function remove(id: string) {
    if (!confirm("Удалить товар? Это действие нельзя отменить.")) return;
    const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!response.ok) return setNotice("Не удалось удалить товар");
    setNotice("Товар удалён");
    await refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <section className="min-h-[calc(100svh-68px)] bg-paper px-5 pb-20 pt-[calc(68px+env(safe-area-inset-top)+40px)] text-ink sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex items-end justify-between gap-6 border-b border-ink/15 pb-7">
          <div><p className="eyebrow text-ink/45">NUIT / Администрирование</p><h1 className="mt-4 font-display text-[clamp(3.6rem,8vw,7rem)] leading-[.82] tracking-editorial">Товары</h1></div>
          <div className="flex items-center gap-4"><button className="button-line" onClick={logout}>Выйти</button><button className="button-dark gap-3" onClick={() => { setNotice(""); setEditing(blank()); }}><Plus size={15} />Добавить</button></div>
        </div>
        {notice && <p className="mt-5 text-sm text-ink/60">{notice}</p>}
        <div className="mt-10 grid gap-px border-y border-ink/15 bg-ink/15">
          {products.map((product) => <article key={product.id} className="grid grid-cols-[72px_1fr_auto] items-center gap-4 bg-paper p-3 sm:grid-cols-[110px_1fr_auto] sm:gap-6 sm:p-5">
            <div className="relative aspect-square overflow-hidden bg-ink"><Image src={product.cardImage} alt="" fill sizes="110px" className="object-cover" /></div>
            <div><p className="text-sm font-medium">{product.shortName}</p><p className="mt-1 text-[10px] uppercase tracking-label text-ink/50">{product.status === "published" ? "Опубликован" : "Черновик"} · {formatPrice(product.price)}</p></div>
            <div className="flex items-center gap-1"><button className="icon-button" aria-label={`Редактировать ${product.shortName}`} onClick={() => { setNotice(""); setEditing(product); }}><Pencil size={17} /></button><button className="icon-button" aria-label={`Удалить ${product.shortName}`} onClick={() => remove(product.id)}><Trash2 size={17} /></button></div>
          </article>)}
          {!products.length && <p className="bg-paper py-16 text-center text-sm text-ink/50">Товаров пока нет.</p>}
        </div>
      </div>

      {editing && <div className="fixed inset-0 z-[60] overflow-y-auto bg-night/55 px-4 py-6 backdrop-blur-sm sm:px-8 sm:py-10"><form onSubmit={save} className="mx-auto max-w-2xl bg-paper p-5 text-ink sm:p-9">
        <div className="flex items-start justify-between gap-5 border-b border-ink/15 pb-6"><div><p className="eyebrow text-ink/45">{editing.id ? "Редактирование" : "Новый товар"}</p><h2 className="mt-3 font-display text-4xl leading-none">{editing.id ? "Редактирование" : "Новый товар"}</h2></div><button type="button" className="icon-button" onClick={() => setEditing(null)} aria-label="Закрыть"><X size={20} /></button></div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Field label="Название"><input name="name" required defaultValue={editing.name} className="field" /></Field>
          <Field label="Название на карточке"><input name="shortName" required defaultValue={editing.shortName} className="field" /></Field>
          <Field label="Slug (латиницей)"><input name="slug" required defaultValue={editing.slug} className="field" /></Field>
          <Field label="Цена, ₽"><input name="price" required min="0" type="number" defaultValue={editing.price} className="field" /></Field>
          <Field label="Цвет"><input name="color" required defaultValue={editing.color} className="field" /></Field>
          <Field label="Статус"><select name="status" defaultValue={editing.status} className="field"><option value="draft">Черновик</option><option value="published">Опубликовать</option></select></Field>
          <Field label="Состав"><input name="composition" required defaultValue={editing.composition} className="field" /></Field>
          <Field label="Плотность"><input name="density" required defaultValue={editing.density} className="field" /></Field>
        </div>
        <Field label="Описание" className="mt-6"><textarea name="description" defaultValue={editing.description} className="textarea" /></Field>
        <Field label="Добавить фотографии" className="mt-6"><input name="images" type="file" accept="image/jpeg,image/png,image/webp" multiple required={!editing.images.length} className="block w-full text-sm" /><span className="mt-2 block text-[10px] uppercase tracking-label text-ink/45">JPEG, PNG или WebP · до 12 МБ на файл</span></Field>
        {!!editing.images.length && <div className="mt-6"><p className="eyebrow text-ink/45">Текущие фото</p><div className="mt-3 grid grid-cols-4 gap-2">{editing.images.map((image) => <div key={image} className="relative aspect-square overflow-hidden bg-ink"><Image src={image} alt="" fill sizes="160px" className="object-cover" /><button type="button" onClick={() => setEditing({ ...editing, images: editing.images.filter((item) => item !== image) })} className="absolute right-1 top-1 grid size-7 place-items-center bg-paper text-ink" aria-label="Убрать фото"><X size={14} /></button></div>)}</div></div>}
        {notice && <p className="mt-5 text-sm text-ink/65">{notice}</p>}
        <button disabled={pending} className="button-dark mt-8 w-full">{pending ? "Сохраняем…" : editing.status === "published" ? "Сохранить и опубликовать" : "Сохранить черновик"}</button>
      </form></div>}
    </section>
  );
}

function Field({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
  return <label className={`block text-[10px] uppercase tracking-label text-ink/50 ${className}`}><span>{label}</span><span className="mt-3 block">{children}</span></label>;
}

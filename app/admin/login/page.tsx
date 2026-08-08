"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
    setPending(false);
    if (!response.ok) return setError((await response.json()).error ?? "Не удалось войти");
    router.replace("/admin");
    router.refresh();
  }

  return (
    <section className="flex min-h-[calc(100svh-68px)] items-center bg-night px-5 py-24 text-paper sm:px-8">
      <form onSubmit={submit} className="mx-auto w-full max-w-md border-t border-paper/20 pt-7">
        <p className="eyebrow text-paper/45">NUIT / Администрирование</p>
        <h1 className="mt-5 font-display text-5xl leading-none tracking-editorial">Вход</h1>
        <label className="mt-12 block text-[10px] uppercase tracking-label text-paper/50">Email<input name="email" type="email" required className="mt-3 h-14 w-full border border-paper/25 bg-transparent px-4 text-sm text-paper outline-none transition focus:border-paper" /></label>
        <label className="mt-6 block text-[10px] uppercase tracking-label text-paper/50">Пароль<input name="password" type="password" required className="mt-3 h-14 w-full border border-paper/25 bg-transparent px-4 text-sm text-paper outline-none transition focus:border-paper" /></label>
        {error && <p className="mt-5 text-sm text-paper/65">{error}</p>}
        <button className="button-light mt-8 w-full" disabled={pending}>{pending ? "Входим…" : "Войти"}</button>
      </form>
    </section>
  );
}

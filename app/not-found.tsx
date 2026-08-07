import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-night px-5 pt-24 text-center text-paper">
      <p className="eyebrow text-paper/45">Ошибка 404</p>
      <h1 className="mt-6 font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-editorial">Эта ночь<br />закончилась</h1>
      <p className="mt-7 max-w-md text-sm leading-relaxed text-paper/55">Страница не найдена. Коллекция всё ещё рядом.</p>
      <Link href="/magazin" className="button-light mt-9">Смотреть коллекцию</Link>
    </section>
  );
}

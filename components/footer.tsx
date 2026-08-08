import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-paper/15 bg-night px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-10 text-paper sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-12 py-10 sm:flex-row">
          <Link href="/" className="w-max font-display text-4xl tracking-[.25em]">NUIT</Link>
          <div className="flex items-center gap-8 text-xs"><Link href="/magazin">Коллекция</Link><a href="https://www.instagram.com/tgk.nuit_store" target="_blank" rel="noreferrer">Instagram</a><a href="https://t.me/nuit_store" target="_blank" rel="noreferrer">Telegram</a></div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-paper/15 py-5 text-[10px] uppercase tracking-label text-paper/40"><span>© NUIT 2026</span><span>Two strangers who know each other by heart.</span></div>
      </div>
    </footer>
  );
}

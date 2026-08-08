import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-paper/15 bg-night px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-6 text-paper sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 text-[10px] uppercase tracking-label text-paper/40">
        <Link href="/" className="font-display text-xl tracking-[.22em] text-paper">NUIT</Link>
        <span>© 2026</span>
      </div>
    </footer>
  );
}

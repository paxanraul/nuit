"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Instagram, Menu, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const solid = scrolled || pathname !== "/";

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 border-b px-5 pt-[env(safe-area-inset-top)] text-paper transition duration-500 sm:px-8 lg:px-12",
      solid ? "border-paper/15 bg-night/95 backdrop-blur-md" : "border-transparent bg-gradient-to-b from-black/55 to-transparent",
    )}>
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between">
        <Link href="/" className="font-display text-[29px] font-semibold tracking-[0.28em]" aria-label="NUIT — на главную">NUIT</Link>
        <nav className="hidden items-center gap-8 sm:flex" aria-label="Основная навигация">
          <Link href="/magazin" className="nav-link">Коллекция</Link>
          <Link href="/kontakty" className="nav-link">Контакты</Link>
        </nav>
        <button
          type="button"
          className="icon-button -mr-3 sm:hidden"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 -z-10 flex min-h-[100svh] flex-col justify-between bg-night px-5 pb-[max(32px,env(safe-area-inset-bottom))] pt-[calc(68px+env(safe-area-inset-top)+64px)] text-paper transition-[clip-path,visibility] duration-500 ease-editorial sm:hidden",
          menuOpen ? "visible clip-path-open" : "invisible clip-path-closed",
        )}
      >
        <nav className="flex flex-col" aria-label="Мобильная навигация">
          <Link href="/magazin" className="border-t border-paper/15 py-6 font-display text-5xl leading-none tracking-editorial" onClick={() => setMenuOpen(false)}>Коллекция</Link>
          <Link href="/kontakty" className="border-y border-paper/15 py-6 font-display text-5xl leading-none tracking-editorial" onClick={() => setMenuOpen(false)}>Контакты</Link>
        </nav>
        <div className="flex items-center gap-5">
          <a className="icon-button -ml-3" href="https://www.instagram.com/tgk.nuit_store" target="_blank" rel="noreferrer" aria-label="Instagram NUIT"><Instagram size={21} aria-hidden="true" /></a>
          <a className="icon-button" href="https://t.me/nuit_store" target="_blank" rel="noreferrer" aria-label="Telegram NUIT"><Send size={21} aria-hidden="true" /></a>
        </div>
      </div>
    </header>
  );
}

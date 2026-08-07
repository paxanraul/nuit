"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || pathname !== "/";

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 border-b px-5 pt-[env(safe-area-inset-top)] text-paper transition duration-500 sm:px-8 lg:px-12",
      solid ? "border-paper/15 bg-night/95 backdrop-blur-md" : "border-transparent bg-gradient-to-b from-black/55 to-transparent",
    )}>
      <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between">
        <Link href="/" className="font-display text-[29px] font-semibold tracking-[0.28em]" aria-label="NUIT — на главную">NUIT</Link>
        <Link href="/magazin" className="nav-link">Коллекция</Link>
      </div>
    </header>
  );
}

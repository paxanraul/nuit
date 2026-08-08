import type { Metadata } from "next";
import { ArrowUpRight, Instagram, Send } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты NUIT: Instagram и Telegram-канал.",
};

const contacts = [
  { label: "Instagram", handle: "@tgk.nuit_store", href: "https://www.instagram.com/tgk.nuit_store", Icon: Instagram },
  { label: "Telegram", handle: "@nuit_store", href: "https://t.me/nuit_store", Icon: Send },
] as const;

export default function ContactsPage() {
  return (
    <section className="flex min-h-[calc(100svh-68px)] bg-night px-5 pb-20 pt-[calc(68px+env(safe-area-inset-top)+72px)] text-paper sm:px-8 lg:px-12" aria-labelledby="contacts-title">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col justify-between gap-20 py-6 lg:flex-row lg:items-end lg:gap-24 lg:py-16">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-paper/45">NUIT / Контакты</p>
          <h1 id="contacts-title" className="mt-6 font-display text-[clamp(5rem,14vw,11rem)] leading-[.75] tracking-editorial">Связь</h1>
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-paper/55">Следите за новым и пишите нам там, где вам удобнее.</p>
        </Reveal>
        <div className="w-full max-w-[540px] border-t border-paper/15">
          {contacts.map(({ label, handle, href, Icon }, index) => (
            <Reveal key={label} delay={index * 0.08}>
              <a href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-5 border-b border-paper/15 py-7 text-paper sm:py-9">
                <span className="flex items-center gap-4 sm:gap-6"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /><span><span className="block font-display text-4xl leading-none sm:text-5xl">{label}</span><span className="mt-2 block text-[10px] uppercase tracking-label text-paper/45">{handle}</span></span></span>
                <ArrowUpRight className="shrink-0 transition duration-300 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1" size={20} aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

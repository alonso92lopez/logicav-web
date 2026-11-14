"use client";

import Image from "next/image";
import { useState } from "react";
import { contact } from "@/lib/content";

/*
  Encabezado del sitio de un rubro. Mismo lenguaje visual que el principal,
  pero sin nada de climatización: el menú son las secciones de la propia
  página y el subtítulo es el del rubro.

  Todos los enlaces son anclas, a propósito: la misma página se sirve en
  logicav.cl/<slug> y en la portada del subdominio, y un ancla funciona igual
  en los dos lados.
*/
export function RubroHeader({
  subtitulo,
  franja,
  nav,
  whatsappHref,
}: {
  subtitulo: string;
  franja: string;
  nav: { href: string; label: string }[];
  whatsappHref: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden border-b border-navy-600 bg-navy-900 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-steel-400">
          <p>{franja}</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${contact.email}`} className="transition hover:text-white">
              {contact.email}
            </a>
            <a href={`tel:${contact.phoneE164}`} className="transition hover:text-white">
              {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-flame-500 bg-navy-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5">
          <a
            href="#inicio"
            className="flex items-center gap-3.5"
            aria-label={`LOGICAV ${subtitulo}: inicio`}
            onClick={() => setOpen(false)}
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-(--radio) bg-white">
              <Image
                src="/images/brand/logo.png"
                alt=""
                fill
                sizes="48px"
                className="object-contain p-2"
                priority
              />
            </div>
            <div className="leading-none">
              <p className="font-display text-2xl font-bold tracking-[0.08em] text-white">
                LOGICAV
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-flame-500">
                {subtitulo}
              </p>
            </div>
          </a>

          <nav className="hidden gap-7 text-sm text-steel-400 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b-2 border-transparent pb-0.5 transition hover:border-flame-500 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-(--radio) border border-navy-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-navy-700 sm:block"
            >
              WhatsApp
            </a>
            <a
              href="#cotizar"
              className="hidden rounded-(--radio) bg-flame-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600 sm:block"
            >
              Cotizar
            </a>

            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen(!open)}
            >
              <span
                className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
              />
              <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="border-b-2 border-flame-500 bg-navy-800 px-6 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block border-b border-navy-600 py-3.5 text-sm uppercase tracking-[0.08em] text-steel-400 transition hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="border border-navy-500 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white"
            >
              WhatsApp
            </a>
            <a
              href="#cotizar"
              className="bg-flame-500 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white"
              onClick={() => setOpen(false)}
            >
              Cotizar
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

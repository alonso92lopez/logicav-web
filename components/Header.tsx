"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { contact } from "@/lib/content";

/* "Equipos" apunta a /equipos y no al carrusel de la home: la página está
   indexada y en el sitemap. El resto son anclas con prefijo / para que
   también funcionen desde /equipos. */
const links = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/equipos", label: "Equipos" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Franja de servicio: cobertura y canales, lo primero que se pregunta. */}
      <div className="hidden border-b border-navy-600 bg-navy-900 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-steel-400">
          <p>{contact.coverage} · Atención a hogar, empresas y faena</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${contact.email}`} className="transition hover:text-white">
              {contact.email}
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-flame-500 bg-navy-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5">
          <Link
            href="/"
            className="flex items-center gap-3.5"
            aria-label="LOGICAV — inicio"
            onClick={() => setOpen(false)}
          >
            {/* El PNG tiene fondo transparente: el cuadro blanco es de acá, no
                del archivo, para que el chevrón navy tenga contraste. */}
            <div className="relative h-12 w-12 shrink-0 bg-white">
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
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-steel-400">
                Climatización e ingeniería
              </p>
            </div>
          </Link>

          <nav className="hidden gap-7 text-sm text-steel-400 lg:flex">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b-2 border-transparent pb-0.5 transition hover:border-flame-500 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href={`tel:${contact.phoneE164}`} className="hidden text-right leading-none sm:block">
              <span className="block font-display text-xl font-bold tracking-wide text-white">
                {contact.phoneDisplay}
              </span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-flame-500">
                Cotiza hoy
              </span>
            </a>
            <Link
              href="/#cotizar"
              className="hidden bg-flame-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600 lg:block"
            >
              Cotizar
            </Link>

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
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block border-b border-navy-600 py-3.5 text-sm uppercase tracking-[0.08em] text-steel-400 transition hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#cotizar"
            className="mt-5 block bg-flame-500 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600"
            onClick={() => setOpen(false)}
          >
            Cotizar
          </Link>
        </nav>
      )}
    </header>
  );
}

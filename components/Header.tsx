"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#planes", label: "Planes" },
  { href: "/#metodologia", label: "Metodología" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/equipos", label: "Equipos" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="LOGICAV — inicio" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
          <Link
            href="/#cotizar"
            className="rounded-md bg-accent px-4.5 py-2.5 font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Solicitar cotización
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-5 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-md px-3 py-3 text-base font-medium text-ink-soft hover:bg-mist hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/#cotizar"
                className="block rounded-md bg-accent px-4 py-3 text-center font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Solicitar cotización
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

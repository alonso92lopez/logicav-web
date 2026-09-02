import Link from "next/link";
import { contact } from "@/lib/content";

const columnas = [
  {
    titulo: "Servicios",
    links: [
      { label: "Instalación", href: "/#servicios" },
      { label: "Mantención preventiva", href: "/#servicios" },
      { label: "Diagnóstico y reparación", href: "/#servicios" },
      { label: "Proyectos HVAC", href: "/#servicios" },
    ],
  },
  {
    titulo: "Equipos",
    links: [
      { label: "9.000 BTU", href: "/equipos" },
      { label: "12.000 BTU", href: "/equipos" },
      { label: "18.000 BTU", href: "/equipos" },
      { label: "24.000 BTU", href: "/equipos" },
      { label: "Calculadora de capacidad", href: "/calculadora" },
    ],
  },
  {
    titulo: "Empresa",
    links: [
      { label: "Nosotros", href: "/#nosotros" },
      { label: "Proyectos", href: "/#proyectos" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-flame-500 bg-navy-900">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-2xl font-bold tracking-[0.08em] text-white">LOGICAV</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-steel-500">
              Climatización e ingeniería
            </p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-steel-400">
              Instalación, mantención y proyectos de climatización para hogar, empresas y faena.
            </p>
            <div className="mt-6 flex flex-col gap-1.5 text-sm">
              <a
                href={`tel:${contact.phoneE164}`}
                className="font-display text-xl font-bold text-white transition hover:text-flame-500"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="text-steel-400 transition hover:text-white"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {columnas.map((col) => (
            <div key={col.titulo}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-flame-500">
                {col.titulo}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-steel-400">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-navy-600 pt-6 text-xs text-steel-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} LOGICAV. Todos los derechos reservados.</p>
          <p>
            {contact.coverage} · {contact.hours}
          </p>
        </div>
      </div>
    </footer>
  );
}

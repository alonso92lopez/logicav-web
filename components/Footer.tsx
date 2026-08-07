import Link from "next/link";
import { Logo } from "./Logo";
import { contact } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-ink-soft">
            Mantención, instalación y proyectos de climatización para empresas,
            edificios e instituciones. {contact.coverage}.
          </p>
        </div>

        <div>
          <p className="kicker">Navegación</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            <li><Link href="/#servicios" className="hover:text-ink">Servicios</Link></li>
            <li><Link href="/#planes" className="hover:text-ink">Planes de mantención</Link></li>
            <li><Link href="/#metodologia" className="hover:text-ink">Metodología</Link></li>
            <li><Link href="/equipos" className="hover:text-ink">Equipos</Link></li>
            <li><Link href="/#cotizar" className="hover:text-ink">Cotizar</Link></li>
          </ul>
        </div>

        <div>
          <p className="kicker">Contacto</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-ink">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="hover:text-ink">
                WhatsApp {contact.phoneDisplay}
              </a>
            </li>
            <li>{contact.hours}</li>
            <li>{contact.coverage}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-ink-faint md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} LOGICAV. Todos los derechos reservados.</p>
          <p className="font-mono uppercase tracking-[0.18em]">
            Climatización · Mantención · Ingeniería
          </p>
        </div>
      </div>
    </footer>
  );
}

import { contact } from "@/lib/content";

/* Pie del sitio de un rubro: sin columnas de climatización. */
export function RubroFooter({
  subtitulo,
  descripcion,
  nav,
  whatsappHref,
}: {
  subtitulo: string;
  descripcion: string;
  nav: { href: string; label: string }[];
  whatsappHref: string;
}) {
  return (
    <footer className="border-t-2 border-flame-500 bg-navy-900">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-[0.08em] text-white">LOGICAV</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-flame-500">
              {subtitulo}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-steel-400">{descripcion}</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-flame-500">
              En esta página
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-steel-400">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-flame-500">
              Contacto
            </p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm">
              <a
                href={`tel:${contact.phoneE164}`}
                className="font-display text-xl font-bold text-white transition hover:text-flame-500"
              >
                {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className="text-steel-400 transition hover:text-white">
                {contact.email}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="text-steel-400 transition hover:text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-navy-600 pt-6 text-xs text-steel-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} LOGICAV SpA. Todos los derechos reservados.</p>
          <p>{contact.hours}</p>
        </div>
      </div>
    </footer>
  );
}

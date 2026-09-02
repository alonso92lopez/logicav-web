import Link from "next/link";
import { contact } from "@/lib/content";

export function CtaBanner() {
  return (
    <section className="bg-navy-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="rule" />
          <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-none text-white md:text-4xl">
            ¿Equipo detenido o proyecto por cotizar?
          </h2>
          <p className="mt-4 text-sm leading-7 text-steel-400">
            Llámanos y evaluamos el caso por teléfono. Si necesita visita técnica, la coordinamos en
            la misma llamada.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <a
            href={`tel:${contact.phoneE164}`}
            className="bg-flame-500 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600"
          >
            {contact.phoneDisplay}
          </a>
          <Link
            href="#contacto"
            className="border border-navy-500 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-navy-700"
          >
            Cotizar en línea
          </Link>
        </div>
      </div>
    </section>
  );
}

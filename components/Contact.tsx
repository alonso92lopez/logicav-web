import { QuoteForm } from "./QuoteForm";
import { contact } from "@/lib/content";

export function Contact() {
  return (
    <section id="contacto" className="bg-shell py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Contacto</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-navy-800 md:text-5xl">
            Cuéntanos el requerimiento
          </h2>
          <p className="mt-5 text-sm leading-7 text-steel-600">
            Mientras más contexto nos des, más precisa es la cotización. Para consultas rápidas,
            escríbenos directo por WhatsApp o llámanos.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-line lg:grid-cols-[1.5fr_1fr]">
          <div className="bg-white p-7 md:p-9">
            <QuoteForm variant="plain" />
          </div>

          <div className="flex flex-col gap-px bg-line">
            <div className="flex-1 bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel-500">
                Teléfono
              </p>
              <a
                href={`tel:${contact.phoneE164}`}
                className="mt-2 block font-display text-3xl font-bold leading-none text-navy-800 transition hover:text-flame-500"
              >
                {contact.phoneDisplay}
              </a>
              <p className="mt-3 text-sm leading-6 text-steel-600">
                {contact.hours}. También por WhatsApp al mismo número.
              </p>
            </div>

            <div className="flex-1 bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel-500">
                Correo
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-2 block font-display text-2xl font-bold leading-none text-navy-800 transition hover:text-flame-500"
              >
                {contact.email}
              </a>
              <p className="mt-3 text-sm leading-6 text-steel-600">
                Para cotizaciones formales, órdenes de compra y facturación.
              </p>
            </div>

            <div className="flex-1 bg-navy-800 p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-flame-500">
                Minería e industrial
              </p>
              <p className="mt-3 text-sm leading-6 text-steel-400">
                Para faenas y plantas, cuéntanos ubicación, condiciones del recinto y ventana de
                intervención. Te conectamos con el área técnica.
              </p>
              <a
                href={`${contact.whatsapp}?text=${encodeURIComponent(
                  "Hola, necesito cotizar un proyecto de climatización para minería o entorno industrial."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:text-flame-500"
              >
                Consultar
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

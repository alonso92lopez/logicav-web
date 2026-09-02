import Image from "next/image";
import { contact, featuredServices, formatCLP } from "@/lib/content";

export function FeaturedServices() {
  return (
    <section className="bg-shell py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Servicios con precio publicado</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-navy-800 md:text-5xl">
            Sabes cuánto cuesta antes de llamar
          </h2>
        </div>

        <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
          {featuredServices.map((service) => (
            <article key={service.slug} className="grid bg-white sm:grid-cols-[200px_1fr]">
              <div className="relative h-52 bg-shell sm:h-full">
                <Image
                  src={service.imageUrl}
                  alt={service.nombre}
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col p-7">
                <span className="rule" />
                <h3 className="mt-5 font-display text-2xl font-bold uppercase leading-none tracking-wide text-navy-800">
                  {service.nombre}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-steel-600">
                  {service.descripcion}
                </p>

                <div className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-steel-500">
                    Desde
                  </p>
                  <p className="font-display text-3xl font-bold leading-none tabular-nums text-navy-800">
                    {formatCLP(service.precioOferta)}
                  </p>
                  {service.precio > service.precioOferta && (
                    <p className="text-sm tabular-nums text-steel-500 line-through">
                      {formatCLP(service.precio)}
                    </p>
                  )}
                  <p className="text-xs text-steel-500">+ IVA</p>
                </div>

                <a
                  href={`${contact.whatsapp}?text=${encodeURIComponent(
                    `Hola, quiero cotizar el servicio: ${service.nombre}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-fit bg-navy-800 px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-flame-500"
                >
                  Agendar este servicio
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

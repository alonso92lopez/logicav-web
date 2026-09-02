import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "./QuoteForm";

const equipos = ["Split muro", "Cassette", "Ducto", "Piso-techo", "VRF"];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-800">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy-800 via-navy-800/95 to-navy-800/70"
      />

      <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-6 py-14 lg:grid-cols-[1.1fr_minmax(0,400px)] lg:gap-14 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-flame-500">
            Hogar · Empresas · Minería
          </p>

          {/* text-4xl en móvil: a 48px la primera línea no cabe en 320px y el
              salto forzado de abajo se pierde. */}
          <h1 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Climatización que
            <br />
            opera <span className="text-flame-500">sin detenerse</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-steel-400">
            Instalamos y mantenemos sistemas de climatización: cálculo de carga
            térmica, instalación certificada y mantención programada para que la
            operación no se corte.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/equipos"
              className="bg-flame-500 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600"
            >
              Ver equipos y precios
            </Link>
            <Link
              href="#servicios"
              className="border border-navy-500 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-navy-700"
            >
              Servicios
            </Link>
          </div>

          <dl className="mt-10 border-t border-navy-600 pt-5">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
              Equipos que instalamos
            </dt>
            <dd className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm text-steel-400">
              {equipos.map((equipo, i) => (
                <span key={equipo} className="flex items-center gap-3">
                  {equipo}
                  {i < equipos.length - 1 && (
                    <span aria-hidden className="text-navy-500">
                      /
                    </span>
                  )}
                </span>
              ))}
            </dd>
          </dl>
        </div>

        <div id="cotizar" className="lg:sticky lg:top-32">
          <QuoteForm variant="card" />
        </div>
      </div>
    </section>
  );
}

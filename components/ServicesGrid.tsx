import { services } from "@/lib/content";

export function ServicesGrid() {
  return (
    <section id="servicios" className="bg-shell py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Servicios</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-navy-800 md:text-5xl">
              Instalación, mantención y proyectos
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-steel-600">
            Cubrimos el ciclo completo del sistema: desde el dimensionamiento inicial hasta el plan
            que lo mantiene operando.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="group bg-white p-8 transition hover:bg-navy-800">
              <span className="rule" />
              <h3 className="mt-5 font-display text-2xl font-bold uppercase leading-none tracking-wide text-navy-800 transition group-hover:text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-steel-600 transition group-hover:text-steel-400">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

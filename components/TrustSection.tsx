import { trustItems } from "@/lib/content";

export function TrustSection() {
  return (
    <section className="border-y border-line bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Cómo trabajamos</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-navy-800">
              El criterio técnico
              <br />
              es el servicio
            </h2>
            <p className="mt-5 text-sm leading-7 text-steel-600">
              Instalar un equipo es la parte fácil. Lo que define si el sistema rinde son las
              decisiones que se toman antes y el plan que lo mantiene operando después.
            </p>
          </div>

          <dl className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item.title} className="border-t border-line pt-5">
                <dt className="font-display text-xl font-bold uppercase tracking-wide text-navy-800">
                  {item.title}
                </dt>
                <dd className="mt-3 text-sm leading-7 text-steel-600">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

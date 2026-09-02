import { about } from "@/lib/content";

export function About() {
  return (
    <section id="nosotros" className="border-b border-line bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="eyebrow">Nosotros</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-navy-800 md:text-5xl">
              Una empresa técnica,
              <br />
              no una tienda de equipos
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-steel-600">{about.intro}</p>
            <p className="mt-4 max-w-xl text-base leading-8 text-steel-600">
              {about.introSecond}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
              Qué cubrimos internamente
            </p>
            <dl className="mt-5 border-t border-line">
              {about.capacidades.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[minmax(0,140px)_1fr] gap-5 border-b border-line py-4"
                >
                  <dt className="font-display text-lg font-bold uppercase leading-tight tracking-wide text-navy-800">
                    {item.label}
                  </dt>
                  <dd className="text-sm leading-6 text-steel-600">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

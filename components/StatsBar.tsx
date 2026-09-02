import { stats } from "@/lib/content";

export function StatsBar() {
  return (
    <section className="border-b border-navy-600 bg-navy-700">
      <div className="mx-auto max-w-7xl px-6">
        {/* gap-px sobre el fondo navy-600 dibuja las reglas sin bordes por celda,
            así no aparecen filos sueltos al pasar de 4 a 2 columnas. */}
        <div className="grid grid-cols-2 gap-px bg-navy-600 lg:grid-cols-4">
          {stats.map((dato) => (
            <div key={dato.label} className="bg-navy-700 px-5 py-6">
              <p className="font-display text-3xl font-bold leading-none tabular-nums text-white">
                {dato.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel-400">
                {dato.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

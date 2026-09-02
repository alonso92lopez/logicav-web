import Link from "next/link";
import { segments } from "@/lib/content";

export function SegmentsSection() {
  return (
    <section id="segmentos" className="bg-shell py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="eyebrow">Para quién trabajamos</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-navy-800 md:text-5xl">
            Tres contextos, tres formas de resolver
          </h2>
          <p className="mt-5 text-base leading-7 text-steel-600">
            El equipo, el criterio de instalación y el plan de mantención cambian según dónde va a
            operar el sistema. Estas son las tres líneas que atendemos.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-line md:grid-cols-3">
          {segments.map((seg) => (
            <div key={seg.label} className="flex flex-col bg-white p-8">
              <span className="rule" />
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                {seg.label}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-none tracking-wide text-navy-800">
                {seg.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-steel-600">{seg.text}</p>
              <Link
                href={seg.href}
                className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-flame-500 transition hover:text-flame-600"
              >
                {seg.cta}
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

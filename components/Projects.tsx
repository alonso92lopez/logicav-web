import Image from "next/image";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <section id="proyectos" className="bg-navy-900 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Proyectos</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-white md:text-5xl">
              El trabajo ejecutado
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-steel-400">
            Desde un dormitorio hasta una faena en operación. Lo que cambia es el contexto; el
            criterio de ejecución es el mismo.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="group flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-700">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 border-t-2 border-flame-500 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-400">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-wide text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-steel-400">{project.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

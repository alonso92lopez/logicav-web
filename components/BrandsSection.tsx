import Image from "next/image";
import { brands } from "@/lib/content";

/* Altura base del logo dentro de la celda, en px. Cada marca la corrige con
   su `scale` para pesar lo mismo ópticamente. */
const ALTURA_BASE = 34;

export function BrandsSection() {
  return (
    <section className="border-b border-line bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Marcas que atendemos</p>
          <p className="mt-4 text-sm leading-7 text-steel-600">
            Instalamos, mantenemos y conseguimos repuestos para equipos de estas marcas. Si la
            tuya no aparece, consúltanos: la mayoría de los equipos split e inverter comparten
            criterio de mantención.
          </p>
        </div>

        {/* Borde por celda con margen negativo en vez de gap-px sobre un fondo:
            así una última fila incompleta no deja un bloque gris colgando. */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((brand) => (
            <div
              key={brand.alt}
              className="-ml-px -mt-px flex h-24 items-center justify-center border border-line px-5"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width={220}
                height={72}
                style={{ height: `${Math.round(ALTURA_BASE * brand.scale)}px` }}
                className="w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

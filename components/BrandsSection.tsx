import Image from "next/image";
import { brands } from "@/lib/content";

/* Los tres archivos de logo tienen fondo claro o transparente: van sobre blanco. */
export function BrandsSection() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-10 lg:flex-row lg:gap-14 lg:py-8">
        <p className="shrink-0 text-[11px] font-semibold uppercase leading-5 tracking-[0.16em] text-steel-500 lg:max-w-[180px]">
          Marcas que trabajamos
        </p>
        {/* Padding chico en móvil: con tres columnas fijas la celda queda en
            ~90px y el logo de Clark (aspecto 1.9) se achica de más. */}
        <div className="grid w-full grid-cols-3 gap-px bg-line">
          {brands.map((brand) => (
            <div
              key={brand.alt}
              className="flex items-center justify-center bg-white px-2 py-4 sm:px-4 sm:py-5"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width={160}
                height={56}
                className="h-9 w-auto object-contain sm:h-12 md:h-14"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

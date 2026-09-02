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
        <div className="grid w-full grid-cols-3 gap-px bg-line">
          {brands.map((brand) => (
            <div key={brand.alt} className="flex items-center justify-center bg-white px-4 py-5">
              <Image
                src={brand.src}
                alt={brand.alt}
                width={160}
                height={56}
                className="h-12 w-auto object-contain md:h-14"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

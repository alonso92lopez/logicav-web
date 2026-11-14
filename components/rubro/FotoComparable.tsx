"use client";

import Image from "next/image";
import { useState } from "react";
import type { Foto } from "@/lib/rubros/tipos";

/*
  Una foto del sitio de rubro. Si trae candidatas, en desarrollo aparecen
  botones sobre la imagen para compararlas en su lugar real. En producción
  no existen: siempre se muestra `foto`.
*/
export function FotoComparable({
  foto,
  candidatas,
  sizes,
  className,
}: {
  foto: Foto;
  candidatas?: Foto[];
  sizes: string;
  className?: string;
}) {
  const [actual, setActual] = useState(foto);
  const comparar =
    process.env.NODE_ENV !== "production" && candidatas && candidatas.length > 1;

  return (
    <>
      <Image
        src={actual.src}
        alt={actual.alt}
        fill
        sizes={sizes}
        className={className}
        style={actual.posicion ? { objectPosition: actual.posicion } : undefined}
      />

      {comparar && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full border border-black/10 bg-white p-1 text-xs shadow-lg">
          <span className="px-2 font-semibold text-neutral-500">Foto</span>
          {candidatas.map((c, i) => (
            <button
              key={c.src}
              type="button"
              onClick={() => setActual(c)}
              aria-pressed={c.src === actual.src}
              className={`rounded-full px-3 py-1.5 font-semibold transition ${
                c.src === actual.src
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {c.pie ?? i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

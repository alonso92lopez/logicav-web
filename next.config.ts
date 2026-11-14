import type { NextConfig } from "next";
import { rubros } from "./lib/rubros";

const nextConfig: NextConfig = {
  /*
    Sitios de rubro en subdominio: la portada de <subdominio>.logicav.cl
    muestra la página del rubro, sin cambiar la dirección que ve la persona.
    El patrón acepta cualquier dominio para que también funcione en local
    (http://piscinas.localhost:3000).

    Solo se reescribe la portada. El dominio hay que agregarlo además en el
    proyecto de Vercel y en el DNS.
  */
  async rewrites() {
    return {
      beforeFiles: rubros
        .filter((r) => r.subdominio)
        .map((r) => ({
          source: "/",
          has: [{ type: "host" as const, value: `${r.subdominio}\\..*` }],
          destination: `/${r.slug}`,
        })),
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;

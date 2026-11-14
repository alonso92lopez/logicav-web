import type { MetadataRoute } from "next";
import { rubros } from "@/lib/rubros";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.logicav.cl",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.logicav.cl/equipos",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.logicav.cl/calculadora",
      changeFrequency: "yearly",
      priority: 0.6,
    },
    // Los rubros a prueba no se anuncian.
    ...rubros
      .filter((r) => !r.enPrueba)
      .map((r) => ({
        url: `https://www.logicav.cl/${r.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}

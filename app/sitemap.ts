import type { MetadataRoute } from "next";

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
  ];
}

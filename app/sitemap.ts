import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://logicav.cl",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://logicav.cl/equipos",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}

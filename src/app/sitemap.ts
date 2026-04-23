import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artisans-comores.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/a-propos", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/artisans/plombier", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/artisans/electricien", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/artisans/gros-oeuvre", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/artisans/finition", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/galerie", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}

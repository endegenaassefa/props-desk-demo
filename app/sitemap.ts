import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/terms", "/disclaimer", "/refunds", "/responsible-gaming"];
  const now = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "yearly",
    priority: route === "" ? 1 : 0.4,
  }));
}

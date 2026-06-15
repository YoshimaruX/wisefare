import type { MetadataRoute } from "next";
import { LOCALES, BRAND } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${BRAND.domain}`;
  const paths = ["", "/flights", "/hotels", "/vpn", "/how", "/premium", "/legal/privacy", "/legal/terms"];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    for (const p of paths) {
      entries.push({
        url: `${base}/${locale}${p}`,
        lastModified: new Date(),
        changeFrequency: p === "" ? "daily" : "weekly",
        priority: p === "" ? 1 : 0.7,
      });
    }
  }
  return entries;
}

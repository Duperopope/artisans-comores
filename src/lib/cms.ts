import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import defaultContent from "../content/cms-content.json";

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: HeroStat[];
  imageUrl?: string;
  imageAlt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ContactContent {
  email: string;
  responseTime: string;
}

export interface MediaContent {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "plomberie" | "electricite" | "gros-oeuvre" | "finition";
  location: string;
  description: string;
  imageUrl?: string;
}

export interface CmsContent {
  hero: HeroContent;
  services: ServiceItem[];
  contact: ContactContent;
  media: MediaContent;
  gallery: GalleryItem[];
}

const CMS_FILE_PATH = join(process.cwd(), "src/content/cms-content.json");

function withDefaults(raw: unknown): CmsContent {
  const fallback = defaultContent as CmsContent;
  const parsed = (raw ?? {}) as Partial<CmsContent>;
  return {
    hero: { ...fallback.hero, ...(parsed.hero ?? {}) },
    services: parsed.services ?? fallback.services,
    contact: { ...fallback.contact, ...(parsed.contact ?? {}) },
    media: { ...fallback.media, ...(parsed.media ?? {}) },
    gallery: parsed.gallery ?? fallback.gallery,
  };
}

export function getCmsContent(): CmsContent {
  try {
    const raw = readFileSync(CMS_FILE_PATH, "utf-8");
    return withDefaults(JSON.parse(raw));
  } catch {
    return withDefaults(defaultContent);
  }
}

export function saveCmsContent(content: CmsContent): void {
  writeFileSync(CMS_FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
}

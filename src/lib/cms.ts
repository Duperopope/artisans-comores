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
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ContactContent {
  email: string;
  responseTime: string;
}

export interface CmsContent {
  hero: HeroContent;
  services: ServiceItem[];
  contact: ContactContent;
}

const CMS_FILE_PATH = join(process.cwd(), "src/content/cms-content.json");

export function getCmsContent(): CmsContent {
  try {
    const raw = readFileSync(CMS_FILE_PATH, "utf-8");
    return JSON.parse(raw) as CmsContent;
  } catch {
    return defaultContent as CmsContent;
  }
}

export function saveCmsContent(content: CmsContent): void {
  writeFileSync(CMS_FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
}

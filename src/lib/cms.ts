import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { kv } from "@vercel/kv";
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
const KV_KEY = "cms:content";

function hasKvCredentials(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  );
}

async function readFromFile(): Promise<CmsContent> {
  try {
    const raw = await readFile(CMS_FILE_PATH, "utf-8");
    return JSON.parse(raw) as CmsContent;
  } catch {
    return defaultContent as CmsContent;
  }
}

async function writeToFile(content: CmsContent): Promise<void> {
  await writeFile(CMS_FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
}

export async function getCmsContent(): Promise<CmsContent> {
  if (hasKvCredentials()) {
    const stored = await kv.get<CmsContent>(KV_KEY);
    if (stored) return stored;
    return defaultContent as CmsContent;
  }
  return readFromFile();
}

export async function saveCmsContent(content: CmsContent): Promise<void> {
  if (hasKvCredentials()) {
    await kv.set(KV_KEY, content);
    return;
  }
  await writeToFile(content);
}

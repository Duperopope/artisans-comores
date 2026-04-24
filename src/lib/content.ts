import defaultContent from "@/data/content.json";

export type Stat = { value: string; label: string };

export type HeroContent = {
  badge: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  cta1Text: string;
  cta2Text: string;
  stats: Stat[];
};

export type ServiceContent = {
  id: string;
  title: string;
  description: string;
};

export type ContactContent = {
  sectionLabel: string;
  heading: string;
  subheading: string;
  features: string[];
};

export type SiteContent = {
  hero: HeroContent;
  services: ServiceContent[];
  contact: ContactContent;
};

export const STORAGE_KEY = "ac-cms-draft";

export const DEFAULT_CONTENT: SiteContent = defaultContent as SiteContent;

export function loadContent(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_CONTENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    return JSON.parse(raw) as SiteContent;
  } catch {
    return DEFAULT_CONTENT;
  }
}

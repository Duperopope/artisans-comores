import defaultContent from "@/data/content.json";
import { getSupabase } from "@/lib/supabase";

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

export const DEFAULT_CONTENT: SiteContent = defaultContent as SiteContent;

export const CMS_TABLE = "cms_content";
export const CMS_ROW_ID = "singleton";

export async function fetchRemoteContent(): Promise<SiteContent | null> {
  try {
    const { data, error } = await getSupabase()
      .from(CMS_TABLE)
      .select("content")
      .eq("id", CMS_ROW_ID)
      .maybeSingle();

    if (error || !data?.content) return null;
    return data.content as SiteContent;
  } catch {
    return null;
  }
}

export async function saveRemoteContent(content: SiteContent): Promise<void> {
  const supabase = getSupabase();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id ?? null;

  const { error } = await supabase
    .from(CMS_TABLE)
    .upsert({ id: CMS_ROW_ID, content, updated_by: userId }, { onConflict: "id" });

  if (error) throw error;
}

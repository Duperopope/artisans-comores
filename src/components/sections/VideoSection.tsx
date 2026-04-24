import Animated from "@/components/ui/Animated";
import type { MediaContent } from "@/lib/cms";

interface VideoSectionProps {
  media?: MediaContent;
}

function isYouTubeOrVimeo(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const id = u.hostname.includes("youtu.be")
        ? u.pathname.slice(1)
        : u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export default function VideoSection({ media }: VideoSectionProps) {
  const videoUrl = media?.videoUrl?.trim();
  if (!videoUrl) return null;

  const title = media?.title?.trim() || "Voyez nos chantiers en action";
  const description = media?.description?.trim() || "";
  const poster = media?.posterUrl?.trim();
  const embedUrl = isYouTubeOrVimeo(videoUrl);

  return (
    <section id="video" className="section-padding bg-white scroll-mt-16" aria-label="Présentation vidéo">
      <div className="container-custom max-w-5xl">
        <Animated>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block text-sm font-inter font-semibold text-terracotta-600 uppercase tracking-wider mb-3">
              En vidéo
            </span>
            <h2 className="section-heading mb-4">{title}</h2>
            {description && (
              <p className="text-neutral-500 font-inter leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </Animated>

        <Animated delay={0.1}>
          <div className="relative rounded-3xl overflow-hidden aspect-video shadow-xl border border-sand-200 bg-ocean-950">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <video
                src={videoUrl}
                poster={poster || undefined}
                controls
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              >
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
            )}
          </div>
        </Animated>
      </div>
    </section>
  );
}

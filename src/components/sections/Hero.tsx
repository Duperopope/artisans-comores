import Animated from "@/components/ui/Animated";
import type { HeroContent } from "@/lib/cms";

interface HeroProps {
  cms?: HeroContent;
}

const DEFAULT_STATS = [
  { value: "1 sem.", label: "Pour votre devis" },
  { value: "100%", label: "Qualité garantie" },
  { value: "0€", label: "Devis sans engagement" },
];

export default function Hero({ cms }: HeroProps) {
  const badge = cms?.badge ?? "Artisans qualifiés — Comores";
  const title = cms?.title ?? "Vos travaux aux Comores,";
  const titleHighlight = cms?.titleHighlight ?? "réalisés par des mains de maître";
  const description =
    cms?.description ??
    "Nous connectons la diaspora comorienne en France avec des artisans expérimentés aux Comores. Plomberie, électricité, gros œuvre et finition — un seul interlocuteur, une confiance absolue.";
  const ctaPrimary = cms?.ctaPrimary ?? "Obtenir un devis gratuit";
  const ctaSecondary = cms?.ctaSecondary ?? "Nos services";
  const stats = cms?.stats ?? DEFAULT_STATS;
  const imageUrl = cms?.imageUrl?.trim();
  const imageAlt = cms?.imageAlt?.trim() || "Illustration du chantier";

  return (
    <section
      className="relative overflow-hidden bg-ocean-950 text-white"
      aria-label="Section principale"
    >
      {/* Decorative background blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/3 w-[500px] h-[500px] bg-ocean-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-terracotta-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-[300px] h-[300px] bg-tropical-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative py-24 lg:py-36">
        <div className={`grid gap-12 items-center ${imageUrl ? "lg:grid-cols-[1.1fr_1fr]" : ""}`}>
          <div className="max-w-3xl">
            {/* Badge */}
            <Animated delay={0}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-tropical-500 rounded-full animate-pulse" aria-hidden="true" />
                <span className="text-sm font-inter text-white/90">{badge}</span>
              </div>
            </Animated>

            {/* Headline + subheadline */}
            <Animated delay={0.1}>
              <h1 className="font-outfit font-bold text-white mb-6 leading-tight">
                {title}{" "}
                <span className="text-terracotta-400">{titleHighlight}</span>
              </h1>
              <p className="text-lg text-white/75 font-inter leading-relaxed mb-10 max-w-2xl">
                {description}
              </p>
            </Animated>

            {/* CTAs */}
            <Animated delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="btn-primary bg-terracotta-600 hover:bg-terracotta-700 focus-visible:ring-terracotta-400 text-base px-8 py-3"
                >
                  {ctaPrimary}
                </a>
                <a
                  href="#services"
                  className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus-visible:ring-white text-base px-8 py-3"
                >
                  {ctaSecondary}
                </a>
              </div>
            </Animated>

            {/* Trust stats */}
            <Animated delay={0.3}>
              <div
                className="mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-6 max-w-sm"
                aria-label="Chiffres clés"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-outfit font-bold text-terracotta-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/55 font-inter mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Animated>
          </div>

          {imageUrl && (
            <Animated delay={0.15} direction="right">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl aspect-[4/3]">
                {/* Using native img to stay compatible with static export. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ocean-950/40 via-transparent to-transparent" aria-hidden="true" />
              </div>
            </Animated>
          )}
        </div>
      </div>
    </section>
  );
}

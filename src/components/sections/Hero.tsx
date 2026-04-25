"use client";

import Animated from "@/components/ui/Animated";
import { useContent } from "@/components/ContentProvider";

export default function Hero() {
  const c = useContent().hero;
  return (
    <section
      className="relative overflow-hidden bg-ocean-950 text-white"
      aria-label="Section principale"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/3 w-[500px] h-[500px] bg-ocean-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-terracotta-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-[300px] h-[300px] bg-tropical-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative py-24 lg:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-tropical-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="text-sm font-inter text-white/90">{c.badge}</span>
          </div>

          <h1 className="font-outfit font-bold text-white mb-6 leading-tight">
            {c.headline}{" "}
            <span className="text-terracotta-400">{c.headlineAccent}</span>
          </h1>
          <p className="text-lg text-white/75 font-inter leading-relaxed mb-10 max-w-2xl">
            {c.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="btn-primary bg-terracotta-600 hover:bg-terracotta-700 focus-visible:ring-terracotta-400 text-base px-8 py-3"
            >
              {c.cta1Text}
            </a>
            <a
              href="#services"
              className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus-visible:ring-white text-base px-8 py-3"
            >
              {c.cta2Text}
            </a>
          </div>

          <Animated delay={0.2}>
            <div
              className="mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-6 max-w-sm"
              aria-label="Chiffres clés"
            >
              {c.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-outfit font-bold text-terracotta-400">{stat.value}</div>
                  <div className="text-xs text-white/55 font-inter mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </Animated>
        </div>
      </div>
    </section>
  );
}

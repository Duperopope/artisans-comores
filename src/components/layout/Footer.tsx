import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ocean-950 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-outfit font-bold text-xl mb-3">
              Artisans<span className="text-terracotta-400">Comores</span>
            </div>
            <p className="text-white/60 text-sm font-inter leading-relaxed max-w-xs">
              Un collectif d'artisans qualifiés aux Comores, au service de la diaspora comorienne en France.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-outfit font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              Nos services
            </h3>
            <ul className="space-y-2 font-inter text-sm text-white/60" role="list">
              {[
                { label: "Plomberie", href: "/artisans/plombier" },
                { label: "Électricité", href: "/artisans/electricien" },
                { label: "Gros œuvre", href: "/artisans/gros-oeuvre" },
                { label: "Finition", href: "/artisans/finition" },
                { label: "Galerie", href: "/galerie" },
              ].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-terracotta-400 transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-outfit font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2 font-inter text-sm text-white/60" role="list">
              <li>
                <Link href="/contact" className="hover:text-terracotta-400 transition-colors">
                  Demander un devis
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-terracotta-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li className="text-white/55 text-xs pt-2">
                Réponse sous 1 semaine
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55 font-inter">
          <span>© {currentYear} Artisans Comores. Tous droits réservés.</span>
          <span>Site réalisé par <span className="text-white/60">Kairos Forge</span></span>
        </div>
      </div>
    </footer>
  );
}

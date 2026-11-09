import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MenuPleinEcran } from '../acier/Interface';
import { Menu } from 'lucide-react';
import { SITE, NAV } from '../data/site';

// En-tête commun à tout le site : se cache quand on descend, revient quand on remonte.
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  const [cache, setCache] = useState(false);
  const [haut, setHaut] = useState(true);
  const { pathname } = useLocation();
  const accueil = pathname === '/';

  useEffect(() => setOuvert(false), [pathname]);

  useEffect(() => {
    let dernier = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHaut(y < 20);
      setCache(y > 200 && y > dernier);
      dernier = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const BoutonDevis = ({ className }) =>
    accueil ? (
      <a href="#devis" onClick={() => setOuvert(false)} className={className}>Demander un devis</a>
    ) : (
      <Link to="/devis" className={className}>Demander un devis</Link>
    );

  return (
    <motion.header
      animate={{ y: cache ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${haut ? 'border-b border-[#D6DAE1]' : 'shadow-[0_10px_30px_-15px_rgba(11,27,61,0.35)]'}`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link to="/" className="shrink-0" aria-label="OA Métal Industrie, accueil">
          <img src="/logo.jpeg" alt="OA Métal Industrie" className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {NAV.filter((l) => l.to !== '/').map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `pm-nav group relative py-1 transition-colors ${isActive ? 'text-[#0B1B3D]' : 'text-[#3B4658] hover:text-[#0B1B3D]'}`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-[#FF6B00] transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <span className="hidden sm:block">
            <BoutonDevis className="pm-btn pm-btn-nuit !py-3" />
          </span>
          <button
            type="button"
            onClick={() => setOuvert(!ouvert)}
            className="flex h-11 items-center gap-2 border border-[#D6DAE1] px-3 font-['Barlow_Condensed'] text-sm font-bold uppercase tracking-wider lg:hidden"
            aria-expanded={ouvert}
            aria-label="Ouvrir le menu"
          >
            Menu <Menu size={20} />
          </button>
        </div>
      </div>

      <MenuPleinEcran ouvert={ouvert} fermer={() => setOuvert(false)} />
    </motion.header>
  );
}

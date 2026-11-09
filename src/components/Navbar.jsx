import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Menu, X, ClipboardList, ArrowUpRight } from 'lucide-react';
import { SITE, NAV } from '../data/site';
import { useDemande } from '../context/Demande';

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [scrolle, setScrolle] = useState(false);
  const { pathname } = useLocation();
  const { lignes, setOuvert } = useDemande();

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolle(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-shadow ${scrolle ? 'shadow-[0_8px_30px_-12px_rgba(11,27,61,0.35)]' : 'border-b border-gray-200'}`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center" aria-label="Accueil OA Métal Industrie">
            <img src="/logo.jpeg" alt="OA Métal Industrie" className="h-12 w-auto object-contain" />
          </Link>

          {/* Navigation numérotée (desktop) */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {NAV.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `group relative whitespace-nowrap px-2 py-2 text-[13px] font-semibold uppercase tracking-wide transition ${
                    isActive ? 'text-industrial-orange' : 'text-industrial-blue hover:text-industrial-orange'
                  }`
                }
              >
                <span className="mr-1 hidden align-top font-display text-[10px] text-gray-400 xl:inline">0{i + 1}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${SITE.telephones[0].lien}`}
              className="hidden items-center gap-2.5 whitespace-nowrap border-l border-gray-200 pl-4 2xl:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center bg-industrial-orange/10 text-industrial-orange">
                <Phone size={16} />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500">Service commercial</span>
                <span className="block text-sm font-bold text-industrial-blue">{SITE.telephones[0].affiche}</span>
              </span>
            </a>

            <button
              type="button"
              onClick={() => setOuvert(true)}
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center border border-gray-200 text-industrial-blue transition hover:border-industrial-blue"
              aria-label={`Ma demande de devis (${lignes.length})`}
            >
              <ClipboardList size={19} />
              {lignes.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-industrial-orange px-1 text-[11px] font-bold text-white">
                  {lignes.length}
                </span>
              )}
            </button>

            <Link to="/devis" className="btn-orange hidden !px-5 !py-3 sm:inline-flex">
              Devis <ArrowUpRight size={16} />
            </Link>

            <button
              type="button"
              onClick={() => setMenu(true)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center bg-industrial-blue text-white lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu plein écran (mobile / tablette) */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-industrial-ink text-white"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-20 items-center justify-between px-4 sm:px-6">
              <span className="font-display text-2xl font-extrabold uppercase tracking-tight">
                OA <span className="text-industrial-orange">Métal</span> Industrie
              </span>
              <button
                type="button"
                onClick={() => setMenu(false)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center border border-white/20"
                aria-label="Fermer le menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col px-4 pt-4 sm:px-6">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 border-b border-white/10 py-3 font-display text-4xl font-bold uppercase ${
                        isActive ? 'text-industrial-orange' : 'text-white'
                      }`
                    }
                  >
                    <span className="font-sans text-xs font-semibold text-white/40">0{i + 1}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-4 px-4 py-8 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Service commercial</p>
              {SITE.telephones.map((t) => (
                <a key={t.lien} href={`tel:${t.lien}`} className="block text-lg font-bold">{t.affiche}</a>
              ))}
              <p className="text-sm text-white/60">{SITE.adresse.join(', ')}</p>
              <Link to="/devis" className="btn-orange w-full">Demander un devis</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

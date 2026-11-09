import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Phone } from 'lucide-react';
import { SITE } from '../data/site';
import { geometrieV } from '../premium/geometrieV';
import Etincelles from '../premium/Etincelles';
import BandeauV from './BandeauV';
import { CONTENEUR, EASE, Etiquette, TitreAcier } from './Communs';
import { Compteur } from '../premium/Dynamique';

// ---------------------------------------------------------------------
// En-tête de page : fond bleu nuit strié, bas découpé en V, étincelles,
// puis le bandeau plié en V (comme sur l'accueil).
// ---------------------------------------------------------------------
export function EnTetePage({ etiquette, debut, accent, texte, image, fil, children }) {
  const ref = useRef(null);
  const [w, setW] = useState(1440);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setW(el.getBoundingClientRect().width || 1440);
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const { D } = geometrieV(w);

  return (
    <>
      <section
        ref={ref}
        className="ac-forge relative isolate overflow-hidden"
        style={{ clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${D}px), 50% 100%, 0 calc(100% - ${D}px))`, paddingBottom: D + 40 }}
      >
        {image && (
          <motion.img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 1.8, ease: EASE }}
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1B3D] via-[#0B1B3D]/85 to-[#0B1B3D]/50" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 ac-stries" aria-hidden="true" />
        <Etincelles className="absolute inset-0 -z-[5] h-full w-full" />

        <div className={`${CONTENEUR} relative pt-14 lg:pt-20`}>
          <nav aria-label="Fil d'Ariane" className="ac-cond flex items-center gap-2 text-xs font-bold text-white/60">
            <Link to="/" className="hover:text-white">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-[#FF6B00]">{fil}</span>
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Etiquette>{etiquette}</Etiquette>
              <TitreAcier as="h1" debut={debut} accent={accent} clair className="ac-titre mt-5 !text-[clamp(3rem,7vw,6.25rem)]" />
            </div>
            {texte && (
              <motion.p
                className="leading-relaxed text-white/80 lg:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              >
                {texte}
              </motion.p>
            )}
          </div>
          {children && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease: EASE }} className="mt-10">
              {children}
            </motion.div>
          )}
        </div>
      </section>
      <BandeauV />
    </>
  );
}

// ---------------------------------------------------------------------
// Bandeau d'appel à l'action (fin de page)
// ---------------------------------------------------------------------
export function AppelAction({ debut = 'Un chantier en vue ?', accent = 'Parlons métal.', texte = 'Envoyez-nous vos quantités, vos longueurs de tôles ou votre liste de ferraillage. Notre service commercial vous rappelle avec un prix.' }) {
  return (
    <section className="bg-[#F3F4F6] py-24">
      <div className={CONTENEUR}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          className="ac-chanfrein ac-forge relative overflow-hidden px-6 py-14 sm:px-12 lg:px-16"
        >
          <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-10 select-none font-['Barlow_Condensed'] text-[12rem] font-extrabold uppercase leading-none text-white/[0.04]">OA</span>
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <TitreAcier debut={debut} accent={accent} clair className="ac-titre-m" />
              <p className="mt-5 max-w-xl leading-relaxed text-white/75">{texte}</p>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <Link to="/devis" className="ac-btn pm-brillance w-full sm:w-auto">Demander un devis <ArrowRight size={18} /></Link>
              <a href={`tel:${SITE.telephones[0].lien}`} className="ac-cond flex items-center gap-3 text-lg font-bold text-white hover:text-[#FF6B00]">
                <Phone size={18} className="text-[#FF6B00]" /> {SITE.telephones[0].affiche}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Bande de chiffres clés (compteurs animés)
// ---------------------------------------------------------------------
export function Chiffres({ items = [
  { v: '10+', l: "Années d'activité" },
  { v: '500+', l: 'Projets livrés' },
  { v: '300+', l: 'Clients satisfaits' },
  { v: '100 %', l: 'Couverture nationale' },
] }) {
  return (
    <div className="grid grid-cols-2 gap-px bg-[#D9DCE1] lg:grid-cols-4">
      {items.map((c, i) => (
        <motion.div
          key={c.l}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
          className="bg-white p-6 sm:p-8"
        >
          <p className="font-['Barlow_Condensed'] text-[clamp(3rem,6vw,5rem)] font-extrabold leading-none text-[#0B1B3D]">
            <Compteur valeur={c.v} />
          </p>
          <p className="ac-cond mt-2 text-xs font-bold text-[#FF6B00]">{c.l}</p>
        </motion.div>
      ))}
    </div>
  );
}

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Calendar, User } from 'lucide-react';
import '../acier/acier.css';
import { EnTetePage, AppelAction, Chiffres } from '../acier/Pages';
import { CONTENEUR, EASE, EnTeteSection } from '../acier/Communs';
import { REALISATIONS, CATEGORIES_REALISATIONS } from '../data/pages';

function CarteProjet({ p, i, grande }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: EASE }}
      className={`group relative overflow-hidden bg-[#0B1B3D] text-white ${grande ? 'lg:col-span-2 lg:row-span-2' : ''}`}
    >
      <div className={`relative ${grande ? 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]' : 'aspect-[4/3]'}`}>
        <img src={p.image} alt={p.titre} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07122A] via-[#07122A]/40 to-transparent" />
        <span className="ac-etiquette absolute left-4 top-4"><Calendar size={12} /> {p.annee}</span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="ac-cond flex items-center gap-1.5 text-xs font-bold text-[#FF6B00]"><MapPin size={13} /> {p.lieu}</p>
          <h3 className={`mt-2 font-['Barlow_Condensed'] font-extrabold uppercase leading-none ${grande ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>{p.titre}</h3>
          <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-3 text-sm leading-relaxed text-white/80">{p.texte}</p>
              <p className="ac-cond mt-3 flex items-center gap-1.5 text-xs font-bold text-white/60"><User size={13} /> {p.client}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Realisations() {
  const [cat, setCat] = useState('all');
  const liste = cat === 'all' ? REALISATIONS : REALISATIONS.filter((p) => p.categorie === cat);

  return (
    <div className="ac bg-[#F3F4F6]">
      <EnTetePage
        fil="Réalisations"
        etiquette="Nos références"
        debut="Chantiers"
        accent="& projets"
        texte="Une sélection de projets de construction et d'infrastructures bâtis avec les aciers fournis par OA Métal Industrie."
        image="/images/images.jpg"
      />

      <section className="py-20 lg:py-28">
        <div className={CONTENEUR}>
          <EnTeteSection etiquette="Ils nous ont fait confiance" debut="Des ouvrages" accent="qui tiennent" texte="Bâtiments, usines, villas : survolez un projet pour découvrir ce que nous avons fourni." />

          <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filtrer les projets">
            {CATEGORIES_REALISATIONS.map((c) => (
              <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)} className="ac-puce px-5 py-3 text-sm">{c.label}</button>
            ))}
          </div>

          <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {liste.map((p, i) => <CarteProjet key={p.titre} p={p} i={i} grande={cat === 'all' && i === 0} />)}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="pb-8">
        <div className={CONTENEUR}><Chiffres /></div>
      </section>

      <AppelAction debut="Votre prochain projet" accent="avec OA Métal ?" texte="Contactez notre service commercial pour discuter de vos besoins en fers et en matériaux." />
    </div>
  );
}

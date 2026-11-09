import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Clock, User, ArrowRight } from 'lucide-react';
import '../acier/acier.css';
import { EnTetePage, AppelAction } from '../acier/Pages';
import { CONTENEUR, EASE } from '../acier/Communs';
import { ARTICLES, CATEGORIES_ARTICLES } from '../data/pages';

function Meta({ a, clair }) {
  return (
    <p className={`ac-cond flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold ${clair ? 'text-white/60' : 'text-[#8F96A3]'}`}>
      <span>{a.date}</span>
      <span className="flex items-center gap-1"><Clock size={12} /> {a.lecture}</span>
      <span className="flex items-center gap-1"><User size={12} /> {a.auteur}</span>
    </p>
  );
}

export default function Actualites() {
  const [cat, setCat] = useState('Tous');
  const [q, setQ] = useState('');
  const liste = ARTICLES.filter((a) =>
    (cat === 'Tous' || a.categorie === cat) &&
    (a.titre + a.extrait).toLowerCase().includes(q.toLowerCase())
  );
  const [une, ...autres] = liste;

  return (
    <div className="ac bg-[#F3F4F6]">
      <EnTetePage
        fil="Actualités"
        etiquette="Restez informés"
        debut="Actualités"
        accent="& conseils"
        texte="Nos arrivages, la vie du dépôt et nos conseils d'experts pour réussir vos projets de construction."
        image="/images/tole-ondulee.jpg"
      />

      <section className="py-20 lg:py-28">
        <div className={CONTENEUR}>
          {/* Filtres */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Catégories">
              {CATEGORIES_ARTICLES.map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className="ac-puce px-4 py-2.5 text-sm">{c}</button>
              ))}
            </div>
            <label className="relative block w-full lg:w-80">
              <span className="sr-only">Rechercher un article</span>
              <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F96A3]" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un article…" className="ac-champ !pl-11" />
            </label>
          </div>

          {liste.length === 0 ? (
            <div className="mt-16 bg-white p-12 text-center">
              <p className="font-['Barlow_Condensed'] text-3xl font-extrabold uppercase">Aucun article trouvé</p>
              <p className="mt-2 text-[#5F6878]">Essayez un autre mot ou une autre catégorie.</p>
              <button type="button" onClick={() => { setCat('Tous'); setQ(''); }} className="ac-btn mt-6">Afficher tous les articles</button>
            </div>
          ) : (
            <>
              {/* Article à la une */}
              <AnimatePresence mode="wait">
                <motion.article
                  key={une.titre}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="group mt-12 grid overflow-hidden bg-white lg:grid-cols-12"
                >
                  <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[26rem]">
                    <img src={une.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="ac-etiquette absolute left-4 top-4">À la une</span>
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:col-span-5 lg:p-12">
                    <span className="ac-etiquette-contour self-start text-[#FF6B00]">{une.categorie}</span>
                    <h2 className="mt-5 font-['Barlow_Condensed'] text-4xl font-extrabold uppercase leading-[0.95]">{une.titre}</h2>
                    <p className="mt-4 leading-relaxed text-[#5F6878]">{une.extrait}</p>
                    <div className="mt-6"><Meta a={une} /></div>
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* Autres articles */}
              <motion.div layout className="mt-6 grid gap-6 md:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {autres.map((a, i) => (
                    <motion.article
                      layout
                      key={a.titre}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                      className="group flex flex-col bg-white"
                      style={{ borderTop: '4px solid #FF6B00' }}
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={a.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="ac-cond text-xs font-bold text-[#FF6B00]">{a.categorie}</span>
                        <h3 className="mt-2 font-['Barlow_Condensed'] text-2xl font-extrabold uppercase leading-tight">{a.titre}</h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5F6878]">{a.extrait}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-[#EEF0F3] pt-4">
                          <Meta a={a} />
                          <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-[#FF6B00]" />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </section>

      <AppelAction />
    </div>
  );
}

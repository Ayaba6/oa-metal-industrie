import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Check, ArrowRight } from 'lucide-react';
import '../acier/acier.css';
import { EnTetePage, AppelAction } from '../acier/Pages';
import { CONTENEUR, EASE, EnTeteSection } from '../acier/Communs';
import ProduitsPhares from '../acier/ProduitsPhares';
import { Controle } from '../acier/Sections';
import { PRODUITS, CATEGORIES_PRODUITS } from '../data/pages';
import { useDemande } from '../context/Demande';

function CarteProduit({ p, i }) {
  const { ajouter } = useDemande();
  const [ok, setOk] = useState(false);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: EASE }}
      className="group relative flex flex-col bg-white"
      style={{ borderTop: `4px solid ${i % 2 ? '#0B1B3D' : '#FF6B00'}` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.titre} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="ac-etiquette absolute left-3 top-3">{p.badge}</span>
        <span className="absolute bottom-0 right-0 bg-[#0B1B3D] px-3 py-1 font-['Barlow_Condensed'] text-lg font-extrabold text-[#FF6B00]">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-['Barlow_Condensed'] text-3xl font-extrabold uppercase">{p.titre}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#5F6878]">{p.description}</p>
        <ul className="mt-4 space-y-1.5">
          {p.points.map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 bg-[#FF6B00]" />{t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <button
            type="button"
            onClick={() => { ajouter({ produit: p.titre, detail: 'Quantité à préciser' }); setOk(true); setTimeout(() => setOk(false), 1500); }}
            className="ac-cond flex items-center gap-2 text-sm font-bold text-[#0B1B3D] transition-colors hover:text-[#FF6B00]"
          >
            {ok ? <Check size={16} /> : <Plus size={16} />} {ok ? 'Ajouté' : 'Ajouter à ma demande'}
          </button>
          <Link to="/devis" aria-label={`Devis pour ${p.titre}`} className="flex h-10 w-10 items-center justify-center bg-[#0B1B3D] text-white transition-colors hover:bg-[#FF6B00] hover:text-[#0B1B3D]">
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Produits() {
  const [cat, setCat] = useState('all');
  const liste = cat === 'all' ? PRODUITS : PRODUITS.filter((p) => p.categorie === cat);

  return (
    <div className="ac bg-[#F3F4F6]">
      <EnTetePage
        fil="Produits"
        etiquette="Qualité · Résistance · Confiance"
        debut="Nos produits"
        accent="& matériaux"
        texte="Fers, tôles, profilés et accessoires : tout le métal de votre chantier, en stock à Ouagadougou."
        image="/images/tube-carre.jpg"
      />

      <section className="py-20 lg:py-28">
        <div className={CONTENEUR}>
          <EnTeteSection etiquette="Le catalogue" debut="Tout le métal de" accent="votre chantier" texte="Filtrez par famille, ajoutez les produits à votre demande, puis précisez les quantités dans le devis." />

          <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filtrer les produits">
            {CATEGORIES_PRODUITS.map((c) => (
              <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)} className="ac-puce relative px-5 py-3 text-sm">
                {c.label}
                <span className="ml-2 text-xs opacity-60">{c.id === 'all' ? PRODUITS.length : PRODUITS.filter((p) => p.categorie === c.id).length}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {liste.map((p, i) => <CarteProduit key={p.titre} p={p} i={i} />)}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <ProduitsPhares />
      <Controle />
      <AppelAction debut="Besoin d'autres" accent="matériaux ?" texte="Retrouvez-nous à Bassinko, Station OTAM, à Ouagadougou, ou contactez notre service commercial pour un accompagnement sur mesure." />
    </div>
  );
}

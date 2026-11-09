import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { ShieldCheck, Ruler, Truck, Headset, ArrowUpRight } from 'lucide-react';
import { SITE, CATALOGUE } from '../data/site';
import { Titre, TexteScroll, SloganLettres } from './Texte';
import { Compteur } from './Dynamique';

const CONTENEUR = 'mx-auto max-w-[1240px] px-5 sm:px-8';
const EASE = [0.22, 1, 0.36, 1];

// ---------------------------------------------------------------------
// Bandeau orange (signature de la proposition 1)
// ---------------------------------------------------------------------
export function BandeauOrange() {
  const items = ['Tôles bac & ondulées', 'Fer à béton haute adhérence', 'Tubes carrés', 'Poutrelles IPN', 'Fer attaché & pointes', 'Livraison partout au Burkina'];
  const liste = [...items, ...items];
  return (
    <div className="overflow-hidden bg-[#FF6B00] py-4 text-[#0B1B3D]" aria-label={items.join(', ')}>
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {liste.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-7 font-display text-2xl font-extrabold uppercase tracking-wide">
            {t}
            <svg width="14" height="16" viewBox="0 0 14 16" className="ml-14" aria-hidden="true">
              <path d="M1 1 H13 V3 L8 4 V12 L13 13 V15 H1 V13 L6 12 V4 L1 3 Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Garanties
// ---------------------------------------------------------------------
export function Garanties() {
  const g = [
    { icon: ShieldCheck, t: 'Qualité contrôlée', d: 'Des produits conformes aux normes de construction.' },
    { icon: Ruler, t: 'Selon votre plan', d: 'Quantités et longueurs préparées pour votre chantier.' },
    { icon: Truck, t: 'Livraison partout', d: 'Chargé à Bassinko, livré sur votre chantier.' },
    { icon: Headset, t: 'Conseil technique', d: 'Une équipe pour chiffrer vos quantités avec vous.' },
  ];
  return (
    <section className="border-b border-[#D6DAE1] bg-white">
      <div className="mx-auto grid max-w-[1240px] sm:grid-cols-2 lg:grid-cols-4">
        {g.map(({ icon: Icon, t, d }, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            className="group flex gap-4 border-b border-[#D6DAE1] px-5 py-8 transition-colors hover:bg-[#0B1B3D] sm:px-8 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <Icon size={26} className="mt-0.5 shrink-0 text-[#FF6B00]" />
            <div>
              <p className="text-lg font-semibold transition-colors group-hover:text-white" style={{ fontStretch: '110%' }}>{t}</p>
              <p className="pm-petit mt-1 text-[#566174] transition-colors group-hover:text-[#C4CBD8]">{d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Déclaration : le texte s'allume au défilement, puis chiffres et engagements
// ---------------------------------------------------------------------
export function Declaration() {
  const chiffres = [
    { v: '10+', l: "années d'activité" },
    { v: '500+', l: 'projets livrés' },
    { v: '300+', l: 'clients, entreprises et particuliers' },
    { v: '100 %', l: 'du territoire couvert' },
  ];
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className={CONTENEUR}>
        <TexteScroll
          className="pm-enonce max-w-[60rem] !text-[clamp(1.9rem,3.6vw,3.2rem)] !leading-[1.15]"
          texte="Depuis plus de dix ans, OA Métal Industrie fournit l'acier des chantiers burkinabè, de la maison individuelle aux ouvrages des entreprises du BTP. Des produits contrôlés, des prix clairs et des délais tenus."
        />
        <dl className="mt-24 grid grid-cols-2 border-t border-[#D6DAE1] lg:grid-cols-4">
          {chiffres.map((c, i) => (
            <motion.div
              key={c.l}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="flex flex-col-reverse border-b border-[#D6DAE1] py-8 pr-6 lg:border-b-0"
            >
              <dt className="pm-petit mt-3 text-[#566174]">{c.l}</dt>
              <dd className="font-display text-[clamp(3rem,5.6vw,5.5rem)] font-extrabold leading-none text-[#0B1B3D]">
                <Compteur valeur={c.v} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Catalogue en grille (proposition 1), typographie premium
// ---------------------------------------------------------------------
export function Catalogue() {
  return (
    <section className="bg-[#EEF0F2] py-24 lg:py-32">
      <div className={CONTENEUR}>
        <div className="grid gap-6 lg:grid-cols-12">
          <Titre className="pm-h2 lg:col-span-7">Six familles de produits, un seul interlocuteur.</Titre>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pm-corps text-[#566174] lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            Gros œuvre, couverture, construction métallique : commandez l'ensemble de votre chantier en une fois, livré ensemble.
          </motion.p>
        </div>

        <div className="mt-14 grid border-l border-t border-[#C9CFD8] sm:grid-cols-2 lg:grid-cols-3">
          {CATALOGUE.map((p, i) => (
            <motion.div
              key={p.titre}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: EASE }}
            >
              <Link to="/produits" className="group relative flex h-full flex-col overflow-hidden border-b border-r border-[#C9CFD8] bg-white p-6">
                {/* Remplissage bleu nuit qui monte au survol */}
                <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-[#0B1B3D] transition-transform duration-500 ease-out group-hover:scale-y-100" />
                <span className="relative flex items-start justify-between">
                  <span className="text-[13px] font-medium text-[#8A93A3] transition-colors group-hover:text-[#FF6B00]">{p.detail}</span>
                  <ArrowUpRight size={20} className="shrink-0 text-[#8A93A3] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FF6B00]" />
                </span>
                <span className="relative my-6 block aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.titre} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span className="relative font-display text-4xl font-extrabold uppercase text-[#0B1B3D] transition-colors group-hover:text-white">
                  {p.titre}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Méthode : grands numéros orange (proposition 1) + ligne liée au défilement
// ---------------------------------------------------------------------
export function Methode() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'center 40%'] });
  const etapes = [
    { t: 'Votre demande', d: 'Quantités, longueurs de tôles ou liste de ferraillage : par WhatsApp, téléphone ou formulaire.' },
    { t: 'Le devis', d: 'Notre service commercial vérifie le stock et vous rappelle avec un prix détaillé.' },
    { t: 'La préparation', d: 'Les produits sont préparés et contrôlés à notre dépôt de Bassinko.' },
    { t: 'La livraison', d: 'Chargement et livraison sur votre chantier, partout au Burkina Faso.' },
  ];
  return (
    <section className="bg-[#0B1B3D] py-24 text-white lg:py-32">
      <div className={CONTENEUR}>
        <Titre className="pm-h2 max-w-[40rem]">De votre demande à votre chantier.</Titre>
        <ol ref={ref} className="relative mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden="true" className="absolute left-0 right-0 top-0 hidden h-px bg-white/20 lg:block" />
          <motion.span aria-hidden="true" style={{ scaleX: scrollYProgress }} className="absolute left-0 right-0 top-0 hidden h-[3px] origin-left bg-[#FF6B00] lg:block" />
          {etapes.map((e, i) => (
            <motion.li
              key={e.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
              className="lg:pt-8"
            >
              <span className="font-display text-7xl font-extrabold leading-none text-[#FF6B00]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 text-xl font-semibold" style={{ fontStretch: '110%' }}>{e.t}</h3>
              <p className="pm-petit mt-2 max-w-[17rem] text-[#C4CBD8]">{e.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Pied de page : grand slogan animé + colonnes
// ---------------------------------------------------------------------
export function PiedDePage() {
  return (
    <footer className="bg-[#0B1B3D] text-white">
      <div className="border-b border-white/10">
        <div className={`${CONTENEUR} py-16 lg:py-24`}>
          <SloganLettres
            texte="Le métal qui inspire confiance."
            className="font-display text-[clamp(3rem,9vw,8.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
          />
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link to="/devis" className="pm-btn pm-btn-orange">Demander un devis</Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Bonjour ${SITE.nom}, je souhaite un devis pour :`)}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline decoration-white/30 underline-offset-[6px] hover:decoration-white"
            >
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className={`${CONTENEUR} grid gap-12 py-16 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <p className="text-3xl font-semibold tracking-tight" style={{ fontStretch: '125%' }}>OA Métal Industrie</p>
          <p className="pm-corps mt-3 max-w-[22rem] text-[#C4CBD8]">Fourniture de produits métalliques pour le BTP et les particuliers, à Ouagadougou.</p>
        </div>
        <nav className="lg:col-span-2" aria-label="Produits">
          <p className="pm-petit text-[#8A93A3]">Produits</p>
          <ul className="mt-4 space-y-2.5">
            {CATALOGUE.map((c) => <li key={c.titre}><Link to="/produits" className="hover:text-[#FF6B00]">{c.titre}</Link></li>)}
          </ul>
        </nav>
        <nav className="lg:col-span-2" aria-label="Entreprise">
          <p className="pm-petit text-[#8A93A3]">Entreprise</p>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/apropos" className="hover:text-[#FF6B00]">À propos</Link></li>
            <li><Link to="/services" className="hover:text-[#FF6B00]">Services</Link></li>
            <li><Link to="/realisations" className="hover:text-[#FF6B00]">Réalisations</Link></li>
            <li><Link to="/actualites" className="hover:text-[#FF6B00]">Actualités</Link></li>
            <li><Link to="/contact" className="hover:text-[#FF6B00]">Contact</Link></li>
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <p className="pm-petit text-[#8A93A3]">Contact</p>
          <ul className="mt-4 space-y-2.5">
            {SITE.telephones.map((t) => <li key={t.lien}><a href={`tel:${t.lien}`} className="tabular-nums hover:text-[#FF6B00]">{t.affiche}</a></li>)}
            <li><a href={`mailto:${SITE.email}`} className="hover:text-[#FF6B00]">{SITE.email}</a></li>
            <li className="text-[#C4CBD8]">{SITE.adresse.join(', ')}</li>
            <li className="pm-petit text-[#8A93A3]">{SITE.horaires.join(' ; ')}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className={`${CONTENEUR} flex flex-col gap-3 py-6 text-sm text-[#8A93A3] sm:flex-row sm:justify-between`}>
          <p>© {new Date().getFullYear()} OA Métal Industrie. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Mentions légales</a>
            <a href="#" className="hover:text-white">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

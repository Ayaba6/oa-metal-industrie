import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Revele, Compteur } from './Dynamique';
import { Titre } from './Texte';
import Etincelles from './Etincelles';
import { geometrieV } from './geometrieV';
import { PHOTOS } from '../data/photos';
import { useDemande } from '../context/Demande';
import Profil, { PROFILS } from './Profil';
import { SITE, CATALOGUE, FAQ } from '../data/site';

const CONTENEUR = 'mx-auto max-w-[1240px] px-5 sm:px-8';

// ---------------------------------------------------------------------
// Hero : le slogan à gauche, une planche technique à droite.
// ---------------------------------------------------------------------
const FONDS_HERO = [PHOTOS.soudeurPoutres, PHOTOS.charpenteOrange, PHOTOS.meulageEtincelles, PHOTOS.ferBetonPile];
const DUREE_PROFIL = 6000;

export function Hero() {
  const [profil, setProfil] = useState(PROFILS[0].id);
  const [auto, setAuto] = useState(true);
  const [fond, setFond] = useState(0);
  const p = PROFILS.find((x) => x.id === profil);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yFond = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  // Les profils défilent seuls jusqu'à ce que le visiteur en choisisse un.
  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => {
      const k = PROFILS.findIndex((x) => x.id === profil);
      setProfil(PROFILS[(k + 1) % PROFILS.length].id);
    }, DUREE_PROFIL);
    return () => clearTimeout(t);
  }, [auto, profil]);

  useEffect(() => {
    const t = setInterval(() => setFond((n) => (n + 1) % FONDS_HERO.length), 7000);
    return () => clearInterval(t);
  }, []);

  const lignesTitre = ['Le métal', 'qui inspire', 'confiance.'];

  // Largeur de l'écran -> profondeur du V (la même que celle du bandeau)
  const [largeur, setLargeur] = useState(1440);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setLargeur(el.getBoundingClientRect().width || 1440);
    const ro = new ResizeObserver(([e]) => setLargeur(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const { D } = geometrieV(largeur);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[#0B1B3D] text-white"
      style={{
        clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${D}px), 50% 100%, 0 calc(100% - ${D}px))`,
        paddingBottom: D + 24,
      }}
    >
      {/* Photos du dépôt en fond, en fondu et en léger parallaxe */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: yFond }} aria-hidden="true">
        <AnimatePresence>
          <motion.img
            key={FONDS_HERO[fond]}
            src={FONDS_HERO[fond]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 0.75, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1B3D]/95 via-[#0B1B3D]/70 to-[#0B1B3D]/35" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B1B3D]/80 via-transparent to-[#0B1B3D]/40" aria-hidden="true" />
      <Etincelles className="absolute inset-0 -z-[5] h-full w-full" />

      {/* Chevrons parallèles au V : ils se dessinent puis respirent */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -z-[4] w-full"
        style={{ bottom: 0, height: D + 160 }}
        viewBox={`0 0 1000 ${D + 160}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="oa-chevron" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FF6B00" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FF6B00" stopOpacity="1" />
            <stop offset="1" stopColor="#FF6B00" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[52, 92, 132].map((decalage, i) => (
          <motion.polyline
            key={decalage}
            points={`0 ${160 - decalage} 500 ${D + 160 - decalage} 1000 ${160 - decalage}`}
            fill="none"
            stroke="url(#oa-chevron)"
            strokeWidth={i === 0 ? 2 : 1.25}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.75 - i * 0.2, 0.35 - i * 0.08, 0.75 - i * 0.2] }}
            transition={{
              pathLength: { duration: 1.6, delay: 0.8 + i * 0.2, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 4, delay: 0.8 + i * 0.2, repeat: Infinity, repeatType: 'mirror' },
            }}
          />
        ))}
      </svg>

      <div className={`${CONTENEUR} grid gap-14 pb-20 pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-24`}>
        <div className="flex flex-col justify-center lg:col-span-6">
          <h1 className="pm-display" aria-label="Le métal qui inspire confiance.">
            {lignesTitre.map((l, k) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
                <motion.span
                  className={`block ${k === lignesTitre.length - 1 ? 'pm-metal' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + k * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="pm-lead mt-8 max-w-[34rem] text-[#C4CBD8]">
            Tôles, fer à béton, tubes et poutrelles IPN pour les entreprises du BTP et les particuliers.
            Stock à Ouagadougou, livraison sur chantier partout au Burkina Faso.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75 }} className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a href="#devis" className="pm-btn pm-btn-orange pm-brillance">Demander un devis</a>
            <a href={`tel:${SITE.telephones[0].lien}`} className="font-medium text-white underline decoration-white/30 underline-offset-[6px] hover:decoration-white">
              Appeler le {SITE.telephones[0].affiche}
            </a>
          </motion.div>
          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.95 }} className="mt-14 grid max-w-[30rem] grid-cols-3 border-t border-white/15 pt-6">
            {[{ v: '10+', l: "ans d'activité" }, { v: '500+', l: 'projets livrés' }, { v: '6', l: 'familles de produits' }].map((c) => (
              <div key={c.l} className="flex flex-col-reverse">
                <dt className="pm-petit mt-2 text-[#8A93A3]">{c.l}</dt>
                <dd className="pm-chiffre pm-resultat"><Compteur valeur={c.v} /></dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.figure initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="lg:col-span-6">
          <div className="pm-quadrillage border border-white/10">
            <div className="px-4 pt-4 sm:px-8 sm:pt-6">
              <Profil id={profil} />
            </div>
            {/* Cartouche, comme sur un plan */}
            <dl className="grid grid-cols-3 border-t border-white/10 text-[13px]">
              <div className="border-r border-white/10 min-h-[84px] px-4 py-3">
                <dt className="text-[#8A93A3]">Désignation</dt>
                <dd className="mt-0.5 font-semibold text-white">{p.nom}</dd>
              </div>
              <div className="border-r border-white/10 min-h-[84px] px-4 py-3">
                <dt className="text-[#8A93A3]">Masse théorique</dt>
                <dd className="mt-0.5 font-semibold tabular-nums text-white">{p.masse}</dd>
              </div>
              <div className="min-h-[84px] px-4 py-3">
                <dt className="text-[#8A93A3]">Usage</dt>
                <dd className="mt-0.5 font-semibold text-white">{p.usage}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choisir un profil">
            {PROFILS.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => { setProfil(x.id); setAuto(false); }}
                aria-pressed={profil === x.id}
                className={`relative overflow-hidden rounded border px-3.5 py-2 text-sm font-medium transition-colors ${
                  profil === x.id ? 'border-white bg-white text-[#0B1B3D]' : 'border-white/25 text-[#C4CBD8] hover:border-white/60 hover:text-white'
                }`}
              >
                {x.nom}
                {auto && profil === x.id && (
                  <motion.span
                    key={x.id}
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#FF6B00]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: DUREE_PROFIL / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
          <figcaption className="pm-petit mt-3 text-[#8A93A3]">
            Exemples de sections. Les autres dimensions sont disponibles sur demande.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
export function Clients() {
  const noms = ['Ecobat Construction', 'BTP Burkina', 'Sogea Satom', 'FM Burkina Faso', 'ZAD Industries'];
  return (
    <section className="border-b border-[#D6DAE1] bg-white">
      <div className={`${CONTENEUR} flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-16`}>
        <p className="pm-petit shrink-0 text-[#566174]">Ils construisent avec nous</p>
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-4">
          {noms.map((n) => (
            <li key={n} className="text-lg font-semibold tracking-tight text-[#8A93A3]" style={{ fontStretch: '125%' }}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Gamme : un index des produits, la photo suit le produit survolé.
// ---------------------------------------------------------------------
export function Gamme() {
  const [actif, setActif] = useState(0);
  const p = CATALOGUE[actif];

  return (
    <section className="bg-[#EEF0F2] py-24 lg:py-32">
      <div className={CONTENEUR}>
        <Revele className="grid gap-6 lg:grid-cols-12">
          <h2 className="pm-h2 lg:col-span-7">Six familles de produits, un seul interlocuteur.</h2>
          <p className="pm-corps text-[#566174] lg:col-span-4 lg:col-start-9 lg:self-end">
            Gros œuvre, couverture, construction métallique : commandez l'ensemble de votre chantier en une fois, livré ensemble.
          </p>
        </Revele>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <figure className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#D6DAE1]">
                <AnimatePresence>
                  <motion.img
                    key={p.image}
                    src={p.image}
                    alt={p.titre}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              </div>
              <figcaption className="pm-petit mt-3 text-[#566174]">{p.titre}, {p.detail.charAt(0).toLowerCase() + p.detail.slice(1)}</figcaption>
            </div>
          </figure>

          <ul className="border-t border-[#C9CFD8] lg:col-span-7">
            {CATALOGUE.map((x, i) => (
              <li key={x.titre} className="border-b border-[#C9CFD8]">
                <Link
                  to="/produits"
                  onMouseEnter={() => setActif(i)}
                  onFocus={() => setActif(i)}
                  className={`group flex items-center gap-5 border-l-2 py-6 pl-5 transition-colors ${actif === i ? 'border-[#FF6B00]' : 'border-transparent'}`}
                >
                  <img src={x.image} alt="" className="h-14 w-20 shrink-0 object-cover lg:hidden" loading="lazy" />
                  <span className="flex-1">
                    <span className={`pm-h3 block transition-colors ${actif === i ? 'text-[#0B1B3D]' : 'text-[#3B4658]'}`}>{x.titre}</span>
                    <span className="pm-petit mt-1 block text-[#566174]">{x.detail}</span>
                  </span>
                  <span className="pm-petit hidden font-medium text-[#0B1B3D] opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100 sm:block">
                    Voir la fiche
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
export function Engagement() {
  const chiffres = [
    { v: '10+', l: "années d'activité" },
    { v: '500+', l: 'projets livrés' },
    { v: '300+', l: 'clients, entreprises et particuliers' },
    { v: '100 %', l: 'du territoire couvert' },
  ];
  const engagements = [
    { t: 'Qualité contrôlée', d: 'Des produits conformes aux normes de construction, vérifiés avant chargement.' },
    { t: 'Prix clairs', d: 'Un devis détaillé, ligne par ligne, avant toute livraison.' },
    { t: 'Stock disponible', d: 'Un stock important à Ouagadougou pour répondre vite.' },
    { t: 'Conseil technique', d: 'Une équipe pour vous aider à chiffrer vos quantités.' },
  ];

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={CONTENEUR}>
        <Revele><p className="pm-enonce max-w-[52rem]">
          Depuis plus de dix ans, OA Métal Industrie fournit l'acier des chantiers burkinabè, de la maison individuelle aux ouvrages
          des entreprises du BTP. Des produits contrôlés, des prix clairs et des délais tenus.
        </p></Revele>

        <dl className="mt-20 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {engagements.map((e, k) => (
            <motion.div
              key={e.t}
              className="relative pt-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: k * 0.1 }}
            >
              <motion.span
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-[#0B1B3D]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 + k * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <dt className="text-lg font-semibold" style={{ fontStretch: '110%' }}>{e.t}</dt>
              <dd className="pm-petit mt-2 text-[#566174]">{e.d}</dd>
            </motion.div>
          ))}
        </dl>

        <dl className="mt-20 grid grid-cols-2 border-t border-[#D6DAE1] lg:grid-cols-4">
          {chiffres.map((c) => (
            <div key={c.l} className="flex flex-col-reverse border-b border-[#D6DAE1] py-8 pr-6 lg:border-b-0">
              <dt className="pm-petit mt-3 text-[#566174]">{c.l}</dt>
              <dd className="pm-chiffre"><Compteur valeur={c.v} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Méthode : une vraie séquence, donc numérotée.
// ---------------------------------------------------------------------
export function Methode() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'center 45%'] });
  const etapes = [
    { t: 'Votre demande', d: 'Quantités, longueurs de tôles ou liste de ferraillage : par WhatsApp, téléphone ou formulaire.' },
    { t: 'Le devis', d: 'Notre service commercial vérifie le stock et vous rappelle avec un prix détaillé.' },
    { t: 'La préparation', d: 'Les produits sont préparés et contrôlés à notre dépôt de Bassinko.' },
    { t: 'La livraison', d: 'Chargement et livraison sur votre chantier, partout au Burkina Faso.' },
  ];
  return (
    <section className="bg-[#0B1B3D] py-24 text-white lg:py-28">
      <div className={CONTENEUR}>
        <Revele><h2 className="pm-h2 max-w-[40rem]">De votre demande à votre chantier.</h2></Revele>
        <ol ref={ref} className="relative mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[19px] hidden h-px bg-white/20 lg:block" />
          <motion.span aria-hidden="true" style={{ scaleX: scrollYProgress }} className="absolute left-0 right-0 top-[19px] hidden h-[2px] origin-left bg-[#FF6B00] lg:block" />
          {etapes.map((e, i) => (
            <motion.li
              key={e.t}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#0B1B3D] text-sm font-semibold tabular-nums">
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl font-semibold" style={{ fontStretch: '110%' }}>{e.t}</h3>
              <p className="pm-petit mt-2 max-w-[17rem] text-[#C4CBD8]">{e.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
const PRODUITS_DEVIS = ['Tôles', 'Fer à béton', 'Tubes', 'IPN', 'Fer attaché', 'Pointes'];
const VOLUMES = ['Je ne sais pas encore', 'Moins de 1 tonne', '1 à 5 tonnes', '5 à 20 tonnes', 'Plus de 20 tonnes'];

export function Devis() {
  const { lignes, retirer } = useDemande();
  const [choix, setChoix] = useState([]);
  const [f, setF] = useState({ nom: '', tel: '', lieu: '', volume: VOLUMES[0], message: '' });
  const maj = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const envoyer = (e) => {
    e.preventDefault();
    const texte =
      `Bonjour ${SITE.nom}, je souhaite un devis.\n` +
      (lignes.length ? `Détail :\n${lignes.map((l, k) => `${k + 1}. ${l.produit} : ${l.detail}`).join('\n')}\n` : '') +
      `Produits : ${choix.join(', ') || 'à préciser'}\nQuantité estimée : ${f.volume}\n` +
      `Nom : ${f.nom}\nTéléphone : ${f.tel}\nChantier : ${f.lieu}` +
      (f.message ? `\nPrécisions : ${f.message}` : '');
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texte)}`, '_blank', 'noopener');
  };

  return (
    <section id="devis" className="scroll-mt-20 bg-[#EEF0F2] py-24 lg:py-32">
      <div className={`${CONTENEUR} grid gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <Titre className="pm-h2">Demandez votre devis.</Titre>
          <p className="pm-corps mt-6 max-w-[28rem] text-[#566174]">
            Indiquez vos produits et vos quantités. Notre service commercial vous rappelle avec un prix détaillé.
          </p>
          <dl className="mt-12 space-y-6">
            {SITE.telephones.map((t) => (
              <div key={t.lien}>
                <dt className="pm-petit text-[#566174]">{t.label}</dt>
                <dd><a href={`tel:${t.lien}`} className="text-xl font-semibold tabular-nums hover:underline">{t.affiche}</a></dd>
              </div>
            ))}
            <div>
              <dt className="pm-petit text-[#566174]">E-mail</dt>
              <dd><a href={`mailto:${SITE.email}`} className="font-medium hover:underline">{SITE.email}</a></dd>
            </div>
            <div>
              <dt className="pm-petit text-[#566174]">Dépôt</dt>
              <dd className="font-medium">{SITE.adresse.join(', ')}</dd>
              <dd className="pm-petit mt-1 text-[#566174]">{SITE.horaires.join(' ; ')}</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={envoyer} className="bg-white p-6 sm:p-10 lg:col-span-7">
          <AnimatePresence initial={false}>
            {lignes.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-8 overflow-hidden">
                <p className="font-semibold">Votre sélection</p>
                <ul className="mt-3 divide-y divide-[#EEF0F2] border-y border-[#EEF0F2]">
                  <AnimatePresence initial={false}>
                    {lignes.map((l) => (
                      <motion.li key={l.id} layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="flex items-start justify-between gap-4 py-3">
                        <span>
                          <span className="block font-medium">{l.produit}</span>
                          <span className="pm-petit block text-[#566174]">{l.detail}</span>
                        </span>
                        <button type="button" onClick={() => retirer(l.id)} className="pm-petit text-[#566174] underline underline-offset-4 hover:text-[#0B1B3D]">Retirer</button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
          <fieldset>
            <legend className="font-semibold">{lignes.length ? 'Autres produits' : 'Produits'}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRODUITS_DEVIS.map((m) => {
                const on = choix.includes(m);
                return (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setChoix((c) => (on ? c.filter((x) => x !== m) : [...c, m]))}
                    className={`rounded border px-3.5 py-2 text-sm font-medium transition-colors ${
                      on ? 'border-[#0B1B3D] bg-[#0B1B3D] text-white' : 'border-[#C9CFD8] text-[#3B4658] hover:border-[#0B1B3D]'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="pm-petit font-medium">Nom ou entreprise</span>
              <input required value={f.nom} onChange={maj('nom')} className="pm-champ mt-1.5" autoComplete="organization" />
            </label>
            <label className="block">
              <span className="pm-petit font-medium">Téléphone</span>
              <input required type="tel" value={f.tel} onChange={maj('tel')} className="pm-champ mt-1.5" autoComplete="tel" />
            </label>
            <label className="block">
              <span className="pm-petit font-medium">Lieu du chantier</span>
              <input required value={f.lieu} onChange={maj('lieu')} className="pm-champ mt-1.5" placeholder="Ville ou quartier" />
            </label>
            <label className="block">
              <span className="pm-petit font-medium">Quantité estimée</span>
              <select value={f.volume} onChange={maj('volume')} className="pm-champ mt-1.5">
                {VOLUMES.map((v) => <option key={v}>{v}</option>)}
              </select>
            </label>
          </div>
          <label className="mt-5 block">
            <span className="pm-petit font-medium">Précisions</span>
            <textarea value={f.message} onChange={maj('message')} rows={4} className="pm-champ mt-1.5" placeholder="Diamètres, longueurs, coloris, délai souhaité…" />
          </label>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="pm-btn pm-btn-orange pm-brillance">Envoyer la demande sur WhatsApp</button>
            <Link to="/devis" className="pm-petit font-medium text-[#0B1B3D] underline underline-offset-4">Formulaire complet</Link>
          </div>
          <p className="pm-petit mt-6 text-[#566174]">Vos informations servent uniquement à établir votre devis.</p>
        </form>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
export function Questions() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={`${CONTENEUR} grid gap-12 lg:grid-cols-12`}>
        <Titre className="pm-h2 lg:col-span-4">Questions fréquentes</Titre>
        <div className="border-t border-[#D6DAE1] lg:col-span-7 lg:col-start-6">
          {FAQ.map((q) => (
            <details key={q.q} className="group border-b border-[#D6DAE1]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden" style={{ fontStretch: '106%' }}>
                {q.q}
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-[#0B1B3D]" />
                  <span className="absolute left-1/2 top-0 h-4 w-px bg-[#0B1B3D] transition-transform group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pm-corps max-w-[40rem] pb-7 text-[#566174]">{q.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
export function PiedDePage() {
  return (
    <footer className="bg-[#0B1B3D] text-white">
      <div className={`${CONTENEUR} grid gap-12 py-20 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <p className="text-3xl font-semibold tracking-tight" style={{ fontStretch: '125%' }}>OA Métal Industrie</p>
          <p className="pm-corps mt-3 text-[#C4CBD8]">Le métal qui inspire confiance.</p>
        </div>
        <nav className="lg:col-span-2" aria-label="Produits">
          <p className="pm-petit text-[#8A93A3]">Produits</p>
          <ul className="mt-4 space-y-2.5">
            {CATALOGUE.map((c) => <li key={c.titre}><Link to="/produits" className="hover:underline">{c.titre}</Link></li>)}
          </ul>
        </nav>
        <nav className="lg:col-span-2" aria-label="Entreprise">
          <p className="pm-petit text-[#8A93A3]">Entreprise</p>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/apropos" className="hover:underline">À propos</Link></li>
            <li><Link to="/services" className="hover:underline">Services</Link></li>
            <li><Link to="/realisations" className="hover:underline">Réalisations</Link></li>
            <li><Link to="/actualites" className="hover:underline">Actualités</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <p className="pm-petit text-[#8A93A3]">Contact</p>
          <ul className="mt-4 space-y-2.5">
            {SITE.telephones.map((t) => <li key={t.lien}><a href={`tel:${t.lien}`} className="tabular-nums hover:underline">{t.affiche}</a></li>)}
            <li><a href={`mailto:${SITE.email}`} className="hover:underline">{SITE.email}</a></li>
            <li className="text-[#C4CBD8]">{SITE.adresse.join(', ')}</li>
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

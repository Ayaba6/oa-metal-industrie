import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Ruler, Weight, MoveHorizontal, ClipboardList, PackageCheck, Truck, ShieldCheck, BadgePercent, Warehouse, Headset, Plus, Minus, Phone, MapPin, Mail, Clock, MessageCircle } from 'lucide-react';
import { SITE, CATALOGUE, REPERES, FAQ, FER } from '../data/site';
import { useDemande } from '../context/Demande';
import { CONTENEUR, EASE, EnTeteSection, Etiquette, TitreAcier, Apparait } from './Communs';
import { PHOTOS as IMAGES } from '../data/photos';

const nf = (n, d = 2) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

// ---------------------------------------------------------------------
// Bandeau incliné qui défile
// ---------------------------------------------------------------------
export function Bandeau() {
  const items = ['Tôles bac & ondulées', 'Fer à béton haute adhérence', 'Tubes carrés', 'Poutrelles IPN', 'Fer attaché & pointes', 'Livraison partout au Burkina'];
  const liste = [...items, ...items];
  return (
    <div className="relative z-10 -mt-6 overflow-hidden py-6" aria-label={items.join(', ')}>
      <div className="ac-bandeau bg-[#FF6B00] py-3.5 text-[#0B1B3D] shadow-[0_20px_40px_-20px_rgba(11,27,61,0.5)]">
        <div className="flex w-max animate-marquee" aria-hidden="true">
          {liste.map((t, i) => (
            <span key={i} className="flex items-center whitespace-nowrap px-7 font-['Barlow_Condensed'] text-2xl font-extrabold uppercase italic tracking-wide">
              {t}
              <span className="ml-14 inline-block h-2.5 w-2.5 rotate-45 bg-[#0B1B3D]" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Quatre cartes d'engagement
// ---------------------------------------------------------------------
export function Engagements() {
  const cartes = [
    { sur: 'Qualité', titre: 'Contrôlée', d: 'Des produits conformes aux normes de construction, vérifiés avant chargement.', c: '#FF6B00' },
    { sur: 'Stock', titre: 'Disponible', d: 'Un stock important à Ouagadougou pour servir vite vos chantiers.', c: '#FFB400' },
    { sur: 'Prix', titre: 'Compétitifs', d: 'Un devis détaillé ligne par ligne, avant toute livraison.', c: '#FF6B00' },
    { sur: 'Livraison', titre: 'Partout', d: 'Chargé à notre dépôt de Bassinko, livré sur votre chantier.', c: '#0B1B3D' },
  ];
  return (
    <section className="bg-[#F3F4F6] pb-12 pt-16">
      <div className={`${CONTENEUR} grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}>
        {cartes.map((c, i) => (
          <motion.div
            key={c.titre}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            className="group relative bg-white p-6 transition-transform duration-500 hover:-translate-y-1.5"
            style={{ borderTop: `4px solid ${c.c}` }}
          >
            <p className="ac-cond text-xs font-bold" style={{ color: c.c === '#0B1B3D' ? '#5F6878' : c.c }}>{c.sur}</p>
            <p className="mt-1 font-['Barlow_Condensed'] text-4xl font-extrabold uppercase leading-none">{c.titre}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#5F6878]">{c.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Notre gamme : six cartes
// ---------------------------------------------------------------------
export function Gamme() {
  return (
    <section id="gamme" className="scroll-mt-24 bg-[#F3F4F6] pb-28 pt-4">
      <div className={CONTENEUR}>
        <EnTeteSection
          etiquette="Notre gamme"
          debut="Six familles"
          accent="de produits"
          texte="Pour le gros œuvre, la couverture et la construction métallique."
          lien={{ to: '/produits', label: 'Voir le catalogue' }}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATALOGUE.map((p, i) => (
            <motion.div
              key={p.titre}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
            >
              <Link
                to="/produits"
                className="group relative flex h-full flex-col overflow-hidden bg-white p-7 shadow-[0_1px_0_#D9DCE1]"
                style={{ borderTop: `4px solid ${i < 3 ? '#FF6B00' : '#0B1B3D'}` }}
              >
                {/* Téléphones et tablettes (pas de survol possible) : la photo est toujours visible */}
                <span className="relative -mx-7 -mt-7 mb-6 block aspect-[16/9] overflow-hidden [@media(hover:hover)]:hidden">
                  <img src={p.image} alt={p.titre} loading="lazy" className="h-full w-full object-cover" />
                </span>
                {/* Ordinateur : la photo apparaît au survol */}
                <span aria-hidden="true" className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:hidden">
                  <img src={p.image} alt="" className="h-full w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-100" />
                  <span className="absolute inset-0 bg-[#0B1B3D]/85" />
                </span>
                <span className={`relative font-['Barlow_Condensed'] text-5xl font-extrabold leading-none transition-colors ${i < 3 ? 'text-[#FF6B00]' : 'text-[#0B1B3D] group-hover:text-white'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative mt-6 font-['Barlow_Condensed'] text-2xl font-bold uppercase transition-colors group-hover:text-white">{p.titre}</span>
                <span className="relative mt-1 text-sm text-[#5F6878] transition-colors group-hover:text-white/75">{p.detail}</span>
                <span className="relative mt-8 flex items-center justify-between">
                  <span className={`ac-cond text-xs font-bold ${i < 3 ? 'text-[#FF6B00]' : 'text-[#0B1B3D] group-hover:text-white'}`}>{REPERES[i]}</span>
                  <ArrowRight size={18} className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#FF6B00]" />
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
// Contrôle à la livraison (section bleu nuit striée, bords cisaillés)
// ---------------------------------------------------------------------
export function Controle() {
  const [d, setD] = useState(10);
  const masse = ((d * d) / 162) * FER.longueur;
  const tol = d <= 8 ? 0.06 : 0.045;
  const points = [
    { code: 'Ø', icon: Ruler, t: 'Le diamètre', d: 'Mesurez la barre au pied à coulisse, hors verrous : le diamètre commandé doit être le diamètre livré.' },
    { code: `${FER.longueur} M`, icon: MoveHorizontal, t: 'La longueur', d: `Nos barres font ${FER.longueur} mètres. Comptez les barres de chaque paquet avant de signer le bon.` },
    { code: 'KG', icon: Weight, t: 'Le poids', d: 'Pesez une barre : un fer sous-dimensionné est trop léger. Le panneau ci-contre donne le poids attendu.' },
  ];

  return (
    <section className="ac-forge ac-cisaille-deux relative">
      <div className={`${CONTENEUR} grid gap-14 lg:grid-cols-12 lg:items-center`}>
        <div className="lg:col-span-6">
          <span className="ac-etiquette-contour text-white"><ShieldCheck size={14} /> La sécurité de vos fondations</span>
          <TitreAcier debut="Vérifiez votre fer" accent="à la livraison." clair className="ac-titre mt-5" />
          <Apparait delai={0.2}>
            <p className="mt-6 max-w-[34rem] leading-relaxed text-white/80">
              Un fer sous-dimensionné ne se voit pas à l'œil nu, il se voit quand la structure travaille. Trois contrôles simples, à faire à chaque livraison, quel que soit votre fournisseur.
            </p>
          </Apparait>
          <ul className="mt-10 space-y-4">
            {points.map((p, i) => (
              <motion.li
                key={p.t}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                className="ac-chanfrein flex gap-5 bg-white p-5 text-[#0B1B3D]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#0B1B3D] font-['Barlow_Condensed'] text-sm font-extrabold text-[#FF6B00]">{p.code}</span>
                <span>
                  <span className="block font-['Barlow_Condensed'] text-xl font-extrabold uppercase">{p.t}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#5F6878]">{p.d}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <Apparait className="lg:col-span-5 lg:col-start-8" delai={0.2}>
          <div className="ac-chanfrein bg-white p-5 text-[#0B1B3D] sm:p-6">
            <div className="flex items-center justify-between border-b-2 border-[#FF6B00] pb-3">
              <span className="ac-cond text-xs font-bold text-[#FF6B00]">Contrôle à la livraison</span>
              <span className="ac-cond text-xs font-bold">Poids d'une barre</span>
            </div>
            <div className="ac-stries relative mt-5 flex flex-col items-center justify-center bg-[#0B1B3D] px-6 py-10 text-white">
              <div className="ac-halo flex h-40 w-40 flex-col items-center justify-center rounded-full border-4 border-[#FFB400] bg-[#FF6B00] text-[#0B1B3D]">
                <span className="font-['Barlow_Condensed'] text-5xl font-extrabold leading-none tabular-nums">
                  <AnimatePresence mode="wait">
                    <motion.span key={d} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="inline-block">{nf(masse, 2)}</motion.span>
                  </AnimatePresence>
                </span>
                <span className="ac-cond mt-1 text-sm font-bold">kg / barre</span>
              </div>
              <p className="ac-cond mt-6 text-center text-xs font-bold text-[#FFB400]">
                HA {d} · {FER.longueur} m · entre {nf(masse * (1 - tol), 2)} et {nf(masse * (1 + tol), 2)} kg
              </p>
            </div>
            <div className="mt-4 grid grid-cols-6 gap-1.5">
              {FER.diametres.map((o) => (
                <button key={o} type="button" aria-pressed={d === o} onClick={() => setD(o)} className="ac-puce py-2 text-sm">Ø{o}</button>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#5F6878]">
              Masse théorique d²/162 kg/m. Tolérance usuelle : ±6 % jusqu'au Ø8, ±4,5 % au-delà.
            </p>
          </div>
        </Apparait>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Chaîne en 4 étapes : les étapes s'activent au fil du défilement
// ---------------------------------------------------------------------
export function Chaine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const [actives, setActives] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActives(Math.min(4, Math.floor(v * 4.2))));
  const largeur = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const etapes = [
    { icon: ClipboardList, t: 'Votre demande', d: 'Quantités, longueurs de tôles ou liste de ferraillage : par WhatsApp, téléphone ou formulaire.' },
    { icon: BadgePercent, t: 'Le devis', d: 'Notre service commercial vérifie le stock et vous rappelle avec un prix détaillé.' },
    { icon: PackageCheck, t: 'La préparation', d: 'Les produits sont préparés et contrôlés à notre dépôt de Bassinko.' },
    { icon: Truck, t: 'La livraison', d: 'Chargement et livraison sur votre chantier, partout au Burkina Faso.' },
  ];

  return (
    <section className="bg-[#F3F4F6] py-28">
      <div className={CONTENEUR}>
        <div className="mx-auto max-w-3xl text-center">
          <Etiquette>De la commande au chantier</Etiquette>
          <TitreAcier debut="Une chaîne" accent="maîtrisée" fin="de bout en bout" className="ac-titre mt-5" />
          <Apparait delai={0.2}>
            <p className="mt-5 leading-relaxed text-[#5F6878]">Demande, devis, préparation, livraison : chaque étape est suivie par nos équipes.</p>
          </Apparait>
        </div>

        <ol ref={ref} className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[27px] hidden h-[3px] bg-[#D9DCE1] lg:block" />
          <motion.span aria-hidden="true" style={{ width: largeur }} className="absolute left-0 top-[27px] hidden h-[3px] bg-[repeating-linear-gradient(90deg,#FF6B00_0_8px,transparent_8px_12px)] lg:block" />
          {etapes.map((e, i) => {
            const on = actives > i;
            const Icon = e.icon;
            return (
              <li key={e.t} className="relative">
                <span className={`ac-chanfrein-sm relative flex h-14 w-14 items-center justify-center font-['Barlow_Condensed'] text-xl font-extrabold transition-colors duration-500 ${on ? 'bg-[#FF6B00] text-[#0B1B3D]' : 'bg-white text-[#8F96A3] ring-1 ring-[#D9DCE1]'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon size={22} className={`mt-6 transition-colors duration-500 ${on ? 'text-[#FF6B00]' : 'text-[#8F96A3]'}`} />
                <h3 className="mt-3 font-['Barlow_Condensed'] text-2xl font-extrabold uppercase">{e.t}</h3>
                <p className="mt-2 max-w-[17rem] text-sm leading-relaxed text-[#5F6878]">{e.d}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Galerie : défilement horizontal épinglé
// ---------------------------------------------------------------------
const PHOTOS = [
  { src: IMAGES.soudeurPoutres, l: 'Charpente métallique en cours de soudure' },
  { src: IMAGES.toleBac, l: 'Tôles bac pour toitures' },
  { src: IMAGES.ferBeton, l: 'Fer à béton haute adhérence' },
  { src: IMAGES.tubes, l: 'Tubes carrés et ronds' },
  { src: IMAGES.chantierPoteaux, l: "Armatures et coffrages d'un immeuble" },
  { src: IMAGES.charpenteOrange, l: 'Charpente en profilés' },
  { src: IMAGES.meulageEtincelles, l: "Découpe et meulage de l'acier" },
  { src: IMAGES.soudureTubes, l: 'Soudure sur tubes carrés' },
];

export function GalerieHorizontale() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${((PHOTOS.length - 1.6) / PHOTOS.length) * 100}%`]);
  const [n, setN] = useState(1);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setN(Math.min(PHOTOS.length, Math.max(1, Math.round(v * (PHOTOS.length - 1)) + 1))));
  const barre = useTransform(scrollYProgress, [0, 1], ['6%', '100%']);

  return (
    <section id="depot" ref={ref} className="relative bg-[#07122A] text-white" style={{ height: `${PHOTOS.length * 45}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <div className={`${CONTENEUR} flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <Etiquette>L'acier en images</Etiquette>
            <TitreAcier debut="Du métal" accent="à l'ouvrage" clair className="ac-titre mt-4 max-w-[14ch]" />
          </div>
          <div className="flex w-full max-w-xs items-center gap-4 font-['Barlow_Condensed'] text-sm font-bold">
            <span className="tabular-nums">{String(n).padStart(2, '0')}</span>
            <span className="relative h-[3px] flex-1 bg-white/15">
              <motion.span style={{ width: barre }} className="absolute inset-y-0 left-0 bg-[#FF6B00]" />
            </span>
            <span className="tabular-nums text-white/50">{String(PHOTOS.length).padStart(2, '0')}</span>
          </div>
        </div>
        <motion.ul style={{ x, paddingLeft: 'max(1.25rem, calc((100vw - 1240px) / 2 + 2rem))' }} className="mt-12 flex w-max gap-6">
          {PHOTOS.map((p, i) => (
            <li key={p.src} className="w-[78vw] shrink-0 sm:w-[30rem]">
              <div className="ac-chanfrein aspect-[4/3] overflow-hidden bg-[#13264F]">
                <img src={p.src} alt={p.l} className="h-full w-full object-cover" loading="eager" decoding="async" />
              </div>
              <p className="mt-3 flex gap-3 text-sm text-white/75">
                <span className="font-['Barlow_Condensed'] font-bold text-[#FF6B00]">{String(i + 1).padStart(2, '0')}</span>
                {p.l}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Équipe : grande photo, citation qui s'allume au défilement, 4 atouts
// ---------------------------------------------------------------------
function MotScroll({ children, progression, debut, fin }) {
  const o = useTransform(progression, [debut, fin], [0.15, 1]);
  return <motion.span style={{ opacity: o }}>{children}</motion.span>;
}

export function Equipe() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] });
  const citation = "Derrière chaque barre et chaque tôle, il y a une équipe burkinabè qui prépare les commandes, contrôle les mesures et charge les camions. C'est elle qui tient nos promesses sur vos chantiers.";
  const mots = citation.split(' ');
  const photo = useRef(null);
  const { scrollYProgress: pPhoto } = useScroll({ target: photo, offset: ['start end', 'end start'] });
  const yPhoto = useTransform(pPhoto, [0, 1], ['-8%', '8%']);

  const atouts = [
    { icon: ShieldCheck, t: 'Qualité garantie', d: 'Des produits conformes aux normes pour des ouvrages durables.' },
    { icon: BadgePercent, t: 'Prix compétitifs', d: 'Des tarifs attractifs pour des matériaux de première qualité.' },
    { icon: Warehouse, t: 'Disponibilité', d: 'Un stock important pour répondre vite à vos besoins.' },
    { icon: Headset, t: 'Conseil technique', d: 'Une équipe à votre écoute pour un accompagnement sur mesure.' },
  ];

  return (
    <section className="overflow-hidden bg-white py-28">
      <div className={CONTENEUR}>
        <motion.figure
          ref={photo}
          className="relative h-[clamp(18rem,45vw,32rem)] overflow-hidden"
          initial={{ clipPath: 'inset(12% 12% 12% 12%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <motion.img style={{ y: yPhoto }} src={IMAGES.equipeChantier} alt="Équipe de chantier en gilets orange et casques" className="absolute -top-[8%] left-0 h-[116%] w-full object-cover" />
          <figcaption className="ac-etiquette absolute bottom-0 left-0 !px-4 !py-2">Des équipes au service de vos chantiers</figcaption>
        </motion.figure>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <p className="ac-cond text-sm font-bold text-[#FF6B00] lg:col-span-3">Des femmes et des hommes</p>
          <blockquote ref={ref} className="lg:col-span-9">
            <p className="font-['Barlow_Condensed'] text-[clamp(1.8rem,3.4vw,3rem)] font-extrabold uppercase leading-[1.05]" aria-label={citation}>
              {mots.map((m, i) => (
                <React.Fragment key={i}>
                  <MotScroll progression={scrollYProgress} debut={i / mots.length} fin={(i + 1) / mots.length}>{m}</MotScroll>{' '}
                </React.Fragment>
              ))}
            </p>
          </blockquote>
        </div>

        <div className="mt-20 grid gap-px bg-[#D9DCE1] sm:grid-cols-2 lg:grid-cols-4">
          {atouts.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="group bg-white p-7 transition-colors duration-500 hover:bg-[#0B1B3D]"
              >
                <Icon size={30} className="text-[#FF6B00] transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 font-['Barlow_Condensed'] text-2xl font-extrabold uppercase transition-colors group-hover:text-white">{a.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5F6878] transition-colors group-hover:text-white/70">{a.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------
export function Questions() {
  const [ouvert, setOuvert] = useState(0);
  return (
    <section id="questions" className="ac-stries-sombres bg-[#F3F4F6] py-28">
      <div className={`${CONTENEUR} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <Etiquette>Vous nous demandez souvent</Etiquette>
          <TitreAcier debut="Questions" accent="fréquentes" className="ac-titre-m mt-5" />
          <Link to="/contact" className="ac-lien mt-6 text-[#0B1B3D]">Une autre question ? <ArrowRight size={16} /></Link>
        </div>
        <div className="border-t border-[#D9DCE1] lg:col-span-8">
          {FAQ.map((q, i) => {
            const actif = ouvert === i;
            return (
              <Apparait key={q.q} delai={i * 0.08} y={20}>
                <div className="border-b border-[#D9DCE1]">
                  <button type="button" onClick={() => setOuvert(actif ? -1 : i)} aria-expanded={actif} className="flex w-full items-center gap-5 py-6 text-left">
                    <span className="font-['Barlow_Condensed'] text-sm font-bold text-[#FF6B00]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 font-['Barlow_Condensed'] text-2xl font-extrabold uppercase">{q.q}</span>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center transition-colors ${actif ? 'bg-[#FF6B00] text-[#0B1B3D]' : 'bg-white text-[#0B1B3D] ring-1 ring-[#D9DCE1]'}`}>
                      {actif ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {actif && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                        <p className="max-w-2xl pb-7 pl-10 leading-relaxed text-[#5F6878]">{q.r}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Apparait>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Devis : section bleu nuit, formulaire en 2 étapes
// ---------------------------------------------------------------------
const MATERIAUX = ['Fer à béton (Ø6 à 16)', 'Tôles bac & ondulées', 'Tubes & IPN', 'Fer attaché & pointes'];
const VOLUMES = ['Je ne sais pas encore', 'Moins de 1 tonne', '1 à 5 tonnes', '5 à 20 tonnes', 'Plus de 20 tonnes'];

export function Devis() {
  const { lignes, retirer } = useDemande();
  const [choix, setChoix] = useState([]);
  const [f, setF] = useState({ nom: '', tel: '', lieu: '', volume: VOLUMES[0], details: '' });
  const maj = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const envoyer = (e) => {
    e.preventDefault();
    const texte =
      `Bonjour ${SITE.nom}, je souhaite un devis.\n` +
      (lignes.length ? `Ma sélection :\n${lignes.map((l, k) => `${k + 1}. ${l.produit} : ${l.detail}`).join('\n')}\n` : '') +
      `Matériaux : ${choix.join(', ') || 'à préciser'}\nQuantité estimée : ${f.volume}\n` +
      `Nom : ${f.nom}\nTéléphone : ${f.tel}\nChantier : ${f.lieu}` +
      (f.details ? `\nDétails : ${f.details}` : '');
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texte)}`, '_blank', 'noopener');
  };

  return (
    <section id="devis" className="ac-forge ac-cisaille-haut relative scroll-mt-10 pb-28">
      <div className={`${CONTENEUR} grid gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <span className="ac-etiquette-contour text-white">Commande directe</span>
          <TitreAcier debut="Un chantier en vue ?" accent="Parlons métal." clair className="ac-titre mt-5" />
          <Apparait delai={0.2}>
            <p className="mt-6 max-w-md leading-relaxed text-white/80">
              Envoyez-nous vos quantités, vos longueurs de tôles ou votre liste de ferraillage. Notre service commercial vous rappelle avec un prix.
            </p>
          </Apparait>
          <ul className="mt-10 space-y-5">
            {SITE.telephones.map((t) => (
              <li key={t.lien} className="flex items-center gap-4">
                <span className="ac-chanfrein-sm flex h-11 w-11 items-center justify-center bg-white/10 text-[#FF6B00]"><Phone size={18} /></span>
                <span>
                  <span className="ac-cond block text-xs font-bold text-white/55">{t.label}</span>
                  <a href={`tel:${t.lien}`} className="font-['Barlow_Condensed'] text-2xl font-extrabold tabular-nums hover:text-[#FF6B00]">{t.affiche}</a>
                </span>
              </li>
            ))}
            <li className="flex items-center gap-4">
              <span className="ac-chanfrein-sm flex h-11 w-11 items-center justify-center bg-white/10 text-[#FF6B00]"><MapPin size={18} /></span>
              <span>
                <span className="ac-cond block text-xs font-bold text-white/55">Dépôt</span>
                <span className="font-semibold">{SITE.adresse.join(', ')}</span>
              </span>
            </li>
          </ul>
        </div>

        <motion.form
          onSubmit={envoyer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
          className="ac-chanfrein bg-white p-6 text-[#0B1B3D] sm:p-10 lg:col-span-7"
        >
          <AnimatePresence initial={false}>
            {lignes.length > 0 && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-8 overflow-hidden">
                <p className="ac-cond text-sm font-bold text-[#FF6B00]">Ma sélection</p>
                <ul className="mt-2 divide-y divide-[#EEF0F3] border-y border-[#EEF0F3]">
                  {lignes.map((l) => (
                    <li key={l.id} className="flex items-start justify-between gap-4 py-3 text-sm">
                      <span><strong className="block">{l.produit}</strong><span className="text-[#5F6878]">{l.detail}</span></span>
                      <button type="button" onClick={() => retirer(l.id)} className="ac-cond text-xs font-bold text-[#5F6878] hover:text-[#FF6B00]">Retirer</button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <fieldset>
            <legend className="flex items-center gap-3 font-['Barlow_Condensed'] text-xl font-extrabold uppercase">
              <span className="ac-chanfrein-sm flex h-8 w-8 items-center justify-center bg-[#FF6B00] text-base">1</span> Matériaux souhaités
            </legend>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {MATERIAUX.map((m) => {
                const on = choix.includes(m);
                return (
                  <button key={m} type="button" aria-pressed={on} onClick={() => setChoix((c) => (on ? c.filter((x) => x !== m) : [...c, m]))} className="ac-puce flex items-center gap-3 px-4 py-3 text-left text-sm">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center border ${on ? 'border-[#0B1B3D] bg-[#0B1B3D] text-white' : 'border-[#D9DCE1]'}`}>{on && '✓'}</span>
                    {m}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-10">
            <legend className="flex items-center gap-3 font-['Barlow_Condensed'] text-xl font-extrabold uppercase">
              <span className="ac-chanfrein-sm flex h-8 w-8 items-center justify-center bg-[#FF6B00] text-base">2</span> Vos coordonnées
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block"><span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">Nom ou entreprise *</span><input required value={f.nom} onChange={maj('nom')} className="ac-champ" autoComplete="organization" /></label>
              <label className="block"><span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">Téléphone *</span><input required type="tel" value={f.tel} onChange={maj('tel')} className="ac-champ" autoComplete="tel" /></label>
              <label className="block"><span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">Ville ou lieu du chantier *</span><input required value={f.lieu} onChange={maj('lieu')} className="ac-champ" /></label>
              <label className="block"><span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">Quantité estimée</span>
                <select value={f.volume} onChange={maj('volume')} className="ac-champ">{VOLUMES.map((v) => <option key={v}>{v}</option>)}</select>
              </label>
            </div>
            <label className="mt-4 block"><span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">Détails de la demande</span>
              <textarea rows={4} value={f.details} onChange={maj('details')} className="ac-champ" placeholder="Diamètres, longueurs, coloris, délai souhaité…" />
            </label>
          </fieldset>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#5F6878]">Vos informations servent uniquement à établir votre devis.</p>
            <button type="submit" className="ac-btn pm-brillance">Envoyer ma demande <ArrowRight size={18} /></button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Pied de page
// ---------------------------------------------------------------------
export function PiedDePage() {
  return (
    <footer className="ac ac-forge relative">
      <div className={`${CONTENEUR} grid gap-12 pb-12 pt-20 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <Link to="/" className="inline-block bg-white p-2"><img src="/logo.jpeg" alt="OA Métal Industrie" className="h-12 w-auto" /></Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
            Tôles, fer à béton, tubes et profilés pour vos chantiers, depuis notre dépôt de Ouagadougou. Le métal qui inspire confiance.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="ac-etiquette">Stock à Ouagadougou</span>
            <span className="ac-etiquette-contour text-white/80">Livraison Burkina</span>
          </div>
        </div>
        <nav className="lg:col-span-2" aria-label="Produits">
          <p className="ac-cond text-sm font-bold text-[#FF6B00]">Produits</p>
          <ul className="mt-5 space-y-2.5 text-sm text-white/80">
            {CATALOGUE.map((c) => <li key={c.titre}><Link to="/produits" className="hover:text-white">{c.titre}</Link></li>)}
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <p className="ac-cond text-sm font-bold text-[#FF6B00]">Dépôt & commercial</p>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-[#FF6B00]" />{SITE.adresse.join(', ')}</li>
            {SITE.telephones.map((t) => <li key={t.lien} className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-[#FF6B00]" /><a href={`tel:${t.lien}`} className="tabular-nums hover:text-white">{t.affiche}</a></li>)}
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0 text-[#FF6B00]" /><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            <li className="flex gap-3"><Clock size={16} className="mt-0.5 shrink-0 text-[#FF6B00]" /><span>{SITE.horaires.join(' · ')}</span></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <div className="ac-chanfrein bg-white/[0.07] p-6 ring-1 ring-white/10">
            <p className="font-['Barlow_Condensed'] text-2xl font-extrabold uppercase">Cotation WhatsApp</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">Envoyez une photo de votre plan ou de votre liste de ferraillage : notre service commercial vous répond avec un prix.</p>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Bonjour ${SITE.nom}, je souhaite un devis pour :`)}`}
              target="_blank"
              rel="noreferrer"
              className="ac-btn mt-5 w-full !whitespace-normal text-center"
            >
              <MessageCircle size={18} className="shrink-0" /> Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className={`${CONTENEUR} flex flex-col gap-3 border-t border-white/10 py-6 font-['Barlow_Condensed'] text-sm font-bold uppercase tracking-wider text-white/60 sm:flex-row sm:justify-between`}>
        <p>© {new Date().getFullYear()} OA Métal Industrie · Tous droits réservés</p>
        <div className="flex gap-6">
          <Link to="/contact" className="hover:text-white">Contact</Link>
          <a href="#" className="hover:text-white">Mentions légales</a>
        </div>
      </div>
    </footer>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useSpring, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, ClipboardList } from 'lucide-react';
import { SITE, FER, TOLES, TUBES } from '../data/site';
import { useDemande } from '../context/Demande';
import { Titre } from './Texte';

const CONTENEUR = 'mx-auto max-w-[1240px] px-5 sm:px-8';
const EASE = [0.22, 1, 0.36, 1];
const nf = (n, d = 2) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

// ---------------------------------------------------------------------
// Apparition au défilement
// ---------------------------------------------------------------------
export function Revele({ children, delai = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: delai, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------
// Compteur animé : "500+" compte de 0 à 500 quand il entre à l'écran
// ---------------------------------------------------------------------
export function Compteur({ valeur }) {
  const ref = useRef(null);
  const vu = useInView(ref, { once: true, amount: 0.6 });
  const m = String(valeur).match(/^(\D*)(\d+)(.*)$/);
  const cible = m ? parseInt(m[2], 10) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!vu || !m) return;
    const c = animate(0, cible, { duration: 1.8, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [vu]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!m) return <span ref={ref}>{valeur}</span>;
  return <span ref={ref}>{m[1]}{vu ? n : 0}{m[3]}</span>;
}

// ---------------------------------------------------------------------
// Intro : une fois par visite
// ---------------------------------------------------------------------
function dejaVu() {
  try { return sessionStorage.getItem('oa-intro-premium') === '1'; } catch { return false; }
}

export function Intro() {
  const [visible, setVisible] = useState(() => !dejaVu());

  useEffect(() => {
    if (!visible) return;
    try { sessionStorage.setItem('oa-intro-premium', '1'); } catch { /* navigation privée */ }
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setVisible(false), 2600);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B1B3D] text-white"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <svg viewBox="0 0 120 140" className="h-24 w-24" aria-hidden="true">
            <motion.path
              d="M20 10 H100 V20 L64 27 V113 L100 120 V130 H20 V120 L56 113 V27 L20 20 Z"
              fill="none"
              stroke="#FF6B00"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
          </svg>
          <div className="mt-8 overflow-hidden">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
              className="pm-h2 text-center"
            >
              OA Métal Industrie
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-3 text-[#C4CBD8]"
          >
            Le métal qui inspire confiance.
          </motion.p>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute bottom-8 right-8 text-sm text-[#8A93A3] underline underline-offset-4 hover:text-white"
          >
            Passer l'intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------
// Barre de progression de lecture (sous l'en-tête)
// ---------------------------------------------------------------------
export function Progression() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-[#FF6B00]" style={{ scaleX: x }} />;
}

// ---------------------------------------------------------------------
// Bandeau défilant
// ---------------------------------------------------------------------
export function Bandeau() {
  const items = ['Tôles bac et ondulées', 'Fer à béton haute adhérence', 'Tubes carrés', 'Poutrelles IPN', 'Fer attaché et pointes', 'Livraison partout au Burkina Faso'];
  const liste = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#0E2147] py-5 text-white" aria-label={items.join(', ')}>
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {liste.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-8 text-xl font-medium" style={{ fontStretch: '115%' }}>
            {t}
            <svg width="14" height="16" viewBox="0 0 14 16" className="ml-16 text-[#FF6B00]" aria-hidden="true">
              <path d="M1 1 H13 V3 L8 4 V12 L13 13 V15 H1 V13 L6 12 V4 L1 3 Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Calculateur : choisir un produit, voir les poids en direct, l'ajouter au devis
// ---------------------------------------------------------------------
function Options({ label, options, valeur, onChange, rendu }) {
  return (
    <fieldset>
      <legend className="pm-petit font-medium text-[#566174]">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = valeur === o;
          return (
            <button
              key={String(o)}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o)}
              className={`relative rounded border px-3.5 py-2 text-sm font-medium tabular-nums transition-colors ${
                on ? 'border-[#0B1B3D] text-white' : 'border-[#C9CFD8] text-[#3B4658] hover:border-[#0B1B3D]'
              }`}
            >
              {on && <motion.span layoutId={`fond-${label}`} className="absolute inset-0 rounded-[3px] bg-[#0B1B3D]" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
              <span className="relative">{rendu ? rendu(o) : o}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Resultat({ label, valeur }) {
  return (
    <div className="border-t border-white/15 pt-4">
      <p className="pm-petit text-[#8A93A3]">{label}</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={valeur}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="pm-chiffre pm-resultat mt-2 text-white"
        >
          {valeur}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function ChampQte({ label, valeur, onChange, unite }) {
  return (
    <label className="block">
      <span className="pm-petit font-medium text-[#566174]">{label}</span>
      <span className="mt-1.5 flex items-center rounded border border-[#C9CFD8] bg-white focus-within:border-[#0B1B3D]">
        <input type="number" min="0" step="any" inputMode="decimal" value={valeur} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent px-3 py-3 text-lg font-semibold tabular-nums focus:outline-none" />
        <span className="px-3 text-sm text-[#566174]">{unite}</span>
      </span>
    </label>
  );
}

export function Calculateur() {
  const { ajouter } = useDemande();
  const [onglet, setOnglet] = useState('fer');
  const [ajoute, setAjoute] = useState(false);

  // Fer à béton : masse linéique = d² / 162
  const [d, setD] = useState(10);
  const [barres, setBarres] = useState('100');
  // Tôles
  const [type, setType] = useState(TOLES.types[0]);
  const [couleur, setCouleur] = useState(TOLES.couleurs[0]);
  const [epT, setEpT] = useState(TOLES.epaisseurs[1]);
  const [longueur, setLongueur] = useState('4');
  const [nbT, setNbT] = useState('20');
  // Tubes : acier 7 850 kg/m³
  const [section, setSection] = useState(TUBES.sections[2]);
  const [epTu, setEpTu] = useState(TUBES.epaisseurs[2]);
  const [nbTu, setNbTu] = useState('10');

  let resultats = [];
  let ligne = null;
  if (onglet === 'fer') {
    const kgm = (d * d) / 162;
    const kgBarre = kgm * FER.longueur;
    const n = parseFloat(barres) || 0;
    resultats = [
      { l: 'Masse linéique', v: `${nf(kgm, 3)} kg/m` },
      { l: `Barre de ${FER.longueur} m`, v: `${nf(kgBarre, 1)} kg` },
      { l: 'Poids total', v: `${nf((n * kgBarre) / 1000, 2)} t` },
    ];
    if (n > 0) ligne = { produit: `Fer à béton HA ${d}`, detail: `${n} barres de ${FER.longueur} m (≈ ${nf((n * kgBarre) / 1000, 2)} t)` };
  } else if (onglet === 'toles') {
    const L = parseFloat(longueur) || 0;
    const N = parseInt(nbT, 10) || 0;
    resultats = [
      { l: 'Nombre de tôles', v: `${N}` },
      { l: 'Longueur unitaire', v: `${nf(L, 2)} m` },
      { l: 'Total linéaire', v: `${nf(L * N, 1)} m` },
    ];
    if (L > 0 && N > 0) ligne = { produit: `${type} ${couleur.nom.toLowerCase()}`, detail: `${epT}, ${N} tôles de ${nf(L, 2)} m` };
  } else {
    const [a, b] = section.split('×').map(Number);
    const kgm = ((2 * (a + b) - 4 * epTu) * epTu * 7.85) / 1000;
    const kgBarre = kgm * TUBES.longueur;
    const N = parseInt(nbTu, 10) || 0;
    resultats = [
      { l: 'Masse linéique', v: `${nf(kgm, 2)} kg/m` },
      { l: `Barre de ${TUBES.longueur} m`, v: `${nf(kgBarre, 1)} kg` },
      { l: 'Poids total', v: `${nf(N * kgBarre, 0)} kg` },
    ];
    if (N > 0) ligne = { produit: `Tube ${section}`, detail: `ép. ${nf(epTu, 1)} mm, ${N} barres de ${TUBES.longueur} m` };
  }

  const ajouterLigne = () => {
    if (!ligne) return;
    ajouter(ligne, false);
    setAjoute(true);
    setTimeout(() => setAjoute(false), 1800);
  };

  const ONGLETS = [
    { id: 'fer', l: 'Fer à béton' },
    { id: 'toles', l: 'Tôles' },
    { id: 'tubes', l: 'Tubes' },
  ];

  return (
    <section id="calculateur" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className={CONTENEUR}>
        <div className="grid gap-6 lg:grid-cols-12">
          <Titre className="pm-h2 lg:col-span-7">Calculez votre besoin, ajoutez-le à votre devis.</Titre>
          <p className="pm-corps text-[#566174] lg:col-span-4 lg:col-start-9 lg:self-end">
            Choisissez un diamètre, une section ou des longueurs : les poids se calculent en direct.
          </p>
        </div>

        <Revele delai={0.1} className="mt-14">
          <div className="flex gap-8 border-b border-[#D6DAE1]" role="tablist">
            {ONGLETS.map((o) => (
              <button
                key={o.id}
                type="button"
                role="tab"
                aria-selected={onglet === o.id}
                onClick={() => setOnglet(o.id)}
                className={`relative pb-4 text-lg font-semibold transition-colors ${onglet === o.id ? 'text-[#0B1B3D]' : 'text-[#8A93A3] hover:text-[#0B1B3D]'}`}
                style={{ fontStretch: '110%' }}
              >
                {o.l}
                {onglet === o.id && <motion.span layoutId="onglet-calc" className="absolute -bottom-px left-0 right-0 h-[3px] bg-[#FF6B00]" />}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={onglet}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3 }}
                className="space-y-7 py-10 lg:col-span-7 lg:pr-14"
              >
                {onglet === 'fer' && (
                  <>
                    <Options label="Diamètre (mm)" options={FER.diametres} valeur={d} onChange={setD} rendu={(o) => `HA ${o}`} />
                    <ChampQte label={`Nombre de barres de ${FER.longueur} m`} valeur={barres} onChange={setBarres} unite="barres" />
                  </>
                )}
                {onglet === 'toles' && (
                  <>
                    <Options label="Type" options={TOLES.types} valeur={type} onChange={setType} />
                    <fieldset>
                      <legend className="pm-petit font-medium text-[#566174]">Coloris : <span className="text-[#0B1B3D]">{couleur.nom}</span></legend>
                      <div className="mt-2 flex flex-wrap gap-3">
                        {TOLES.couleurs.map((c) => (
                          <button
                            key={c.nom}
                            type="button"
                            aria-label={c.nom}
                            aria-pressed={couleur.nom === c.nom}
                            onClick={() => setCouleur(c)}
                            className={`h-10 w-10 rounded-full transition-transform ${couleur.nom === c.nom ? 'scale-110 ring-2 ring-[#0B1B3D] ring-offset-2' : 'hover:scale-105'}`}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </fieldset>
                    <Options label="Épaisseur" options={TOLES.epaisseurs} valeur={epT} onChange={setEpT} />
                    <div className="grid grid-cols-2 gap-4">
                      <ChampQte label="Longueur de chaque tôle" valeur={longueur} onChange={setLongueur} unite="m" />
                      <ChampQte label="Nombre de tôles" valeur={nbT} onChange={setNbT} unite="tôles" />
                    </div>
                  </>
                )}
                {onglet === 'tubes' && (
                  <>
                    <Options label="Section (mm)" options={TUBES.sections} valeur={section} onChange={setSection} />
                    <Options label="Épaisseur (mm)" options={TUBES.epaisseurs} valeur={epTu} onChange={setEpTu} rendu={(o) => nf(o, 1)} />
                    <ChampQte label={`Nombre de barres de ${TUBES.longueur} m`} valeur={nbTu} onChange={setNbTu} unite="barres" />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col justify-between gap-8 bg-[#0B1B3D] p-8 text-white lg:col-span-5 lg:p-10">
              <div className="space-y-6">
                {resultats.map((r) => <Resultat key={r.l} label={r.l} valeur={r.v} />)}
              </div>
              <div>
                <button type="button" onClick={ajouterLigne} disabled={!ligne} className="pm-btn pm-btn-orange w-full disabled:cursor-not-allowed disabled:opacity-40">
                  <AnimatePresence mode="wait">
                    <motion.span key={ajoute ? 'ok' : 'non'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                      {ajoute ? 'Ajouté à votre devis' : 'Ajouter à mon devis'}
                    </motion.span>
                  </AnimatePresence>
                </button>
                <p className="pm-petit mt-3 text-[#8A93A3]">Poids théoriques indicatifs. Disponibilité selon le stock.</p>
              </div>
            </div>
          </div>
        </Revele>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Galerie avec compteur
// ---------------------------------------------------------------------
const PHOTOS = [
  { src: '/images/images1.jpg', l: 'Tôles en préparation au dépôt' },
  { src: '/images/tole-bac.jpg', l: 'Tôles bac prêtes à charger' },
  { src: '/images/fer-beton.jpg', l: 'Fer à béton en barres de 12 m' },
  { src: '/images/tube-carre.jpg', l: 'Tubes carrés en stock' },
  { src: '/images/tole-ondulee.jpg', l: 'Tôles ondulées' },
  { src: '/images/ipn.jpg', l: 'Poutrelles IPN' },
  { src: '/images/images.jpg', l: 'Stock de fer à béton' },
  { src: '/images/fer-attache.jpg', l: 'Fer attaché en rouleaux' },
];

export function Galerie() {
  const piste = useRef(null);
  const [i, setI] = useState(0);

  const aller = (n) => {
    const k = (n + PHOTOS.length) % PHOTOS.length;
    const el = piste.current?.children[k];
    if (el) piste.current.scrollTo({ left: el.offsetLeft - piste.current.offsetLeft, behavior: 'smooth' });
    setI(k);
  };

  const onScroll = () => {
    const p = piste.current;
    if (!p) return;
    const w = p.children[0]?.offsetWidth || 1;
    setI(Math.min(PHOTOS.length - 1, Math.round(p.scrollLeft / (w + 24))));
  };

  return (
    <section className="overflow-hidden bg-[#EEF0F2] py-24 lg:py-32">
      <div className={CONTENEUR}>
        <Revele className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Titre className="pm-h2">Au dépôt de Bassinko.</Titre>
          <div className="flex items-center gap-5">
            <span className="tabular-nums text-[#566174]">
              <span className="font-semibold text-[#0B1B3D]">{String(i + 1).padStart(2, '0')}</span> / {String(PHOTOS.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button type="button" onClick={() => aller(i - 1)} aria-label="Photo précédente" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0B1B3D]/30 transition-colors hover:bg-[#0B1B3D] hover:text-white"><ChevronLeft size={20} /></button>
              <button type="button" onClick={() => aller(i + 1)} aria-label="Photo suivante" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0B1B3D]/30 transition-colors hover:bg-[#0B1B3D] hover:text-white"><ChevronRight size={20} /></button>
            </div>
          </div>
        </Revele>
      </div>
      <div
        ref={piste}
        onScroll={onScroll}
        className="pm-piste mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      >
        {PHOTOS.map((p, k) => (
          <figure key={p.src} className="w-[82vw] shrink-0 snap-start sm:w-[460px]">
            <div className="overflow-hidden">
              <img src={p.src} alt={p.l} loading="lazy" className={`aspect-[3/2] w-full object-cover transition-transform duration-700 ${k === i ? 'scale-100' : 'scale-[1.04] opacity-80'}`} />
            </div>
            <figcaption className="pm-petit mt-3 flex gap-3 text-[#566174]">
              <span className="tabular-nums text-[#8A93A3]">{String(k + 1).padStart(2, '0')}</span>
              {p.l}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Bouton flottant : WhatsApp, ou "Ma demande" dès qu'un produit est ajouté
// ---------------------------------------------------------------------
export function BoutonFlottant() {
  const { lignes } = useDemande();
  const n = lignes.length;
  return (
    <AnimatePresence mode="wait">
      {n > 0 ? (
        <motion.a
          key="demande"
          href="#devis"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#0B1B3D] py-3 pl-4 pr-5 text-white shadow-[0_12px_40px_-8px_rgba(11,27,61,0.6)]"
        >
          <ClipboardList size={20} />
          <span className="font-semibold">Ma demande</span>
          <motion.span key={n} initial={{ scale: 1.6 }} animate={{ scale: 1 }} className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#FF6B00] px-1.5 text-sm font-bold tabular-nums text-[#0B1B3D]">
            {n}
          </motion.span>
        </motion.a>
      ) : (
        <motion.a
          key="wa"
          href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Bonjour ${SITE.nom}, je souhaite un devis pour :`)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Écrire sur WhatsApp"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] transition-transform hover:scale-105"
        >
          <MessageCircle size={26} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

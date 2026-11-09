import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Plus, Check } from 'lucide-react';
import { FER, TOLES, TUBES } from '../data/site';
import { useDemande } from '../context/Demande';
import { CONTENEUR, EASE, EnTeteSection, TitreAcier } from './Communs';

const nf = (n, d = 2) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

// ---------------------------------------------------------------------
// Briques communes
// ---------------------------------------------------------------------
function Valeur({ v, className = '' }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={v}
          className={`inline-block ${className}`}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {v}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Stats({ items }) {
  return (
    <dl className="grid grid-cols-3 gap-px bg-[#D9DCE1]">
      {items.map((s) => (
        <div key={s.l} className="bg-white px-4 py-3">
          <dt className="ac-cond text-[11px] font-bold text-[#8F96A3]">{s.l}</dt>
          <dd className="mt-1 font-['Barlow_Condensed'] text-2xl font-extrabold tabular-nums">
            <Valeur v={s.v} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Puces({ label, droite, options, valeur, onChange, rendu, cols }) {
  return (
    <fieldset>
      <div className="mb-2 flex items-center justify-between">
        <legend className="ac-cond text-xs font-bold text-[#5F6878]">{label}</legend>
        {droite && <span className="ac-cond text-xs font-bold text-[#FF6B00]">{droite}</span>}
      </div>
      <div className={cols ? `grid gap-2 ${cols}` : 'flex flex-wrap gap-2'}>
        {options.map((o) => (
          <button
            key={String(o)}
            type="button"
            aria-pressed={valeur === o}
            onClick={() => onChange(o)}
            className="ac-puce px-3.5 py-2 text-sm"
          >
            {rendu ? rendu(o, valeur === o) : o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Champ({ label, valeur, onChange, unite, placeholder }) {
  return (
    <label className="block">
      <span className="ac-cond mb-2 block text-xs font-bold text-[#5F6878]">{label}</span>
      <span className="flex items-stretch border border-[#D9DCE1] bg-white focus-within:border-[#0B1B3D]">
        <input
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={valeur}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3.5 py-3 font-semibold tabular-nums focus:outline-none"
        />
        {unite && <span className="ac-cond flex items-center border-l border-[#D9DCE1] px-3 text-xs font-bold text-[#5F6878]">{unite}</span>}
      </span>
    </label>
  );
}

function BoutonAjout({ ligne }) {
  const { ajouter } = useDemande();
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      disabled={!ligne}
      onClick={() => { ajouter(ligne); setOk(true); setTimeout(() => setOk(false), 1600); }}
      className="ac-btn ac-btn-contour w-full !text-[#0B1B3D] sm:w-auto"
    >
      {ok ? <Check size={18} /> : <Plus size={18} />} {ok ? 'Ajouté à ma demande' : 'Ajouter à ma demande'}
    </button>
  );
}

function Liste({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-sm text-[#3B4658]">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#FF6B00] text-[#0B1B3D]"><Check size={13} strokeWidth={3} /></span>
          {t}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------
// Carte "pilier"
// ---------------------------------------------------------------------
function Pilier({ num, etiquettes, debut, accent, texte, image, legende, children, liste, commander }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease: EASE }}
      className="ac-chanfrein relative overflow-hidden bg-white p-6 sm:p-10 lg:p-14"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -top-6 right-4 select-none font-['Barlow_Condensed'] text-[9rem] font-extrabold leading-none text-[#EEF0F3] sm:text-[13rem]">
        {num}
      </span>

      <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <div className="flex flex-wrap gap-2">
            <span className="ac-etiquette !bg-[#0B1B3D] !text-white">Pilier {num}</span>
            {etiquettes.map((e, i) => (
              <span key={e} className={i === 0 ? 'ac-etiquette' : 'ac-etiquette-contour text-[#5F6878]'}>{e}</span>
            ))}
          </div>
          <TitreAcier as="h3" debut={debut} accent={accent} className="ac-titre mt-5 !text-[clamp(2.4rem,4.6vw,4rem)]" />
          <p className="mt-4 max-w-[36rem] leading-relaxed text-[#5F6878]">{texte}</p>

          <div className="mt-8 space-y-6 border border-[#D9DCE1] bg-[#F3F4F6] p-5 sm:p-6">{children}</div>

          <div className="mt-8"><Liste items={liste} /></div>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a href="#devis" className="ac-btn">{commander} <ArrowRight size={18} /></a>
            <Link to="/produits" className="ac-lien text-[#0B1B3D]">Fiche produit <ArrowUpRight size={16} /></Link>
          </div>
        </div>

        <motion.figure
          className="relative lg:col-span-5"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <div className="ac-chanfrein h-full min-h-[320px] overflow-hidden bg-[#D9DCE1]">
            <img src={image} alt={legende} className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-105" loading="lazy" />
          </div>
          <figcaption className="ac-etiquette absolute bottom-4 left-4">{legende}</figcaption>
        </motion.figure>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------
// 01 — Fer à béton
// ---------------------------------------------------------------------
const USAGES_FER = { 6: 'Étriers, cadres', 8: 'Étriers, chaînages, dalles', 10: 'Poteaux, poutres, semelles', 12: 'Poteaux, poutres, semelles', 14: 'Fondations, ouvrages porteurs', 16: 'Fondations, ouvrages porteurs' };

function ConfigFer() {
  const [d, setD] = useState(10);
  const [mode, setMode] = useState('barres');
  const [qte, setQte] = useState('');
  const kgm = (d * d) / 162;
  const kgBarre = kgm * FER.longueur;
  const q = parseFloat(qte) || 0;
  const conv = mode === 'barres' ? `≈ ${nf((q * kgBarre) / 1000, 2)} t` : `≈ ${Math.ceil((q * 1000) / kgBarre)} barres`;
  const section = (Math.PI * d * d) / 4;

  return (
    <>
      <Puces
        label="Diamètre nominal"
        droite={`Barres de ${FER.longueur} m`}
        options={FER.diametres}
        valeur={d}
        onChange={setD}
        cols="grid-cols-3 sm:grid-cols-6"
        rendu={(o) => (
          <span className="flex flex-col items-center py-1">
            <span className="text-2xl font-extrabold leading-none">Ø{o}</span>
            <span className="mt-1 text-[11px] font-semibold normal-case tracking-normal opacity-80">{nf((o * o) / 162, 3)} kg/m</span>
          </span>
        )}
      />

      {/* La barre dessinée grossit avec le diamètre */}
      <svg viewBox="0 0 600 60" className="w-full" aria-hidden="true">
        <defs>
          <linearGradient id="ac-acier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9AA3B2" />
            <stop offset="0.45" stopColor="#E6E9EE" />
            <stop offset="1" stopColor="#5F6878" />
          </linearGradient>
        </defs>
        <motion.g animate={{ scaleY: d / 16 }} transition={{ duration: 0.5, ease: EASE }}>
          <rect x="0" y="12" width="600" height="36" rx="6" fill="url(#ac-acier)" />
          {Array.from({ length: 30 }, (_, i) => (
            <path key={i} d={`M${10 + i * 20} 12 L${20 + i * 20} 48`} stroke="#5F6878" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          ))}
        </motion.g>
        <text x="8" y="58" className="font-['Barlow_Condensed']" fontSize="11" fontWeight="700" fill="#FF6B00">HA {d}</text>
        <text x="592" y="58" textAnchor="end" className="font-['Barlow_Condensed']" fontSize="11" fontWeight="700" fill="#FF6B00">L {FER.longueur} M</text>
      </svg>

      <Stats
        items={[
          { l: 'Masse linéique', v: `${nf(kgm, 3)} kg/m` },
          { l: `Barre de ${FER.longueur} m`, v: `${nf(kgBarre, 2)} kg` },
          { l: 'Barres par tonne', v: `${Math.floor(1000 / kgBarre)}` },
        ]}
      />
      <p className="text-sm text-[#5F6878]">
        Section <strong className="text-[#0B1B3D]">{nf(section, 1)} mm²</strong> · usage courant : <strong className="text-[#0B1B3D]">{USAGES_FER[d] || 'Ouvrages en béton armé'}</strong>
      </p>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <Champ label="Votre besoin" valeur={qte} onChange={setQte} placeholder="ex. 120" />
        <div className="flex">
          {['barres', 'tonnes'].map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)} className="ac-puce px-4 py-3 text-sm">{m}</button>
          ))}
        </div>
      </div>
      <p className="text-xs text-[#5F6878]">{q > 0 ? `${q} ${mode} ${conv}` : 'Indiquez un nombre de barres ou un tonnage : la conversion se fait toute seule.'}</p>
      <BoutonAjout ligne={q > 0 ? { produit: `Fer à béton HA ${d}`, detail: `${q} ${mode} (${conv})` } : null} />
    </>
  );
}

// ---------------------------------------------------------------------
// 02 — Tôles
// ---------------------------------------------------------------------
function ProfilTole({ couleur, ondulee }) {
  const d = ondulee
    ? 'M0 40 Q 25 10 50 40 T 100 40 T 150 40 T 200 40 T 250 40 T 300 40 T 350 40 T 400 40 T 450 40 T 500 40 T 550 40 T 600 40 V 70 H 0 Z'
    : 'M0 55 H40 L60 20 H100 L120 55 H180 L200 20 H240 L260 55 H320 L340 20 H380 L400 55 H460 L480 20 H520 L540 55 H600 V70 H0 Z';
  return (
    <svg viewBox="0 0 600 70" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ac-reflet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={d} animate={{ fill: couleur }} transition={{ duration: 0.5 }} />
      <path d={d} fill="url(#ac-reflet)" />
    </svg>
  );
}

function ConfigToles() {
  const [type, setType] = useState(TOLES.types[0]);
  const [couleur, setCouleur] = useState(TOLES.couleurs[0]);
  const [finition, setFinition] = useState(TOLES.finitions[0]);
  const [ep, setEp] = useState(TOLES.epaisseurs[1]);
  const [longueur, setLongueur] = useState('');
  const [nombre, setNombre] = useState('');
  const L = parseFloat(longueur) || 0;
  const N = parseInt(nombre, 10) || 0;

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="ac-cond text-xs font-bold text-[#5F6878]">Couleur</span>
        <span className="ac-cond text-xs font-bold text-[#FF6B00]">{couleur.nom}</span>
      </div>
      <ProfilTole couleur={couleur.hex} ondulee={type === 'Tôle ondulée'} />
      <div className="grid grid-cols-5 gap-2">
        {TOLES.couleurs.map((c) => (
          <button
            key={c.nom}
            type="button"
            aria-pressed={couleur.nom === c.nom}
            onClick={() => setCouleur(c)}
            className={`border bg-white p-1.5 transition-colors ${couleur.nom === c.nom ? 'border-[#FF6B00] ring-1 ring-[#FF6B00]' : 'border-[#D9DCE1] hover:border-[#0B1B3D]'}`}
          >
            <span className="block h-8 w-full" style={{ background: `linear-gradient(90deg, ${c.hex} 0 45%, rgba(255,255,255,.35) 50%, ${c.hex} 55%)` }} />
            <span className="ac-cond mt-1.5 block text-[11px] font-bold">{c.nom}</span>
          </button>
        ))}
      </div>
      <Puces label="Type" options={TOLES.types} valeur={type} onChange={setType} />
      <Puces label="Finition" options={TOLES.finitions} valeur={finition} onChange={setFinition} />
      <Puces label="Épaisseur" options={TOLES.epaisseurs} valeur={ep} onChange={setEp} />
      <div className="grid grid-cols-2 gap-3">
        <Champ label="Longueur de chaque tôle" valeur={longueur} onChange={setLongueur} unite="m" placeholder="ex. 4,5" />
        <Champ label="Nombre de tôles" valeur={nombre} onChange={setNombre} unite="tôles" placeholder="ex. 40" />
      </div>
      <p className="text-xs text-[#5F6878]">
        {L > 0 && N > 0 ? `${N} tôles × ${nf(L, 2)} m = ${nf(L * N, 1)} m linéaires` : 'Indiquez la longueur et le nombre de tôles de votre toiture.'}
      </p>
      <BoutonAjout ligne={L > 0 && N > 0 ? { produit: `${type} ${couleur.nom.toLowerCase()}`, detail: `${finition}, ${ep}, ${N} tôles de ${nf(L, 2)} m` } : null} />
    </>
  );
}

// ---------------------------------------------------------------------
// 03 — Tubes
// ---------------------------------------------------------------------
function ConfigTubes() {
  const [section, setSection] = useState(TUBES.sections[2]);
  const [ep, setEp] = useState(TUBES.epaisseurs[2]);
  const [nombre, setNombre] = useState('');
  const [a, b] = section.split('×').map(Number);
  const kgm = ((2 * (a + b) - 4 * ep) * ep * 7.85) / 1000;
  const kgBarre = kgm * TUBES.longueur;
  const N = parseInt(nombre, 10) || 0;
  const k = 1.6; // échelle du dessin
  const t = Math.max(ep * k * 2.2, 3);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-[1fr_150px] sm:items-center">
        <div className="space-y-5">
          <Puces label="Section (mm)" options={TUBES.sections} valeur={section} onChange={setSection} />
          <Puces label="Épaisseur (mm)" options={TUBES.epaisseurs} valeur={ep} onChange={setEp} rendu={(o) => nf(o, 1)} />
        </div>
        <svg viewBox="0 0 150 150" className="mx-auto h-36 w-36" aria-hidden="true">
          <rect
            style={{ x: 75 - (a * k) / 2, y: 70 - (b * k) / 2, width: a * k, height: b * k, strokeWidth: t, transition: 'all .5s cubic-bezier(.16,1,.3,1)' }}
            fill="none"
            stroke="#0B1B3D"
            rx="4"
          />
          <text x="75" y="146" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FF6B00" className="font-['Barlow_Condensed']">{section} × {nf(ep, 1)}</text>
        </svg>
      </div>
      <Stats
        items={[
          { l: `Barre de ${TUBES.longueur} m`, v: `${nf(kgBarre, 1)} kg` },
          { l: 'Masse linéique', v: `${nf(kgm, 2)} kg/m` },
          { l: 'Épaisseur', v: `${nf(ep, 1)} mm` },
        ]}
      />
      <p className="text-xs text-[#5F6878]">Poids théoriques indicatifs (acier 7 850 kg/m³). Disponibilité de chaque épaisseur selon le stock.</p>
      <Champ label={`Nombre de barres de ${TUBES.longueur} m`} valeur={nombre} onChange={setNombre} unite="barres" placeholder="ex. 25" />
      <p className="text-xs text-[#5F6878]">{N > 0 ? `Poids total ≈ ${nf(N * kgBarre, 0)} kg` : 'Le poids total se calcule selon la section et l’épaisseur choisies.'}</p>
      <BoutonAjout ligne={N > 0 ? { produit: `Tube ${section}`, detail: `ép. ${nf(ep, 1)} mm, ${N} barres de ${TUBES.longueur} m` } : null} />
    </>
  );
}

// ---------------------------------------------------------------------
export default function ProduitsPhares() {
  return (
    <section id="produits" className="scroll-mt-24 bg-[#F3F4F6] pb-24 pt-12 lg:pb-32">
      <div className={CONTENEUR}>
        <EnTeteSection
          etiquette="Trois piliers, un seul fournisseur"
          debut="Nos produits"
          accent="phares"
          texte="Fer à béton, tôles et tubes : choisissez un diamètre, une teinte ou une section, la fiche s'adapte et calcule vos poids."
          lien={{ to: '/produits', label: 'Tout le catalogue' }}
        />
        <div className="mt-14 space-y-10">
          <Pilier
            num="01"
            etiquettes={['Haute adhérence', `Barres de ${FER.longueur} m`]}
            debut="Fer à béton"
            accent="haute adhérence"
            texte="Acier de construction à verrous pour renforcer vos structures en béton armé : poteaux, poutres, semelles et dalles. Robuste, ductile et durable."
            image={FER.image}
            legende="Fer à béton haute adhérence"
            liste={[`Diamètres ${FER.diametres[0]} à ${FER.diametres[FER.diametres.length - 1]} mm`, `Barres de ${FER.longueur} m`, 'Livraison groupée avec tôles et tubes']}
            commander="Commander ce diamètre"
          >
            <ConfigFer />
          </Pilier>
          <Pilier
            num="02"
            etiquettes={['Plusieurs coloris', 'Longueur à la commande']}
            debut="Tôles bac"
            accent="& ondulées"
            texte="Pour des toitures solides et durables. Choisissez la couleur, la finition et l'épaisseur, puis indiquez la longueur et le nombre de tôles."
            image={TOLES.image}
            legende="Tôles bac pour toitures"
            liste={[`Épaisseurs ${TOLES.epaisseurs[0]} à ${TOLES.epaisseurs[TOLES.epaisseurs.length - 1]}`, `${TOLES.finitions.join(', ')}`, 'Faîtières et accessoires sur demande']}
            commander="Configurer mes tôles"
          >
            <ConfigToles />
          </Pilier>
          <Pilier
            num="03"
            etiquettes={[`${TUBES.sections.length} sections`, `Barres de ${TUBES.longueur} m`]}
            debut="Tubes"
            accent="métalliques"
            texte="Tubes carrés et rectangulaires pour la charpente légère, les portails, les grilles et le mobilier métallique."
            image={TUBES.image}
            legende="Tubes carrés et ronds"
            liste={[`Du ${TUBES.sections[0]} au ${TUBES.sections[TUBES.sections.length - 1]} mm`, `Épaisseurs ${TUBES.epaisseurs.map((e) => nf(e, 1)).join(' · ')} mm`, 'Livraison groupée avec fer et tôles']}
            commander="Demander le tarif tubes"
          >
            <ConfigTubes />
          </Pilier>
        </div>
      </div>
    </section>
  );
}

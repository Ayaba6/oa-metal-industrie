import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight, Check } from 'lucide-react';
import { FER, TOLES, TUBES } from '../../data/site';
import { useDemande } from '../../context/Demande';

const nf = (n, d = 2) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

// ---------------------------------------------------------------------
// Petits éléments communs
// ---------------------------------------------------------------------
function Choix({ label, options, valeur, onChange, rendu }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={String(o)}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={valeur === o}
            className={`chip ${valeur === o ? 'chip-on' : 'chip-off'}`}
          >
            {rendu ? rendu(o) : o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Stat({ label, valeur }) {
  return (
    <div className="border-l-2 border-industrial-orange pl-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="font-display text-2xl font-bold text-industrial-blue">{valeur}</p>
    </div>
  );
}

function Quantite({ label, valeur, onChange, unite }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">{label}</span>
      <span className="flex items-center border border-gray-300 bg-white focus-within:border-industrial-blue">
        <input
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={valeur}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-2.5 text-base font-semibold text-industrial-blue focus:outline-none"
        />
        {unite && <span className="px-3 text-sm text-gray-500">{unite}</span>}
      </span>
    </label>
  );
}

function BoutonAjout({ onClick, desactive }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      disabled={desactive}
      onClick={() => { onClick(); setOk(true); setTimeout(() => setOk(false), 1500); }}
      className="btn-orange w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
    >
      {ok ? <><Check size={18} /> Ajouté</> : <><Plus size={18} /> Ajouter à ma demande</>}
    </button>
  );
}

// ---------------------------------------------------------------------
// 01 — Fer à béton : masse linéique = d² / 162 (kg/m)
// ---------------------------------------------------------------------
function PanneauFer() {
  const { ajouter } = useDemande();
  const [d, setD] = useState(10);
  const [mode, setMode] = useState('barres');
  const [qte, setQte] = useState('');

  const kgm = (d * d) / 162;
  const kgBarre = kgm * FER.longueur;
  const parTonne = Math.floor(1000 / kgBarre);
  const q = parseFloat(qte) || 0;
  const conversion = mode === 'barres'
    ? `≈ ${nf((q * kgBarre) / 1000, 2)} tonne(s)`
    : `≈ ${Math.ceil((q * 1000) / kgBarre)} barres`;

  return (
    <div className="space-y-6">
      <Choix label="Diamètre (mm)" options={FER.diametres} valeur={d} onChange={setD} rendu={(o) => `Ø ${o}`} />
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Masse" valeur={`${nf(kgm, 3)} kg/m`} />
        <Stat label={`Barre de ${FER.longueur} m`} valeur={`${nf(kgBarre, 1)} kg`} />
        <Stat label="Barres / tonne" valeur={parTonne} />
      </div>
      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
        <Choix label="Je compte en" options={['barres', 'tonnes']} valeur={mode} onChange={setMode} />
        <Quantite label="Votre besoin" valeur={qte} onChange={setQte} unite={mode} />
      </div>
      {q > 0 && <p className="text-sm text-gray-600">{conversion}</p>}
      <BoutonAjout
        desactive={q <= 0}
        onClick={() => ajouter({ produit: `Fer à béton Ø${d}`, detail: `${q} ${mode} (${conversion.replace('≈ ', '≈')})` })}
      />
    </div>
  );
}

// ---------------------------------------------------------------------
// 02 — Tôles : type, coloris, épaisseur, longueur × nombre
// ---------------------------------------------------------------------
function PanneauToles() {
  const { ajouter } = useDemande();
  const [type, setType] = useState(TOLES.types[0]);
  const [couleur, setCouleur] = useState(TOLES.couleurs[0]);
  const [ep, setEp] = useState(TOLES.epaisseurs[1]);
  const [longueur, setLongueur] = useState('');
  const [nombre, setNombre] = useState('');
  const L = parseFloat(longueur) || 0;
  const N = parseInt(nombre, 10) || 0;

  return (
    <div className="space-y-6">
      <Choix label="Type" options={TOLES.types} valeur={type} onChange={setType} />
      <fieldset>
        <legend className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
          Coloris : <span className="text-industrial-blue">{couleur.nom}</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {TOLES.couleurs.map((c) => (
            <button
              key={c.nom}
              type="button"
              onClick={() => setCouleur(c)}
              aria-label={c.nom}
              aria-pressed={couleur.nom === c.nom}
              className={`h-10 w-10 cursor-pointer border-2 transition ${couleur.nom === c.nom ? 'border-industrial-blue ring-2 ring-industrial-orange ring-offset-2' : 'border-white shadow'}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </fieldset>
      <Choix label="Épaisseur" options={TOLES.epaisseurs} valeur={ep} onChange={setEp} />
      <div className="grid grid-cols-2 gap-4">
        <Quantite label="Longueur de chaque tôle" valeur={longueur} onChange={setLongueur} unite="m" />
        <Quantite label="Nombre de tôles" valeur={nombre} onChange={setNombre} unite="tôles" />
      </div>
      {L > 0 && N > 0 && (
        <p className="text-sm text-gray-600">Total : {N} tôles × {nf(L, 2)} m = <strong>{nf(L * N, 2)} m linéaires</strong></p>
      )}
      <BoutonAjout
        desactive={!(L > 0 && N > 0)}
        onClick={() => ajouter({ produit: `${type} ${couleur.nom}`, detail: `${ep} · ${N} tôles de ${nf(L, 2)} m` })}
      />
    </div>
  );
}

// ---------------------------------------------------------------------
// 03 — Tubes carrés / rectangulaires : poids théorique acier 7 850 kg/m³
// ---------------------------------------------------------------------
function PanneauTubes() {
  const { ajouter } = useDemande();
  const [section, setSection] = useState(TUBES.sections[2]);
  const [ep, setEp] = useState(TUBES.epaisseurs[2]);
  const [nombre, setNombre] = useState('');

  const [a, b] = section.split('×').map(Number);
  const kgm = ((2 * (a + b) - 4 * ep) * ep * 7.85) / 1000;
  const kgBarre = kgm * TUBES.longueur;
  const N = parseInt(nombre, 10) || 0;

  return (
    <div className="space-y-6">
      <Choix label="Section (mm)" options={TUBES.sections} valeur={section} onChange={setSection} />
      <Choix label="Épaisseur (mm)" options={TUBES.epaisseurs} valeur={ep} onChange={setEp} rendu={(o) => nf(o, 1)} />
      <div className="grid grid-cols-2 gap-4">
        <Stat label={`Barre de ${TUBES.longueur} m`} valeur={`${nf(kgBarre, 1)} kg`} />
        <Stat label="Masse" valeur={`${nf(kgm, 2)} kg/m`} />
      </div>
      <p className="text-xs text-gray-500">Poids théoriques indicatifs (acier 7 850 kg/m³). Disponibilité selon le stock.</p>
      <Quantite label={`Nombre de barres de ${TUBES.longueur} m`} valeur={nombre} onChange={setNombre} unite="barres" />
      {N > 0 && <p className="text-sm text-gray-600">Poids total ≈ <strong>{nf(N * kgBarre, 0)} kg</strong></p>}
      <BoutonAjout
        desactive={N <= 0}
        onClick={() => ajouter({ produit: `Tube ${section}`, detail: `ép. ${nf(ep, 1)} mm · ${N} barres de ${TUBES.longueur} m` })}
      />
    </div>
  );
}

// ---------------------------------------------------------------------
const PILIERS = [
  { id: 'fer', num: '01', titre: 'Fer à béton', tags: ['Haute adhérence', `Barres de ${FER.longueur} m`], desc: "Acier de construction à verrous pour vos poteaux, poutres et semelles. Choisissez un diamètre : le poids se calcule tout seul.", image: FER.image, Panneau: PanneauFer },
  { id: 'toles', num: '02', titre: 'Tôles bac & ondulées', tags: ['Plusieurs coloris', 'Longueur sur mesure'], desc: "Pour des toitures solides et durables. Indiquez la longueur et le nombre de tôles de votre toiture.", image: TOLES.image, Panneau: PanneauToles },
  { id: 'tubes', num: '03', titre: 'Tubes métalliques', tags: [`Barres de ${TUBES.longueur} m`, 'Carrés & rectangulaires'], desc: "Pour la charpente légère, les portails, les grilles et le mobilier métallique.", image: TUBES.image, Panneau: PanneauTubes },
];

export default function ProduitsPhares() {
  const [actif, setActif] = useState(PILIERS[0].id);
  const p = PILIERS.find((x) => x.id === actif);
  const { Panneau } = p;

  return (
    <section id="produits" className="scroll-mt-20 bg-industrial-light py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Trois piliers, un seul fournisseur</p>
            <h2 className="titre-section mt-4">Nos produits phares</h2>
            <p className="mt-4 text-gray-600">
              Choisissez un diamètre, un coloris ou une section : la fiche s'adapte, puis ajoutez-la à votre demande de devis.
            </p>
          </div>
          <Link to="/produits" className="btn-contour self-start text-industrial-blue hover:bg-industrial-blue hover:text-white lg:self-auto">
            Tout le catalogue <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Onglets numérotés */}
        <div className="grid grid-cols-3 border-b border-gray-300" role="tablist">
          {PILIERS.map((x) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={actif === x.id}
              onClick={() => setActif(x.id)}
              className={`-mb-px cursor-pointer border-b-4 px-2 py-4 text-left transition sm:px-4 ${
                actif === x.id ? 'border-industrial-orange text-industrial-blue' : 'border-transparent text-gray-400 hover:text-industrial-blue'
              }`}
            >
              <span className="block font-display text-sm font-bold">{x.num}</span>
              <span className="block font-display text-lg font-bold uppercase leading-tight sm:text-2xl">{x.titre}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-0 bg-white lg:grid-cols-2"
          role="tabpanel"
        >
          <div className="p-6 sm:p-10">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="bg-industrial-blue px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Pilier {p.num}</span>
              {p.tags.map((t) => (
                <span key={t} className="border border-gray-200 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-600">{t}</span>
              ))}
            </div>
            <h3 className="font-display text-4xl font-extrabold uppercase text-industrial-blue">{p.titre}</h3>
            <p className="mb-8 mt-3 text-gray-600">{p.desc}</p>
            <Panneau />
          </div>
          <div className="relative min-h-[280px] overflow-hidden">
            <img src={p.image} alt={p.titre} className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute right-4 top-2 font-display text-[120px] font-extrabold leading-none text-white/80 mix-blend-overlay">
              {p.num}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

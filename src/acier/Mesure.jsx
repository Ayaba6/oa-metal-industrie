import React, { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { Plus, Minus, Check, ClipboardList } from 'lucide-react';
import { FER, TOLES, TUBES } from '../data/site';
import { useDemande } from '../context/Demande';

// =====================================================================
//  Configurateurs « instruments de mesure » (sur fond bleu nuit) :
//  pied à coulisse pour le diamètre, nuancier en éventail pour la teinte,
//  mètre ruban pour la longueur, gabarits pour les sections de tubes,
//  et un afficheur de pont-bascule pour le poids.
// =====================================================================

const ORANGE = '#FF6B00';
const EASE = [0.16, 1, 0.3, 1];
const nf = (n, d = 2) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

// ---------------------------------------------------------------------
// Briques communes
// ---------------------------------------------------------------------
function Bloc({ n, titre, valeur, children }) {
  return (
    <section className="border-t border-dashed border-white/15 pt-5 first:border-t-0 first:pt-0">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#FF6B00] font-['Barlow_Condensed'] text-sm font-extrabold text-[#0B1B3D]">{n}</span>
        <h4 className="ac-cond flex-1 text-sm font-bold text-white">{titre}</h4>
        {valeur && <span className="font-['Barlow_Condensed'] text-lg font-extrabold text-[#FF6B00]">{valeur}</span>}
      </div>
      {children}
    </section>
  );
}

// Nombre qui défile jusqu'à sa nouvelle valeur
function Tween({ valeur, decimales = 0 }) {
  const [v, setV] = useState(valeur);
  const prec = useRef(valeur);
  useEffect(() => {
    const c = animate(prec.current, valeur, { duration: 0.6, ease: EASE, onUpdate: setV });
    prec.current = valeur;
    return () => c.stop();
  }, [valeur]);
  return <>{nf(v, decimales)}</>;
}

// Afficheur façon pont-bascule
function Afficheur({ titre, valeur, decimales = 0, unite, lignes }) {
  return (
    <div className="relative overflow-hidden bg-[#030915] p-4 ring-1 ring-white/10 sm:p-5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px)' }} />
      <div className="relative flex items-center justify-between">
        <p className="ac-cond text-[11px] font-bold text-white/50">{titre}</p>
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2BD576]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2BD576]" /> Calcul en direct
        </span>
      </div>
      <p className="relative mt-1 font-['Barlow_Condensed'] text-[clamp(2.6rem,6vw,3.6rem)] font-extrabold leading-none text-[#FF6B00] tabular-nums" style={{ textShadow: '0 0 18px rgba(255,107,0,.45)' }}>
        <Tween valeur={valeur} decimales={decimales} />
        <span className="ml-2 text-xl text-[#FF6B00]/70">{unite}</span>
      </p>
      <dl className="relative mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-3">
        {lignes.map((l) => (
          <div key={l.l}>
            <dt className="ac-cond text-[10px] font-bold text-white/45">{l.l}</dt>
            <dd className="font-['Barlow_Condensed'] text-lg font-bold text-white tabular-nums">{l.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// Compteur − / valeur / + avec ajouts rapides
function Compteur({ valeur, onChange, unite, pas = 1, rapides = [10, 50, 100], decimales = 0, label }) {
  const v = parseFloat(valeur) || 0;
  const regler = (x) => onChange(String(Math.max(0, Math.round(x / pas) * pas)));
  return (
    <div>
      <div className="flex items-stretch bg-white/[0.04] ring-1 ring-white/15 focus-within:ring-[#FF6B00]">
        <button type="button" onClick={() => regler(v - pas)} aria-label={`Retirer ${pas}`} className="flex w-12 items-center justify-center text-white/70 transition-colors hover:bg-white/10 hover:text-white">
          <Minus size={18} />
        </button>
        <label className="flex flex-1 items-baseline justify-center gap-2 border-x border-white/10 py-2">
          <span className="sr-only">{label}</span>
          <input
            type="number"
            min="0"
            step={pas}
            inputMode="decimal"
            value={valeur}
            placeholder="0"
            onChange={(e) => onChange(e.target.value)}
            className="w-24 bg-transparent text-center font-['Barlow_Condensed'] text-3xl font-extrabold text-white tabular-nums placeholder:text-white/25 focus:outline-none"
          />
          <span className="ac-cond text-xs font-bold text-white/50">{unite}</span>
        </label>
        <button type="button" onClick={() => regler(v + pas)} aria-label={`Ajouter ${pas}`} className="flex w-12 items-center justify-center text-white/70 transition-colors hover:bg-white/10 hover:text-white">
          <Plus size={18} />
        </button>
      </div>
      {rapides.length > 0 && (
        <div className="mt-2 flex gap-2">
          {rapides.map((r) => (
            <button key={r} type="button" onClick={() => regler(v + r)} className="ac-cond flex-1 py-1.5 text-xs font-bold text-white/60 ring-1 ring-white/10 transition-colors hover:text-[#FF6B00] hover:ring-[#FF6B00]">
              +{nf(r, decimales)}
            </button>
          ))}
          <button type="button" onClick={() => onChange('')} className="ac-cond px-3 py-1.5 text-xs font-bold text-white/40 transition-colors hover:text-white">Effacer</button>
        </div>
      )}
    </div>
  );
}

// Interrupteur à 2 positions (barres / tonnes, bac / ondulée…)
function Bascule({ options, valeur, onChange, id, rendu }) {
  return (
    <div className="relative flex bg-white/[0.04] p-1 ring-1 ring-white/15" role="group">
      {options.map((o) => {
        const on = valeur === o;
        return (
          <button key={o} type="button" aria-pressed={on} onClick={() => onChange(o)} className={`ac-cond relative flex-1 px-3 py-2 text-xs font-bold transition-colors ${on ? 'text-[#0B1B3D]' : 'text-white/60 hover:text-white'}`}>
            {on && <motion.span layoutId={`bascule-${id}`} className="absolute inset-0 bg-[#FF6B00]" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
            <span className="relative flex items-center justify-center gap-2">{rendu ? rendu(o, on) : o}</span>
          </button>
        );
      })}
    </div>
  );
}

function Ajouter({ ligne }) {
  const { ajouter } = useDemande();
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      disabled={!ligne}
      onClick={() => { ajouter(ligne); setOk(true); setTimeout(() => setOk(false), 1600); }}
      className="ac-cond flex w-full items-center justify-center gap-2 py-3.5 text-sm font-bold text-white ring-1 ring-white/30 transition-colors hover:bg-white hover:text-[#0B1B3D] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-white"
    >
      {ok ? <Check size={18} /> : <ClipboardList size={18} />}
      {ok ? 'Ajouté à ma demande' : ligne ? 'Ajouter à ma demande' : 'Indiquez une quantité pour ajouter'}
    </button>
  );
}

// ---------------------------------------------------------------------
// Pied à coulisse : le bec mobile s'écarte selon le diamètre
// ---------------------------------------------------------------------
function PiedACoulisse({ d, diametres, onChange }) {
  const X0 = 34; // zéro de la règle
  const U = 9; // unités par millimètre
  const xb = X0 + d * U;
  const r = (d * U) / 2;
  return (
    <div>
      <svg viewBox="0 0 320 196" className="w-full" role="img" aria-label={`Pied à coulisse réglé sur ${d} millimètres`}>
        <defs>
          <linearGradient id="pac-acier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E6E9EE" />
            <stop offset="1" stopColor="#8F96A3" />
          </linearGradient>
          <pattern id="pac-hachure" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#B54800" strokeWidth="2" />
          </pattern>
        </defs>
        {/* règle */}
        <rect x="14" y="10" width="300" height="26" rx="2" fill="url(#pac-acier)" />
        {Array.from({ length: 31 }, (_, i) => (
          <line key={i} x1={X0 + i * U} x2={X0 + i * U} y1="36" y2={i % 5 === 0 ? 24 : i % 2 === 0 ? 29 : 31} stroke="#0B1B3D" strokeWidth="1" />
        ))}
        {[10, 20, 30].map((m) => (
          <text key={m} x={X0 + m * U} y="20" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0B1B3D">{m}</text>
        ))}
        {/* bec fixe */}
        <path d={`M14 10 H${X0} V190 L${X0 - 8} 182 H14 Z`} fill="url(#pac-acier)" />
        {/* section du fer serrée entre les becs */}
        {[ORANGE, 'url(#pac-hachure)'].map((f, i) => (
          <circle key={i} fill={f} opacity={i ? 0.5 : 1} style={{ cx: X0 + r, cy: 44 + r, r, transition: 'cx .55s cubic-bezier(.16,1,.3,1), cy .55s cubic-bezier(.16,1,.3,1), r .55s cubic-bezier(.16,1,.3,1)' }} />
        ))}
        {/* bec mobile + curseur */}
        <g style={{ transform: `translateX(${xb}px)`, transition: 'transform .55s cubic-bezier(.16,1,.3,1)' }}>
          <path d="M0 36 V190 L8 182 V36 Z" fill="url(#pac-acier)" />
          <rect x="-4" y="4" width="64" height="38" rx="3" fill="#0B1B3D" stroke={ORANGE} strokeWidth="1.5" />
          <rect x="6" y="11" width="46" height="24" rx="2" fill="#030915" />
          <text x="29" y="29" textAnchor="middle" fontSize="15" fontWeight="800" fill={ORANGE} fontFamily="'Barlow Condensed', sans-serif">Ø{d}</text>
        </g>
      </svg>
      <div className="mt-3 grid grid-cols-6 gap-1.5">
        {diametres.map((o) => (
          <button key={o} type="button" aria-pressed={d === o} onClick={() => onChange(o)} className={`py-2 font-['Barlow_Condensed'] text-lg font-extrabold transition-colors ${d === o ? 'bg-[#FF6B00] text-[#0B1B3D]' : 'text-white/70 ring-1 ring-white/15 hover:text-white hover:ring-white/40'}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Nuancier en éventail
// ---------------------------------------------------------------------
function Nuancier({ couleurs, valeur, onChange }) {
  const n = couleurs.length;
  return (
    <div className="relative mx-auto h-48 max-w-[340px]" role="group" aria-label="Couleur de la tôle">
      {couleurs.map((c, i) => {
        const on = valeur.nom === c.nom;
        const angle = (i - (n - 1) / 2) * 17;
        return (
          <button
            key={c.nom}
            type="button"
            aria-pressed={on}
            aria-label={c.nom}
            onClick={() => onChange(c)}
            className="absolute bottom-2 left-1/2 h-36 w-14 origin-bottom -translate-x-1/2 shadow-[0_8px_20px_-6px_rgba(0,0,0,.6)] transition-all duration-500"
            style={{
              transform: `translateX(-50%) rotate(${angle}deg) translateY(${on ? -16 : 0}px) scale(${on ? 1.06 : 1})`,
              zIndex: on ? 20 : 10 - Math.abs(i - (n - 1) / 2),
              background: `linear-gradient(100deg, ${c.hex} 0 38%, rgba(255,255,255,.28) 46%, ${c.hex} 54%)`,
              outline: on ? `2px solid ${ORANGE}` : 'none',
              outlineOffset: 3,
            }}
          >
            {on && (
              <span className="absolute inset-x-0 bottom-0 bg-white py-1.5 text-center">
                <span className="ac-cond block text-[10px] font-bold text-[#0B1B3D]">{c.nom}</span>
              </span>
            )}
            <span className="absolute right-1 top-1 font-['Barlow_Condensed'] text-[10px] font-bold text-white/80">OA</span>
          </button>
        );
      })}
      <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#0B1B3D] ring-2 ring-[#FF6B00]" />
    </div>
  );
}

function IconeProfil({ ondulee, actif }) {
  const d = ondulee ? 'M1 9 Q4 2 7 9 T13 9 T19 9 T25 9' : 'M1 10 H4 L6 3 H9 L11 10 H15 L17 3 H20 L22 10 H25';
  return (
    <svg viewBox="0 0 26 13" className="h-3 w-7" aria-hidden="true">
      <path d={d} fill="none" stroke={actif ? '#0B1B3D' : '#FF6B00'} strokeWidth="1.8" />
    </svg>
  );
}

// ---------------------------------------------------------------------
// Mètre ruban : le ruban sort du boîtier selon la longueur choisie
// ---------------------------------------------------------------------
function MetreRuban({ valeur, onChange, min = 1, max = 12 }) {
  const v = Math.min(max, Math.max(min, parseFloat(valeur) || min));
  const ratio = (v - min) / (max - min);
  return (
    <div>
      <div className="relative h-20 select-none">
        {/* ruban */}
        <div className="absolute left-14 right-2 top-6 h-9">
          <div
            className="relative h-full overflow-hidden bg-[#FFB400]"
            style={{ width: `${Math.max(4, ratio * 100)}%`, transition: 'width .4s cubic-bezier(.16,1,.3,1)' }}
          >
            <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #0B1B3D 0 1px, transparent 1px 8px), repeating-linear-gradient(90deg, #0B1B3D 0 2px, transparent 2px 40px)', backgroundSize: '100% 35%, 100% 70%', backgroundRepeat: 'no-repeat' }} />
            <span className="absolute bottom-0.5 left-2 font-['Barlow_Condensed'] text-[10px] font-bold text-[#0B1B3D]">OA MÉTAL</span>
          </div>
          {/* crochet + valeur au bout du ruban */}
          <div className="absolute top-0 h-full" style={{ left: `${Math.max(4, ratio * 100)}%`, transition: 'left .4s cubic-bezier(.16,1,.3,1)' }}>
            <span className="absolute -top-1 h-11 w-1.5 bg-[#8F96A3]" />
            <span className="absolute -top-7 -translate-x-1/2 whitespace-nowrap bg-[#FF6B00] px-2 py-0.5 font-['Barlow_Condensed'] text-sm font-extrabold text-[#0B1B3D]">
              {nf(v, 2)} m
            </span>
          </div>
        </div>
        {/* boîtier */}
        <div className="absolute left-0 top-2 flex h-16 w-16 items-center justify-center rounded-xl bg-[#0B1B3D] ring-2 ring-[#FF6B00]">
          <span className="h-7 w-7 rounded-full bg-[#030915] ring-2 ring-white/20" />
        </div>
      </div>
      <label className="mt-1 block">
        <span className="sr-only">Longueur de chaque tôle en mètres</span>
        <input
          type="range"
          min={min}
          max={max}
          step="0.05"
          value={v}
          onChange={(e) => onChange(e.target.value)}
          className="w-full accent-[#FF6B00]"
        />
      </label>
      <div className="flex justify-between font-['Barlow_Condensed'] text-xs font-bold text-white/40">
        <span>{min} m</span>
        <span>{(min + max) / 2} m</span>
        <span>{max} m</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 01 — Fer à béton
// ---------------------------------------------------------------------
const USAGES_FER = { 6: 'Étriers, cadres', 8: 'Étriers, chaînages, dalles', 10: 'Poteaux, poutres, semelles', 12: 'Poteaux, poutres, semelles', 14: 'Fondations, ouvrages porteurs', 16: 'Fondations, ouvrages porteurs' };

export function ConfigFer() {
  const [d, setD] = useState(10);
  const [mode, setMode] = useState('barres');
  const [qte, setQte] = useState('');
  const kgm = (d * d) / 162;
  const kgBarre = kgm * FER.longueur;
  const q = parseFloat(qte) || 0;
  const barres = mode === 'barres' ? q : Math.ceil((q * 1000) / kgBarre);
  const tonnes = mode === 'barres' ? (q * kgBarre) / 1000 : q;
  const conv = mode === 'barres' ? `≈ ${nf(tonnes, 2)} t` : `≈ ${barres} barres`;

  return (
    <div className="space-y-5">
      <Bloc n="1" titre="Diamètre" valeur={`HA ${d}`}>
        <PiedACoulisse d={d} diametres={FER.diametres} onChange={setD} />
        <p className="mt-3 text-xs text-white/55">Usage courant : <span className="font-semibold text-white">{USAGES_FER[d] || 'ouvrages en béton armé'}</span></p>
      </Bloc>
      <Bloc n="2" titre="Quantité">
        <Bascule id="fer" options={['barres', 'tonnes']} valeur={mode} onChange={(m) => { setMode(m); setQte(''); }} />
        <div className="mt-3">
          <Compteur valeur={qte} onChange={setQte} unite={mode} label="Quantité" pas={mode === 'barres' ? 1 : 0.5} rapides={mode === 'barres' ? [10, 50, 100] : [1, 5, 10]} />
        </div>
      </Bloc>
      <Afficheur
        titre={q > 0 ? 'Poids total estimé' : `Poids d'une barre de ${FER.longueur} m`}
        valeur={q > 0 ? tonnes * 1000 : kgBarre}
        decimales={q > 0 ? 0 : 2}
        unite="kg"
        lignes={[
          { l: 'Masse linéique', v: `${nf(kgm, 3)} kg/m` },
          { l: q > 0 ? 'Barres' : 'Barres / tonne', v: q > 0 ? `${barres}` : `${Math.floor(1000 / kgBarre)}` },
          { l: 'Tonnage', v: q > 0 ? `${nf(tonnes, 2)} t` : '—' },
        ]}
      />
      <Ajouter ligne={q > 0 ? { produit: `Fer à béton HA ${d}`, detail: `${q} ${mode} (${conv})` } : null} />
    </div>
  );
}

// ---------------------------------------------------------------------
// 02 — Tôles
// ---------------------------------------------------------------------
export function ConfigToles() {
  const [type, setType] = useState(TOLES.types[0]);
  const [couleur, setCouleur] = useState(TOLES.couleurs[0]);
  const [finition, setFinition] = useState(TOLES.finitions[0]);
  const [ep, setEp] = useState(TOLES.epaisseurs[1]);
  const [longueur, setLongueur] = useState('4.5');
  const [nombre, setNombre] = useState('');
  const L = parseFloat(longueur) || 0;
  const N = parseInt(nombre, 10) || 0;

  return (
    <div className="space-y-5">
      <Bloc n="1" titre="Teinte" valeur={couleur.nom}>
        <Nuancier couleurs={TOLES.couleurs} valeur={couleur} onChange={setCouleur} />
      </Bloc>
      <Bloc n="2" titre="Profil, finition, épaisseur">
        <div className="space-y-2">
          <Bascule id="type" options={TOLES.types} valeur={type} onChange={setType} rendu={(o, on) => <><IconeProfil ondulee={o === 'Tôle ondulée'} actif={on} />{o.replace('Tôle ', '')}</>} />
          <Bascule id="finition" options={TOLES.finitions} valeur={finition} onChange={setFinition} />
          <Bascule id="ep" options={TOLES.epaisseurs} valeur={ep} onChange={setEp} />
        </div>
      </Bloc>
      <Bloc n="3" titre="Longueur de chaque tôle" valeur={`${nf(L, 2)} m`}>
        <MetreRuban valeur={longueur} onChange={setLongueur} />
      </Bloc>
      <Bloc n="4" titre="Nombre de tôles">
        <Compteur valeur={nombre} onChange={setNombre} unite="tôles" label="Nombre de tôles" rapides={[5, 10, 20]} />
      </Bloc>
      <Afficheur
        titre="Métrage total"
        valeur={L * N}
        decimales={1}
        unite="m linéaires"
        lignes={[
          { l: 'Tôles', v: `${N}` },
          { l: 'Longueur', v: `${nf(L, 2)} m` },
          { l: 'Épaisseur', v: ep },
        ]}
      />
      <Ajouter ligne={L > 0 && N > 0 ? { produit: `${type} ${couleur.nom.toLowerCase()}`, detail: `${finition}, ${ep}, ${N} tôles de ${nf(L, 2)} m` } : null} />
    </div>
  );
}

// ---------------------------------------------------------------------
// 03 — Tubes
// ---------------------------------------------------------------------
function Gabarit({ section, on }) {
  const [a, b] = section.split('×').map(Number);
  const k = 0.42;
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
      <rect x={20 - (a * k) / 2} y={20 - (b * k) / 2} width={a * k} height={b * k} rx="1.5" fill="none" stroke={on ? '#0B1B3D' : '#FF6B00'} strokeWidth="2.4" />
    </svg>
  );
}

export function ConfigTubes() {
  const [section, setSection] = useState(TUBES.sections[2]);
  const [ep, setEp] = useState(TUBES.epaisseurs[2]);
  const [nombre, setNombre] = useState('');
  const [a, b] = section.split('×').map(Number);
  const kgm = ((2 * (a + b) - 4 * ep) * ep * 7.85) / 1000;
  const kgBarre = kgm * TUBES.longueur;
  const N = parseInt(nombre, 10) || 0;

  return (
    <div className="space-y-5">
      <Bloc n="1" titre="Section" valeur={`${section} mm`}>
        <div className="grid grid-cols-5 gap-1.5">
          {TUBES.sections.map((s) => {
            const on = s === section;
            return (
              <button key={s} type="button" aria-pressed={on} onClick={() => setSection(s)} className={`flex flex-col items-center gap-1 py-2 transition-colors ${on ? 'bg-[#FF6B00] text-[#0B1B3D]' : 'text-white/70 ring-1 ring-white/15 hover:ring-white/40'}`}>
                <Gabarit section={s} on={on} />
                <span className="font-['Barlow_Condensed'] text-xs font-bold">{s}</span>
              </button>
            );
          })}
        </div>
      </Bloc>
      <Bloc n="2" titre="Épaisseur de paroi" valeur={`${nf(ep, 1)} mm`}>
        <div className="grid grid-cols-4 gap-1.5">
          {TUBES.epaisseurs.map((e) => {
            const on = e === ep;
            return (
              <button key={e} type="button" aria-pressed={on} onClick={() => setEp(e)} className={`flex flex-col items-center gap-2 py-2.5 transition-colors ${on ? 'bg-[#FF6B00] text-[#0B1B3D]' : 'text-white/70 ring-1 ring-white/15 hover:ring-white/40'}`}>
                <span className={`block w-8 ${on ? 'bg-[#0B1B3D]' : 'bg-white/60'}`} style={{ height: e * 3 }} />
                <span className="font-['Barlow_Condensed'] text-sm font-bold">{nf(e, 1)}</span>
              </button>
            );
          })}
        </div>
      </Bloc>
      <Bloc n="3" titre={`Barres de ${TUBES.longueur} m`}>
        <Compteur valeur={nombre} onChange={setNombre} unite="barres" label="Nombre de barres" rapides={[5, 10, 25]} />
      </Bloc>
      <Afficheur
        titre={N > 0 ? 'Poids total estimé' : `Poids d'une barre de ${TUBES.longueur} m`}
        valeur={N > 0 ? N * kgBarre : kgBarre}
        decimales={N > 0 ? 0 : 1}
        unite="kg"
        lignes={[
          { l: 'Masse linéique', v: `${nf(kgm, 2)} kg/m` },
          { l: 'Barre', v: `${nf(kgBarre, 1)} kg` },
          { l: 'Barres', v: `${N}` },
        ]}
      />
      <p className="text-[11px] text-white/40">Poids théoriques indicatifs (acier 7 850 kg/m³). Disponibilité selon le stock.</p>
      <Ajouter ligne={N > 0 ? { produit: `Tube ${section}`, detail: `ép. ${nf(ep, 1)} mm, ${N} barres de ${TUBES.longueur} m` } : null} />
    </div>
  );
}

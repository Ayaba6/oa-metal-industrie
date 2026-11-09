import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ArrowRight, ArrowLeft, Send, CheckCircle2, Loader2, Truck, ShieldCheck, Phone, MessageCircle, Trash2 } from 'lucide-react';
import '../acier/acier.css';
import { EnTetePage } from '../acier/Pages';
import { CONTENEUR, EASE } from '../acier/Communs';
import { SITE } from '../data/site';
import { EMAILJS } from '../data/emailjs';
import { CATEGORIES_DEVIS } from '../data/pages';
import { useDemande } from '../context/Demande';

const UNITES = [
  { id: 'barres', l: 'Barres / unités' },
  { id: 'tonnes', l: 'Tonnes' },
  { id: 'bottes', l: 'Bottes / paquets' },
  { id: 'feuilles', l: 'Feuilles' },
  { id: 'rouleaux', l: 'Rouleaux' },
];
const ETAPES = ['Produit', 'Quantité & livraison', 'Coordonnées'];
const VIDE = { category: 'fers', itemDetail: '', quantity: '', unit: 'barres', needDelivery: true, deliveryLocation: '', name: '', phone: '', email: '', notes: '' };

function Libelle({ children }) {
  return <span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">{children}</span>;
}

export default function Devis() {
  const { lignes, retirer, vider } = useDemande();
  const [etape, setEtape] = useState(1);
  const [sens, setSens] = useState(1);
  const [etat, setEtat] = useState('saisie'); // saisie | envoi | envoye | erreur
  const [d, setD] = useState(VIDE);
  const maj = (k) => (e) => setD({ ...d, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const cat = CATEGORIES_DEVIS.find((c) => c.id === d.category);

  const aller = (n) => { setSens(n > etape ? 1 : -1); setEtape(n); window.scrollTo({ top: document.getElementById('formulaire-devis')?.offsetTop - 120, behavior: 'smooth' }); };

  const envoyer = async (e) => {
    e.preventDefault();
    setEtat('envoi');
    const selection = lignes.length ? `\nSélection depuis le site :\n${lignes.map((l, k) => `${k + 1}. ${l.produit} : ${l.detail}`).join('\n')}` : '';
    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.modele,
        {
          name: d.name,
          email: d.email,
          phone: d.phone,
          category: cat ? cat.nom : d.category,
          itemDetail: d.itemDetail,
          quantity: d.quantity,
          unit: d.unit,
          delivery: d.needDelivery ? `Oui - ${d.deliveryLocation || 'Lieu non spécifié'}` : 'Non (retrait au dépôt)',
          notes: (d.notes || 'Aucune remarque particulière') + selection,
        },
        EMAILJS.clePublique
      );
      setEtat('envoye');
    } catch (err) {
      console.error('Envoi EmailJS impossible :', err);
      setEtat('erreur');
    }
  };

  const texteWhatsApp =
    `Bonjour ${SITE.nom}, je souhaite un devis.\n` +
    `${cat?.nom} : ${d.itemDetail}\nQuantité : ${d.quantity} ${d.unit}\n` +
    `Livraison : ${d.needDelivery ? d.deliveryLocation || 'oui' : 'non'}\n` +
    (lignes.length ? `${lignes.map((l, k) => `${k + 1}. ${l.produit} : ${l.detail}`).join('\n')}\n` : '') +
    `${d.name} – ${d.phone}`;

  const variantes = {
    entre: (s) => ({ opacity: 0, x: s * 60 }),
    centre: { opacity: 1, x: 0 },
    sort: (s) => ({ opacity: 0, x: s * -60 }),
  };

  return (
    <div className="ac bg-[#F3F4F6]">
      <EnTetePage
        fil="Devis"
        etiquette="Estimation gratuite"
        debut="Demander"
        accent="un devis"
        texte="Configurez votre liste de matériaux et recevez une cotation précise, avec livraison sur chantier partout au Burkina Faso."
        image="/images/fer-beton.jpg"
      />

      <section id="formulaire-devis" className="py-20 lg:py-28">
        <div className={`${CONTENEUR} grid gap-10 lg:grid-cols-12`}>
          {/* Formulaire */}
          <div className="lg:col-span-8">
            <div className="ac-chanfrein bg-white">
              {/* Indicateur d'étapes */}
              {etat !== 'envoye' && (
                <div className="border-b border-[#EEF0F3] px-6 pt-6 sm:px-10">
                  <ol className="grid grid-cols-3 gap-2">
                    {ETAPES.map((t, i) => {
                      const n = i + 1;
                      const fait = etape > n;
                      const actif = etape === n;
                      return (
                        <li key={t}>
                          <button type="button" disabled={n > etape} onClick={() => aller(n)} className="flex w-full items-center gap-3 text-left disabled:cursor-default">
                            <span className={`ac-chanfrein-sm flex h-10 w-10 shrink-0 items-center justify-center font-['Barlow_Condensed'] text-lg font-extrabold transition-colors duration-500 ${actif || fait ? 'bg-[#FF6B00] text-[#0B1B3D]' : 'bg-[#F3F4F6] text-[#8F96A3]'}`}>
                              {fait ? '✓' : `0${n}`}
                            </span>
                            <span className={`ac-cond hidden text-sm font-bold sm:block ${actif ? 'text-[#0B1B3D]' : 'text-[#8F96A3]'}`}>{t}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                  <div className="relative mt-5 h-[3px] bg-[#EEF0F3]">
                    <motion.span className="absolute inset-y-0 left-0 bg-[#FF6B00]" animate={{ width: `${(etape / 3) * 100}%` }} transition={{ duration: 0.6, ease: EASE }} />
                  </div>
                </div>
              )}

              <div className="overflow-hidden p-6 sm:p-10">
                <AnimatePresence mode="wait" custom={sens}>
                  {etat === 'envoye' ? (
                    <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                      <CheckCircle2 size={60} className="mx-auto text-[#FF6B00]" />
                      <p className="mt-5 font-['Barlow_Condensed'] text-5xl font-extrabold uppercase">Demande transmise</p>
                      <p className="mx-auto mt-3 max-w-md text-[#5F6878]">Votre demande a bien été transmise à notre service commercial. Un devis détaillé vous sera envoyé par e-mail ou WhatsApp.</p>
                      <button type="button" onClick={() => { setEtat('saisie'); setD(VIDE); setEtape(1); vider(); }} className="ac-btn mt-8">Faire une autre demande</button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key={etape}
                      custom={sens}
                      variants={variantes}
                      initial="entre"
                      animate="centre"
                      exit="sort"
                      transition={{ duration: 0.45, ease: EASE }}
                      onSubmit={etape < 3 ? (e) => { e.preventDefault(); aller(etape + 1); } : envoyer}
                      className="space-y-7"
                    >
                      {etape === 1 && (
                        <>
                          <div>
                            <h2 className="font-['Barlow_Condensed'] text-3xl font-extrabold uppercase">Catégorie principale</h2>
                            <p className="mt-1 text-sm text-[#5F6878]">Choisissez le type de produit métallique recherché.</p>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {CATEGORIES_DEVIS.map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                aria-pressed={d.category === c.id}
                                onClick={() => setD({ ...d, category: c.id, itemDetail: '' })}
                                className="ac-puce flex items-center justify-between px-5 py-4 text-left text-base"
                              >
                                {c.nom}
                                <span className={`h-3 w-3 rotate-45 ${d.category === c.id ? 'bg-[#0B1B3D]' : 'bg-[#D9DCE1]'}`} />
                              </button>
                            ))}
                          </div>
                          <div>
                            <Libelle>Références courantes</Libelle>
                            <div className="flex flex-wrap gap-2">
                              {cat.options.map((o) => (
                                <button key={o} type="button" aria-pressed={d.itemDetail === o} onClick={() => setD({ ...d, itemDetail: o })} className="ac-puce px-3.5 py-2 text-sm">{o}</button>
                              ))}
                            </div>
                          </div>
                          <label className="block">
                            <Libelle>Précisions sur le produit (diamètre, référence, nuance) *</Libelle>
                            <input required value={d.itemDetail} onChange={maj('itemDetail')} className="ac-champ" placeholder="Ex. : fer HA 12 mm ou tôle bac épaisseur 0,5 mm" />
                          </label>
                        </>
                      )}

                      {etape === 2 && (
                        <>
                          <div>
                            <h2 className="font-['Barlow_Condensed'] text-3xl font-extrabold uppercase">Quantité & logistique</h2>
                            <p className="mt-1 text-sm text-[#5F6878]">Indiquez les volumes et si vous avez besoin d'une livraison sur chantier.</p>
                          </div>
                          <div className="grid gap-5 sm:grid-cols-2">
                            <label className="block"><Libelle>Quantité estimée *</Libelle><input required value={d.quantity} onChange={maj('quantity')} className="ac-champ" placeholder="Ex. : 150 ou 2" /></label>
                            <div>
                              <Libelle>Unité</Libelle>
                              <div className="flex flex-wrap gap-2">
                                {UNITES.map((u) => <button key={u.id} type="button" aria-pressed={d.unit === u.id} onClick={() => setD({ ...d, unit: u.id })} className="ac-puce px-3 py-2 text-xs">{u.l}</button>)}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            aria-pressed={d.needDelivery}
                            onClick={() => setD({ ...d, needDelivery: !d.needDelivery })}
                            className={`flex w-full items-center gap-4 border p-5 text-left transition-colors ${d.needDelivery ? 'border-[#FF6B00] bg-[#FFF4EC]' : 'border-[#D9DCE1] bg-white'}`}
                          >
                            <span className={`flex h-12 w-12 shrink-0 items-center justify-center ${d.needDelivery ? 'bg-[#FF6B00] text-[#0B1B3D]' : 'bg-[#F3F4F6] text-[#8F96A3]'}`}><Truck size={22} /></span>
                            <span className="flex-1">
                              <span className="block font-['Barlow_Condensed'] text-xl font-extrabold uppercase">J'ai besoin d'une livraison sur mon chantier</span>
                              <span className="text-sm text-[#5F6878]">Sinon, retrait au dépôt de Bassinko.</span>
                            </span>
                            <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${d.needDelivery ? 'bg-[#0B1B3D]' : 'bg-[#D9DCE1]'}`}>
                              <motion.span className="absolute top-1 h-4 w-4 rounded-full bg-white" animate={{ left: d.needDelivery ? 24 : 4 }} />
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {d.needDelivery && (
                              <motion.label initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="block overflow-hidden">
                                <Libelle>Lieu / ville de livraison *</Libelle>
                                <input required value={d.deliveryLocation} onChange={maj('deliveryLocation')} className="ac-champ" placeholder="Ex. : Ouaga 2000 ou Bobo-Dioulasso" />
                              </motion.label>
                            )}
                          </AnimatePresence>
                        </>
                      )}

                      {etape === 3 && (
                        <>
                          <div>
                            <h2 className="font-['Barlow_Condensed'] text-3xl font-extrabold uppercase">Vos coordonnées</h2>
                            <p className="mt-1 text-sm text-[#5F6878]">Où devons-nous vous envoyer votre devis chiffré ?</p>
                          </div>
                          <div className="grid gap-5 sm:grid-cols-2">
                            <label className="block"><Libelle>Nom / entreprise *</Libelle><input required value={d.name} onChange={maj('name')} className="ac-champ" placeholder="Ex. : Jean Kaboré / BTP Faso" autoComplete="organization" /></label>
                            <label className="block"><Libelle>Téléphone / WhatsApp *</Libelle><input required type="tel" value={d.phone} onChange={maj('phone')} className="ac-champ" placeholder="+226 …" autoComplete="tel" /></label>
                          </div>
                          <label className="block"><Libelle>E-mail *</Libelle><input required type="email" value={d.email} onChange={maj('email')} className="ac-champ" placeholder="contact@exemple.com" autoComplete="email" /></label>
                          <label className="block"><Libelle>Remarques (facultatif)</Libelle><textarea rows={4} value={d.notes} onChange={maj('notes')} className="ac-champ" placeholder="Délais souhaités, demandes de coupe sur mesure…" /></label>
                          {etat === 'erreur' && (
                            <p role="alert" className="border-l-4 border-[#FF6B00] bg-[#FFF4EC] p-4 text-sm">
                              L'envoi n'a pas abouti. Réessayez, ou envoyez votre demande sur WhatsApp :{' '}
                              <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texteWhatsApp)}`} target="_blank" rel="noreferrer" className="font-bold underline">ouvrir WhatsApp</a>.
                            </p>
                          )}
                        </>
                      )}

                      <div className="flex flex-col-reverse gap-4 border-t border-[#EEF0F3] pt-6 sm:flex-row sm:items-center sm:justify-between">
                        {etape > 1 ? (
                          <button type="button" onClick={() => aller(etape - 1)} className="ac-lien text-[#0B1B3D]"><ArrowLeft size={16} /> Retour</button>
                        ) : <span />}
                        <button type="submit" disabled={etat === 'envoi'} className="ac-btn pm-brillance">
                          {etape < 3 && <>Continuer <ArrowRight size={18} /></>}
                          {etape === 3 && (etat === 'envoi' ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours…</> : <><Send size={18} /> Envoyer ma demande</>)}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Récapitulatif */}
          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-28">
              <div className="ac-forge ac-chanfrein p-6">
                <p className="ac-etiquette">Récapitulatif</p>
                <dl className="mt-5 space-y-3 text-sm">
                  {[
                    ['Catégorie', cat?.nom],
                    ['Produit', d.itemDetail || '—'],
                    ['Quantité', d.quantity ? `${d.quantity} ${d.unit}` : '—'],
                    ['Livraison', d.needDelivery ? d.deliveryLocation || 'Oui' : 'Retrait au dépôt'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-white/10 pb-3">
                      <dt className="ac-cond text-xs font-bold text-white/55">{k}</dt>
                      <dd className="text-right font-semibold">
                        <AnimatePresence mode="wait"><motion.span key={v} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-block">{v}</motion.span></AnimatePresence>
                      </dd>
                    </div>
                  ))}
                </dl>
                {lignes.length > 0 && (
                  <div className="mt-5">
                    <p className="ac-cond text-xs font-bold text-[#FF6B00]">Ma sélection ({lignes.length})</p>
                    <ul className="mt-2 space-y-2">
                      {lignes.map((l) => (
                        <li key={l.id} className="flex items-start justify-between gap-3 bg-white/[0.06] p-3 text-sm">
                          <span><strong className="block">{l.produit}</strong><span className="text-white/65">{l.detail}</span></span>
                          <button type="button" onClick={() => retirer(l.id)} aria-label={`Retirer ${l.produit}`} className="text-white/50 hover:text-[#FF6B00]"><Trash2 size={15} /></button>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs text-white/50">Cette sélection est jointe à votre demande.</p>
                  </div>
                )}
              </div>

              <div className="bg-white p-6">
                <p className="font-['Barlow_Condensed'] text-2xl font-extrabold uppercase">Plus rapide ?</p>
                <p className="mt-1 text-sm text-[#5F6878]">Appelez notre service commercial ou envoyez une photo de votre liste sur WhatsApp.</p>
                <a href={`tel:${SITE.telephones[0].lien}`} className="mt-4 flex items-center gap-3 font-['Barlow_Condensed'] text-2xl font-extrabold tabular-nums hover:text-[#FF6B00]"><Phone size={20} className="text-[#FF6B00]" /> {SITE.telephones[0].affiche}</a>
                <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Bonjour ${SITE.nom}, je souhaite un devis pour :`)}`} target="_blank" rel="noreferrer" className="ac-btn mt-4 w-full"><MessageCircle size={18} /> WhatsApp</a>
              </div>

              <div className="flex items-start gap-3 p-2 text-sm text-[#5F6878]">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#FF6B00]" />
                Vos informations servent uniquement à établir votre devis.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { SITE } from '../../data/site';

const MATERIAUX = ['Tôles bac / ondulées', 'Fer à béton', 'Tubes carrés', 'IPN', 'Fer attaché & pointes'];
const VOLUMES = ['Je ne sais pas encore', 'Moins de 1 tonne', '1 à 5 tonnes', '5 à 20 tonnes', 'Plus de 20 tonnes'];

// Demande de devis rapide en 2 étapes, envoyée sur WhatsApp.
export default function AppelDevis() {
  const [choix, setChoix] = useState([]);
  const [f, setF] = useState({ nom: '', tel: '', lieu: '', volume: VOLUMES[0], details: '' });
  const maj = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const bascule = (m) => setChoix((c) => (c.includes(m) ? c.filter((x) => x !== m) : [...c, m]));

  const envoyer = (e) => {
    e.preventDefault();
    const texte =
      `Bonjour ${SITE.nom}, je souhaite un devis.\n` +
      `Matériaux : ${choix.join(', ') || 'à préciser'}\n` +
      `Quantité estimée : ${f.volume}\n` +
      `Nom : ${f.nom}\nTéléphone : ${f.tel}\nChantier : ${f.lieu}` +
      (f.details ? `\nDétails : ${f.details}` : '');
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texte)}`, '_blank', 'noopener');
  };

  const champ = 'w-full border border-white/20 bg-white/5 px-3 py-3 text-sm text-white placeholder-white/40 focus:border-industrial-orange focus:outline-none';

  return (
    <section id="devis" className="scroll-mt-20 bg-industrial-ink py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <p className="eyebrow">Commande directe</p>
          <h2 className="titre-section mt-4 !text-white">
            Un chantier en vue ? <span className="text-industrial-orange">Parlons métal.</span>
          </h2>
          <p className="mt-6 text-white/70">
            Envoyez-nous vos quantités, vos longueurs de tôles ou votre liste de ferraillage. Notre service commercial vous rappelle avec un prix.
          </p>
          <ul className="mt-10 space-y-5">
            {SITE.telephones.map((t) => (
              <li key={t.lien} className="flex items-center gap-4">
                <Phone size={18} className="text-industrial-orange" />
                <span>
                  <span className="block text-[11px] uppercase tracking-widest text-white/50">{t.label}</span>
                  <a href={`tel:${t.lien}`} className="text-lg font-bold hover:text-industrial-orange">{t.affiche}</a>
                </span>
              </li>
            ))}
            <li className="flex items-center gap-4">
              <MapPin size={18} className="text-industrial-orange" />
              <span className="text-white/80">{SITE.adresse.join(', ')}</span>
            </li>
          </ul>
        </div>

        <form onSubmit={envoyer} className="space-y-8 border border-white/10 bg-white/[0.03] p-6 sm:p-10 lg:col-span-7">
          <fieldset>
            <legend className="mb-4 flex items-center gap-3 font-display text-xl font-bold uppercase">
              <span className="flex h-7 w-7 items-center justify-center bg-industrial-orange text-sm">1</span> Matériaux souhaités
            </legend>
            <div className="flex flex-wrap gap-2">
              {MATERIAUX.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => bascule(m)}
                  aria-pressed={choix.includes(m)}
                  className={`cursor-pointer border px-3 py-2 text-sm font-semibold transition ${
                    choix.includes(m) ? 'border-industrial-orange bg-industrial-orange text-white' : 'border-white/25 text-white/80 hover:border-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-4 flex items-center gap-3 font-display text-xl font-bold uppercase">
              <span className="flex h-7 w-7 items-center justify-center bg-industrial-orange text-sm">2</span> Vos coordonnées
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required value={f.nom} onChange={maj('nom')} placeholder="Nom ou entreprise *" className={champ} aria-label="Nom ou entreprise" />
              <input required type="tel" value={f.tel} onChange={maj('tel')} placeholder="Téléphone *" className={champ} aria-label="Téléphone" />
              <input required value={f.lieu} onChange={maj('lieu')} placeholder="Ville ou lieu du chantier *" className={champ} aria-label="Lieu du chantier" />
              <select value={f.volume} onChange={maj('volume')} className={`${champ} [&>option]:text-industrial-blue`} aria-label="Quantité estimée">
                {VOLUMES.map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
            <textarea value={f.details} onChange={maj('details')} rows={3} placeholder="Détails de la demande (longueurs, diamètres, quantités…)" className={champ} aria-label="Détails" />
          </fieldset>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/50">Vos informations servent uniquement à établir votre devis.</p>
            <button type="submit" className="btn-orange cursor-pointer whitespace-nowrap">
              <MessageCircle size={18} /> Envoyer sur WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

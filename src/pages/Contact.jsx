import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import '../acier/acier.css';
import { EnTetePage } from '../acier/Pages';
import { CONTENEUR, EASE, Etiquette, TitreAcier } from '../acier/Communs';
import { Questions } from '../acier/Sections';
import { SITE } from '../data/site';
import { EMAILJS } from '../data/emailjs';

const OBJETS = ['Demande de devis', 'Commande de fers à béton', 'Livraison chantier', 'Autre question'];

export default function Contact() {
  const [f, setF] = useState({ nom: '', tel: '', email: '', objet: OBJETS[0], message: '' });
  const [etat, setEtat] = useState('saisie'); // saisie | envoi | envoye | erreur
  const maj = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const texteWhatsApp = `Bonjour ${SITE.nom},\nObjet : ${f.objet}\n${f.message}\n\n${f.nom}${f.tel ? ` – ${f.tel}` : ''}`;

  const envoyer = async (e) => {
    e.preventDefault();
    setEtat('envoi');
    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.modele,
        {
          name: f.nom,
          email: f.email,
          phone: f.tel,
          category: `Message de contact : ${f.objet}`,
          itemDetail: f.message,
          quantity: '-',
          unit: '',
          delivery: '-',
          notes: 'Message envoyé depuis la page Contact du site',
        },
        EMAILJS.clePublique
      );
      setEtat('envoye');
    } catch (err) {
      console.error('Envoi EmailJS impossible :', err);
      setEtat('erreur');
    }
  };

  const cartes = [
    { icon: MapPin, titre: 'Adresse', lignes: SITE.adresse, lien: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Bassinko Station OTAM Ouagadougou')}`, action: 'Itinéraire' },
    { icon: Phone, titre: 'Téléphone / WhatsApp', lignes: SITE.telephones.map((t) => t.affiche), lien: `tel:${SITE.telephones[0].lien}`, action: 'Appeler' },
    { icon: Mail, titre: 'E-mail', lignes: [SITE.email], lien: `mailto:${SITE.email}`, action: 'Écrire' },
    { icon: Clock, titre: "Heures d'ouverture", lignes: SITE.horaires },
  ];

  return (
    <div className="ac bg-[#F3F4F6]">
      <EnTetePage
        fil="Contact"
        etiquette="Restons en contact"
        debut="Contactez"
        accent="OA Métal"
        texte="Une question sur nos produits, un devis pour votre chantier ou un partenariat ? Notre équipe vous répond rapidement."
        image="/images/images1.jpg"
      />

      {/* Cartes de contact */}
      <section className="pt-16">
        <div className={`${CONTENEUR} grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}>
          {cartes.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.titre}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="group flex flex-col bg-white p-6"
                style={{ borderTop: `4px solid ${i % 2 ? '#0B1B3D' : '#FF6B00'}` }}
              >
                <span className="flex h-12 w-12 items-center justify-center bg-[#0B1B3D] text-[#FF6B00] transition-transform duration-500 group-hover:rotate-6"><Icon size={22} /></span>
                <p className="ac-cond mt-5 text-xs font-bold text-[#8F96A3]">{c.titre}</p>
                {c.lignes.map((l) => <p key={l} className="mt-1 font-semibold">{l}</p>)}
                {c.lien && (
                  <a href={c.lien} target={c.lien.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="ac-lien mt-auto self-start pt-5 text-[#0B1B3D]">{c.action}</a>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Formulaire + carte */}
      <section className="py-20 lg:py-28">
        <div className={`${CONTENEUR} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <Etiquette>Écrivez-nous</Etiquette>
            <TitreAcier debut="Votre demande," accent="notre réponse" className="ac-titre-m mt-5" />

            <div className="ac-chanfrein mt-8 bg-white p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {etat === 'envoye' ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-10 text-center">
                    <CheckCircle2 size={56} className="mx-auto text-[#FF6B00]" />
                    <p className="mt-5 font-['Barlow_Condensed'] text-4xl font-extrabold uppercase">Message envoyé</p>
                    <p className="mx-auto mt-3 max-w-md text-[#5F6878]">Merci. Notre service commercial vous recontacte au plus vite.</p>
                    <button type="button" onClick={() => { setEtat('saisie'); setF({ nom: '', tel: '', email: '', objet: OBJETS[0], message: '' }); }} className="ac-btn mt-8">Envoyer un autre message</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={envoyer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block"><span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">Nom ou entreprise *</span><input required value={f.nom} onChange={maj('nom')} className="ac-champ" placeholder="Ex. : Entreprise BTP Faso" autoComplete="organization" /></label>
                      <label className="block"><span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">Téléphone *</span><input required type="tel" value={f.tel} onChange={maj('tel')} className="ac-champ" placeholder="+226 …" autoComplete="tel" /></label>
                      <label className="block"><span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">E-mail *</span><input required type="email" value={f.email} onChange={maj('email')} className="ac-champ" placeholder="contact@exemple.com" autoComplete="email" /></label>
                      <label className="block"><span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">Objet</span>
                        <select value={f.objet} onChange={maj('objet')} className="ac-champ">{OBJETS.map((o) => <option key={o}>{o}</option>)}</select>
                      </label>
                    </div>
                    <label className="block"><span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">Votre message *</span>
                      <textarea required rows={5} value={f.message} onChange={maj('message')} className="ac-champ" placeholder="Précisez les diamètres, quantités ou services souhaités…" />
                    </label>
                    {etat === 'erreur' && (
                      <p role="alert" className="border-l-4 border-[#FF6B00] bg-[#FFF4EC] p-4 text-sm">
                        L'envoi par e-mail n'a pas abouti. Réessayez, ou envoyez le même message sur WhatsApp avec le bouton ci-dessous.
                      </p>
                    )}
                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                      <button type="submit" disabled={etat === 'envoi'} className="ac-btn pm-brillance">
                        {etat === 'envoi' ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours…</> : <><Send size={18} /> Envoyer mon message</>}
                      </button>
                      <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texteWhatsApp)}`} target="_blank" rel="noreferrer" className="ac-lien text-[#0B1B3D]">
                        <MessageCircle size={16} /> Ou sur WhatsApp
                      </a>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="ac-chanfrein h-full min-h-[24rem] overflow-hidden bg-white p-2">
              <iframe
                title="Plan d'accès : Bassinko, Station OTAM, Ouagadougou"
                src={`https://www.google.com/maps?q=${encodeURIComponent('Bassinko Station OTAM Ouagadougou')}&output=embed`}
                className="h-full min-h-[24rem] w-full border-0 grayscale-[30%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Questions />
    </div>
  );
}

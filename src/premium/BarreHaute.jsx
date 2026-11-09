import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { SITE } from '../data/site';

// Icônes des réseaux sociaux (dessinées ici : lucide-react n'inclut plus les logos de marques)
const ICONES = {
  Facebook: (
    <path d="M14 8.2h2.6V4.6h-2.9c-3 0-4.6 1.9-4.6 4.8v2.1H6.6v3.6h2.5V22h3.8v-6.9h2.9l.5-3.6h-3.4V9.6c0-.9.3-1.4 1.1-1.4z" fill="currentColor" />
  ),
  Instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </g>
  ),
  TikTok: (
    <path d="M16.2 3c.3 2.3 1.7 3.9 4 4.1v3.3c-1.5 0-2.9-.4-4-1.2v5.9a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.4a2.3 2.3 0 1 0 1.4 2.1V3h3.3z" fill="currentColor" />
  ),
  LinkedIn: (
    <path d="M4.6 9h3.3v11H4.6V9zm1.7-5.4a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM10 9h3.1v1.5h.1c.4-.8 1.5-1.8 3.2-1.8 3.4 0 4 2.2 4 5.1V20h-3.3v-5.4c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V20H10V9z" fill="currentColor" />
  ),
};

const COUPE = 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))';

export default function BarreHaute() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-[51] border-b-2 border-[#FF6B00] bg-[#07122A] text-white"
      style={{ backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,.035) 0 6px, transparent 6px 12px)' }}
    >
      <div className="mx-auto flex h-10 max-w-[1240px] items-center justify-between gap-4 px-5 font-['Barlow_Condensed'] text-[13px] font-bold uppercase tracking-[0.08em] sm:px-8">
        {/* Coordonnées */}
        <div className="flex min-w-0 items-center gap-5">
          {SITE.telephones.map((t, i) => (
            <a
              key={t.lien}
              href={`tel:${t.lien}`}
              className={`group items-center gap-2 whitespace-nowrap transition-colors hover:text-[#FF6B00] ${i === 0 ? 'flex' : 'hidden sm:flex'}`}
            >
              <span className="flex h-6 w-6 items-center justify-center bg-[#FF6B00] text-[#0B1B3D]" style={{ clipPath: COUPE }}>
                <Phone size={13} strokeWidth={2.5} />
              </span>
              <span className="tabular-nums">{t.affiche}</span>
            </a>
          ))}
          <a href={`mailto:${SITE.email}`} className="hidden items-center gap-2 whitespace-nowrap normal-case tracking-normal text-white/80 transition-colors hover:text-[#FF6B00] lg:flex">
            <Mail size={14} className="text-[#FF6B00]" />
            <span className="font-['Montserrat'] text-xs font-medium">{SITE.email}</span>
          </a>
          <span className="hidden items-center gap-2 whitespace-nowrap text-white/70 2xl:flex">
            <Clock size={14} className="text-[#FF6B00]" />
            {SITE.horaires[0]}
          </span>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="mr-2 hidden whitespace-nowrap text-white/55 xl:inline">Suivez-nous</span>
          {SITE.reseaux.map((r) => (
            <a
              key={r.nom}
              href={r.url}
              target={r.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={r.nom}
              title={r.nom}
              className="flex h-7 w-7 items-center justify-center bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF6B00] hover:text-[#0B1B3D]"
              style={{ clipPath: COUPE }}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">{ICONES[r.nom]}</svg>
            </a>
          ))}
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Bonjour ${SITE.nom}, je souhaite un devis pour :`)}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
            className="ml-1 flex h-7 items-center gap-1.5 bg-[#25D366] px-2.5 text-[#07122A] transition-transform duration-300 hover:-translate-y-0.5"
            style={{ clipPath: COUPE }}
          >
            <MessageCircle size={15} strokeWidth={2.5} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

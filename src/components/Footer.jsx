import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { SITE, NAV, CATALOGUE } from '../data/site';

export default function Footer() {
  return (
    <footer className="bg-industrial-blue text-white">
      {/* Grand slogan */}
      <div className="border-b border-industrial-line">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-7xl">
            Le métal qui inspire <span className="text-industrial-orange">confiance.</span>
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="space-y-5 lg:col-span-4">
          <Link to="/" className="inline-block bg-white px-3 py-2">
            <img src="/logo.jpeg" alt="OA Métal Industrie" className="h-10 w-auto object-contain" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Votre partenaire de confiance pour la fourniture de produits métalliques de qualité au Burkina Faso.
          </p>
          <div className="border border-industrial-line p-5">
            <p className="font-display text-lg font-bold uppercase">Cotation WhatsApp</p>
            <p className="mt-1 text-sm text-white/60">Envoyez une photo de votre plan ou de votre liste : nous répondons avec un prix.</p>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Bonjour ${SITE.nom}, je souhaite un devis pour :`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-orange mt-4 !py-2.5"
            >
              <MessageCircle size={16} /> Écrire sur WhatsApp
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-industrial-orange">Navigation</h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-white">{n.label}</Link></li>
            ))}
            <li><Link to="/devis" className="hover:text-white">Demander un devis</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-industrial-orange">Produits</h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            {CATALOGUE.map((p) => (
              <li key={p.titre}><Link to="/produits" className="hover:text-white">{p.titre}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-industrial-orange">Contact</h4>
          <ul className="space-y-4 text-sm text-white/75">
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-industrial-orange" />
              <span>
                {SITE.telephones.map((t) => (
                  <a key={t.lien} href={`tel:${t.lien}`} className="block hover:text-white">{t.affiche}</a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-industrial-orange" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-industrial-orange" />
              <span>{SITE.adresse.map((l) => <span key={l} className="block">{l}</span>)}</span>
            </li>
            <li className="flex gap-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-industrial-orange" />
              <span>{SITE.horaires.map((l) => <span key={l} className="block">{l}</span>)}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-industrial-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} OA Métal Industrie · Tous droits réservés</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Mentions légales</a>
            <a href="#" className="hover:text-white">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

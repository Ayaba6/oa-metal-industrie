import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, X, Trash2, MessageCircle, FileText } from 'lucide-react';
import { SITE, NAV } from '../data/site';
import { useDemande } from '../context/Demande';
import logoRond from '../assets/logo_face.jpeg';

const EASE = [0.16, 1, 0.3, 1];
const COUPE = 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))';

// ---------------------------------------------------------------------
// Barre de navigation flottante en bas de l'écran + bouton d'appel
// ---------------------------------------------------------------------
export function Dock() {
  const [visible, setVisible] = useState(false);
  const { lignes, setOuvert } = useDemande();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const liens = [
    { href: '#produits', l: 'Produits' },
    { href: '#gamme', l: 'Gamme' },
    { href: '#depot', l: 'Galerie' },
    { href: '#devis', l: 'Contact' },
  ];

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-label="Navigation rapide"
            className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-20"
          >
            <div className="ac pointer-events-auto flex items-center gap-1 bg-[#0B1B3D] p-1.5 text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10" style={{ clipPath: COUPE, backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,.05) 0 6px, transparent 6px 12px)' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Haut de page" className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white">
                <img src={logoRond} alt="" className="h-full w-full object-cover" />
              </a>
              {liens.map((l) => (
                <a key={l.href} href={l.href} className="ac-cond hidden items-center gap-2 px-4 py-3 text-xs font-bold text-white/85 transition-colors hover:text-[#FF6B00] sm:flex">
                  <span className="h-1.5 w-1.5 bg-white/30" />{l.l}
                </a>
              ))}
              <button
                type="button"
                onClick={() => (lignes.length ? setOuvert(true) : document.getElementById('devis')?.scrollIntoView({ behavior: 'smooth' }))}
                className="ac-cond relative ml-1 flex items-center gap-2 bg-[#FF6B00] px-5 py-3 text-sm font-bold text-[#0B1B3D]"
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
              >
                <FileText size={16} /> Devis
                {lignes.length > 0 && (
                  <motion.span key={lignes.length} initial={{ scale: 1.8 }} animate={{ scale: 1 }} className="flex h-5 min-w-5 items-center justify-center bg-[#0B1B3D] px-1 text-[11px] text-white">
                    {lignes.length}
                  </motion.span>
                )}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <a
        href={`tel:${SITE.telephones[0].lien}`}
        aria-label={`Appeler le ${SITE.telephones[0].affiche}`}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center bg-[#0B1B3D] text-white shadow-[0_15px_35px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/15 transition-colors hover:bg-[#FF6B00] hover:text-[#0B1B3D]"
        style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
      >
        <Phone size={22} />
      </a>
    </>
  );
}

// ---------------------------------------------------------------------
// Tiroir "Ma demande"
// ---------------------------------------------------------------------
export function Tiroir() {
  const { lignes, retirer, vider, ouvert, setOuvert, lienWhatsApp } = useDemande();
  const [lieu, setLieu] = useState('');

  return (
    <AnimatePresence>
      {ouvert && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-[#07122A]/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOuvert(false)} />
          <motion.aside
            className="ac fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-white"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Ma demande de devis"
          >
            <div className="ac-forge flex items-start justify-between px-6 py-6">
              <div>
                <span className="ac-etiquette">Devis gratuit</span>
                <h2 className="mt-3 font-['Barlow_Condensed'] text-4xl font-extrabold uppercase text-white">Ma demande</h2>
              </div>
              <button type="button" onClick={() => setOuvert(false)} className="ac-cond flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white">
                Fermer <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lignes.length === 0 ? (
                <p className="py-16 text-center text-sm text-[#5F6878]">
                  Votre demande est vide. Choisissez un diamètre, une tôle ou un tube, puis « Ajouter à ma demande ».
                </p>
              ) : (
                <ul className="divide-y divide-[#EEF0F3]">
                  <AnimatePresence initial={false}>
                    {lignes.map((l, i) => (
                      <motion.li key={l.id} layout initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex items-start gap-4 py-4">
                        <span className="font-['Barlow_Condensed'] text-xl font-extrabold text-[#FF6B00]">{String(i + 1).padStart(2, '0')}</span>
                        <span className="flex-1">
                          <span className="block font-['Barlow_Condensed'] text-lg font-bold uppercase">{l.produit}</span>
                          <span className="text-sm text-[#5F6878]">{l.detail}</span>
                        </span>
                        <button type="button" onClick={() => retirer(l.id)} aria-label={`Retirer ${l.produit}`} className="p-1 text-[#8F96A3] hover:text-[#FF6B00]"><Trash2 size={16} /></button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            <div className="space-y-3 border-t border-[#D9DCE1] bg-[#F3F4F6] px-6 py-5">
              <label className="block">
                <span className="ac-cond mb-1.5 block text-xs font-bold text-[#5F6878]">Lieu du chantier (facultatif)</span>
                <input value={lieu} onChange={(e) => setLieu(e.target.value)} className="ac-champ" placeholder="Ex. : Ouaga 2000, Koudougou…" />
              </label>
              <a href={lignes.length ? lienWhatsApp(lieu) : undefined} target="_blank" rel="noreferrer" aria-disabled={!lignes.length} className={`ac-btn w-full ${lignes.length ? '' : 'pointer-events-none opacity-40'}`}>
                <MessageCircle size={18} /> Envoyer sur WhatsApp
              </a>
              <div className="flex items-center justify-between">
                <Link to="/devis" onClick={() => setOuvert(false)} className="ac-lien text-[#0B1B3D]">Compléter mon devis en ligne</Link>
                {lignes.length > 0 && <button type="button" onClick={vider} className="ac-cond text-xs font-bold text-[#5F6878] hover:text-[#FF6B00]">Vider la demande</button>}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------
// Menu plein écran (ouvert depuis l'en-tête)
// ---------------------------------------------------------------------
export function MenuPleinEcran({ ouvert, fermer }) {
  useEffect(() => {
    document.body.style.overflow = ouvert ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [ouvert]);

  return createPortal(
    <AnimatePresence>
      {ouvert && (
        <motion.div
          className="ac fixed inset-0 z-[100] overflow-y-auto bg-[#07122A] text-white"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,.035) 0 8px, transparent 8px 16px)' }}
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="mx-auto flex min-h-full max-w-[1240px] flex-col px-5 py-6 sm:px-8">
            <div className="flex items-center justify-between">
              <span className="font-['Barlow_Condensed'] text-2xl font-extrabold uppercase">OA <span className="text-[#FF6B00]">Métal</span> Industrie</span>
              <button type="button" onClick={fermer} className="ac-cond flex items-center gap-2 text-sm font-bold">Fermer <X size={20} /></button>
            </div>
            <div className="mt-10 grid flex-1 gap-12 lg:grid-cols-12 lg:items-center">
              <nav className="lg:col-span-7" aria-label="Menu principal">
                {NAV.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: EASE }}
                    className="border-b border-white/10"
                  >
                    <Link to={l.to} onClick={fermer} className="group flex items-baseline gap-5 py-3">
                      <span className="font-['Barlow_Condensed'] text-sm font-bold text-[#FF6B00]">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-['Barlow_Condensed'] text-5xl font-extrabold uppercase transition-colors group-hover:text-[#FF6B00] sm:text-6xl">{l.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div className="space-y-6 lg:col-span-4 lg:col-start-9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <img src={logoRond} alt="" className="h-24 w-24 rounded-full" />
                <div>
                  <p className="ac-cond text-xs font-bold text-white/50">Service commercial</p>
                  {SITE.telephones.map((t) => <a key={t.lien} href={`tel:${t.lien}`} className="block font-['Barlow_Condensed'] text-3xl font-extrabold tabular-nums">{t.affiche}</a>)}
                </div>
                <div>
                  <p className="ac-cond text-xs font-bold text-white/50">Dépôt</p>
                  <p className="text-sm text-white/80">{SITE.adresse.join(', ')}</p>
                  <p className="text-sm text-white/80">{SITE.email}</p>
                </div>
                <Link to="/devis" onClick={fermer} className="ac-btn w-full">Demander un devis</Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

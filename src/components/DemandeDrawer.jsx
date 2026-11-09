import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2, MessageCircle, ClipboardList } from 'lucide-react';
import { useDemande } from '../context/Demande';

// Tiroir "Ma demande" : liste des produits ajoutés, envoi sur WhatsApp.
export default function DemandeDrawer() {
  const { lignes, retirer, vider, ouvert, setOuvert, lienWhatsApp } = useDemande();
  const [lieu, setLieu] = useState('');

  return (
    <AnimatePresence>
      {ouvert && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-industrial-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOuvert(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Ma demande de devis"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-industrial-orange">Devis gratuit</p>
                <h2 className="font-display text-3xl font-extrabold uppercase text-industrial-blue">Ma demande</h2>
              </div>
              <button
                type="button"
                onClick={() => setOuvert(false)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center border border-gray-200"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lignes.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                  <ClipboardList size={40} className="mb-3 text-gray-300" />
                  <p className="max-w-xs text-sm">
                    Votre demande est vide. Choisissez un diamètre, une tôle ou un tube, puis « Ajouter à ma demande ».
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {lignes.map((l, i) => (
                    <li key={l.id} className="flex items-start gap-4 py-4">
                      <span className="font-display text-lg font-bold text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                      <div className="flex-1">
                        <p className="font-bold text-industrial-blue">{l.produit}</p>
                        <p className="text-sm text-gray-600">{l.detail}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => retirer(l.id)}
                        className="cursor-pointer p-1 text-gray-400 hover:text-red-600"
                        aria-label={`Retirer ${l.produit}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lignes.length > 0 && (
              <div className="space-y-3 border-t border-gray-200 bg-industrial-light px-6 py-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500" htmlFor="lieu-chantier">
                  Lieu du chantier (facultatif)
                </label>
                <input
                  id="lieu-chantier"
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                  placeholder="Ex. : Ouaga 2000, Koudougou…"
                  className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-industrial-blue focus:outline-none"
                />
                <a
                  href={lienWhatsApp(lieu)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-orange w-full"
                >
                  <MessageCircle size={18} /> Envoyer sur WhatsApp
                </a>
                <div className="flex items-center justify-between text-sm">
                  <Link to="/devis" onClick={() => setOuvert(false)} className="font-semibold text-industrial-blue underline-offset-4 hover:underline">
                    Compléter mon devis en ligne
                  </Link>
                  <button type="button" onClick={vider} className="cursor-pointer text-gray-500 hover:text-red-600">
                    Vider
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

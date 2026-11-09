import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Écran d'intro (une fois par visite) : logo + slogan, bouton "Passer".
function dejaVu() {
  try { return sessionStorage.getItem('oa-intro') === '1'; } catch { return false; }
}

export default function Intro() {
  const [visible, setVisible] = useState(() => !dejaVu());

  useEffect(() => {
    if (!visible) return;
    try { sessionStorage.setItem('oa-intro', '1'); } catch { /* navigation privée */ }
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-industrial-ink text-white"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white px-6 py-4"
          >
            <img src="/logo.jpeg" alt="OA Métal Industrie" className="h-16 w-auto sm:h-20" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 px-6 text-center font-display text-3xl font-bold uppercase tracking-tight sm:text-5xl"
          >
            Le métal qui inspire <span className="text-industrial-orange">confiance</span>
          </motion.p>
          <motion.div
            className="mt-8 h-0.5 bg-industrial-orange"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ delay: 0.3, duration: 1.8, ease: 'easeInOut' }}
          />
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute bottom-8 right-6 cursor-pointer text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white"
          >
            Passer l'intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

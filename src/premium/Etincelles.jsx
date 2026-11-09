import React, { useEffect, useRef } from 'react';
import { geometrieV } from './geometrieV';

// Scintillement : étincelles de meulage qui jaillissent et poussières
// métalliques qui scintillent dans le hero. Dessiné sur un <canvas>.
export default function Etincelles({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduit = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, raf = 0, dernier = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const taille = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    taille();
    window.addEventListener('resize', taille);

    // Poussières qui scintillent (fixes, clignotent doucement)
    const poussieres = Array.from({ length: 90 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      phase: Math.random() * Math.PI * 2,
      vitesse: Math.random() * 2 + 0.8,
      chaud: Math.random() < 0.35,
    }));

    // Étincelles : jaillissent d'un point bas à droite, retombent avec la gravité
    let etincelles = [];
    const gerbe = (n) => {
      // Un point au hasard sur le bord en V (souvent près de la pointe), juste au-dessus du bandeau
      const { D, T } = geometrieV(w);
      const u = Math.random() < 0.5 ? 0.5 + (Math.random() - 0.5) * 0.12 : Math.random();
      const ox = w * u;
      const oy = h - D * Math.abs(2 * u - 1) - T / 2 - 4;
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
        const v = 220 + Math.random() * 380;
        etincelles.push({ x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vie: 0, duree: 0.6 + Math.random() * 0.9 });
      }
    };
    let prochaineGerbe = 0.4;

    const boucle = (t) => {
      const dt = Math.min((t - dernier) / 1000, 0.05);
      dernier = t;
      ctx.clearRect(0, 0, w, h);

      // Poussières
      const s = t / 1000;
      for (const p of poussieres) {
        const a = Math.max(0, Math.sin(s * p.vitesse + p.phase)) ** 3;
        if (a < 0.02) continue;
        const x = p.x * w, y = p.y * h;
        ctx.fillStyle = p.chaud ? `rgba(255,150,60,${a})` : `rgba(233,237,243,${a * 0.9})`;
        ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
        if (a > 0.7 && p.r > 1.1) {
          // petite croix de lumière
          ctx.strokeStyle = p.chaud ? `rgba(255,170,90,${a * 0.6})` : `rgba(255,255,255,${a * 0.5})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(x - p.r * 5, y); ctx.lineTo(x + p.r * 5, y);
          ctx.moveTo(x, y - p.r * 5); ctx.lineTo(x, y + p.r * 5);
          ctx.stroke();
        }
      }

      // Gerbes d'étincelles
      prochaineGerbe -= dt;
      if (prochaineGerbe <= 0) { gerbe(40 + Math.floor(Math.random() * 40)); prochaineGerbe = 1.6 + Math.random() * 2.4; }

      ctx.globalCompositeOperation = 'lighter';
      etincelles = etincelles.filter((e) => e.vie < e.duree);
      for (const e of etincelles) {
        const px = e.x, py = e.y;
        e.vie += dt;
        e.vy += 520 * dt; // gravité
        e.x += e.vx * dt; e.y += e.vy * dt;
        const k = 1 - e.vie / e.duree;
        const grad = ctx.createLinearGradient(px, py, e.x, e.y);
        grad.addColorStop(0, `rgba(255,107,0,0)`);
        grad.addColorStop(1, `rgba(255,${190 + Math.floor(60 * k)},${90 + Math.floor(120 * k)},${k})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.4 * k + 0.6;
        ctx.beginPath(); ctx.moveTo(px - (e.x - px) * 3, py - (e.y - py) * 3); ctx.lineTo(e.x, e.y); ctx.stroke();
        // tête incandescente
        ctx.fillStyle = `rgba(255,236,200,${k})`;
        ctx.beginPath(); ctx.arc(e.x, e.y, 1.6 * k + 0.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(boucle);
    };

    if (reduit) {
      boucle(performance.now());
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(boucle);
    }

    // Pause quand l'onglet est caché
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduit) { dernier = performance.now(); raf = requestAnimationFrame(boucle); }
    };
    document.addEventListener('visibilitychange', vis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', taille);
      document.removeEventListener('visibilitychange', vis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}

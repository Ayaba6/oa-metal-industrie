import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Globe, Share2, Send, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-industrial-blue text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Colonne 1 : Logo & Infos */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link to="/" className="inline-block bg-white px-3 py-2 rounded hover:opacity-95 transition">
                <img 
                  src="/logo.jpeg" 
                  alt="OA Métal Industrie" 
                  className="h-10 w-auto object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </Link>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Votre partenaire de confiance pour la fourniture de produits métalliques de qualité au Burkina Faso. Le métal qui inspire confiance !
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-industrial-orange transition" title="Réseau social"><Globe size={16} /></a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-industrial-orange transition" title="Partage"><Share2 size={16} /></a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-industrial-orange transition" title="Discussion"><MessageCircle size={16} /></a>
            </div>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-industrial-orange">Liens rapides</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link to="/" className="hover:text-industrial-orange transition">Accueil</Link></li>
              <li><Link to="/apropos" className="hover:text-industrial-orange transition">À propos</Link></li>
              <li><Link to="/produits" className="hover:text-industrial-orange transition">Produits</Link></li>
              <li><Link to="/services" className="hover:text-industrial-orange transition">Services</Link></li>
              <li><Link to="/realisations" className="hover:text-industrial-orange transition">Réalisations</Link></li>
              <li><Link to="/actualites" className="hover:text-industrial-orange transition">Actualités</Link></li>
              <li><Link to="/contact" className="hover:text-industrial-orange transition">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Contact & Horaires */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-industrial-orange">Contact</h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-industrial-orange flex-shrink-0" />
                <span>+226 70 71 76 87 / +226 77 83 51 13</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-industrial-orange flex-shrink-0" />
                <span>contact@oametalindustrie.bf</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-industrial-orange flex-shrink-0 mt-0.5" />
                <span>Bassinko - Station OTAM<br />Ouagadougou - BURKINA FASO</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-industrial-orange flex-shrink-0 mt-0.5" />
                <span>Lun - Ven : 7h30 - 18h00<br />Samedi : 8h00 - 13h00</span>
              </div>
            </div>
          </div>

          {/* Colonne 4 : Newsletter */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-industrial-orange">Newsletter</h4>
            <p className="text-xs text-gray-300 mb-4">Abonnez-vous pour recevoir nos actualités et offres.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-industrial-orange"
              />
              <button type="submit" className="w-full bg-industrial-orange hover:bg-orange-600 text-white font-bold text-xs uppercase py-2.5 rounded transition flex items-center justify-center gap-2 cursor-pointer">
                S'abonner <Send size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© 2026 OA Métal Industrie. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:underline">Mentions légales</a>
            <a href="#" className="hover:underline">Politique de confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
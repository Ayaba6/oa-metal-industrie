import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo de l'entreprise (Uniquement l'image) */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <img 
              src="/logo.jpeg" 
              alt="OA Métal Industrie" 
              className="h-12 w-auto object-contain group-hover:opacity-95 transition"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </Link>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-6 font-bold text-xs tracking-wider text-gray-700">
          <Link 
            to="/" 
            className={`transition hover:text-industrial-orange ${isActive('/') ? 'text-industrial-orange' : ''}`}
          >
            ACCUEIL
          </Link>
          <Link 
            to="/apropos" 
            className={`transition hover:text-industrial-orange ${isActive('/apropos') ? 'text-industrial-orange' : ''}`}
          >
            À PROPOS
          </Link>
          <div className="relative group cursor-pointer">
            <Link 
              to="/produits" 
              className={`flex items-center gap-1 transition hover:text-industrial-orange ${isActive('/produits') ? 'text-industrial-orange' : ''}`}
            >
              <span>PRODUITS</span>
              <ChevronDown size={14} />
            </Link>
          </div>
          <Link 
            to="/services" 
            className={`transition hover:text-industrial-orange ${isActive('/services') ? 'text-industrial-orange' : ''}`}
          >
            SERVICES
          </Link>
          <Link 
            to="/realisations" 
            className={`transition hover:text-industrial-orange ${isActive('/realisations') ? 'text-industrial-orange' : ''}`}
          >
            RÉALISATIONS
          </Link>
          <Link 
            to="/actualites" 
            className={`transition hover:text-industrial-orange ${isActive('/actualites') ? 'text-industrial-orange' : ''}`}
          >
            ACTUALITÉS
          </Link>
          <Link 
            to="/contact" 
            className={`transition hover:text-industrial-orange ${isActive('/contact') ? 'text-industrial-orange' : ''}`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Téléphones (Desktop) avec icône dynamique */}
        <div className="hidden xl:flex items-center gap-3 text-industrial-blue font-bold text-xs border-l pl-4 border-gray-200">
          <div className="p-2 bg-orange-50 rounded-full">
            <Phone size={18} className="text-industrial-orange animate-bounce flex-shrink-0" />
          </div>
          <div className="flex flex-col">
            <span>+226 70 71 76 87</span>
            <span className="text-gray-500 font-normal">+226 77 83 51 13</span>
          </div>
        </div>

        {/* Bouton Devis & Menu Burger (Mobile) */}
        <div className="flex items-center gap-3">
          <Link 
            to="/devis"
            className="bg-industrial-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-lg uppercase transition shadow-md tracking-wider"
          >
            Demander un devis
          </Link>

          {/* Bouton Toggle Menu Mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 text-industrial-blue focus:outline-none cursor-pointer"
            aria-label="Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {/* Menu Mobile Déroulant */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className={`block font-bold text-sm uppercase py-2 border-b border-gray-50 ${isActive('/') ? 'text-industrial-orange' : 'text-gray-700'}`}
          >
            Accueil
          </Link>
          <Link 
            to="/apropos" 
            onClick={() => setIsOpen(false)}
            className={`block font-bold text-sm uppercase py-2 border-b border-gray-50 ${isActive('/apropos') ? 'text-industrial-orange' : 'text-gray-700'}`}
          >
            À propos
          </Link>
          <Link 
            to="/produits" 
            onClick={() => setIsOpen(false)}
            className={`block font-bold text-sm uppercase py-2 border-b border-gray-50 ${isActive('/produits') ? 'text-industrial-orange' : 'text-gray-700'}`}
          >
            Produits
          </Link>
          <Link 
            to="/services" 
            onClick={() => setIsOpen(false)}
            className={`block font-bold text-sm uppercase py-2 border-b border-gray-50 ${isActive('/services') ? 'text-industrial-orange' : 'text-gray-700'}`}
          >
            Services
          </Link>
          <Link 
            to="/realisations" 
            onClick={() => setIsOpen(false)}
            className={`block font-bold text-sm uppercase py-2 border-b border-gray-50 ${isActive('/realisations') ? 'text-industrial-orange' : 'text-gray-700'}`}
          >
            Réalisations
          </Link>
          <Link 
            to="/actualites" 
            onClick={() => setIsOpen(false)}
            className={`block font-bold text-sm uppercase py-2 border-b border-gray-50 ${isActive('/actualites') ? 'text-industrial-orange' : 'text-gray-700'}`}
          >
            Actualités
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className={`block font-bold text-sm uppercase py-2 ${isActive('/contact') ? 'text-industrial-orange' : 'text-gray-700'}`}
          >
            Contact
          </Link>

          {/* Téléphones visibles sur mobile */}
          <div className="pt-4 border-t border-gray-100 flex items-center gap-3 text-industrial-blue font-bold text-xs">
            <div className="p-1.5 bg-orange-50 rounded-full">
              <Phone size={16} className="text-industrial-orange animate-bounce" />
            </div>
            <div>
              <p>+226 70 71 76 87</p>
              <p className="text-gray-500 font-normal">+226 77 83 51 13</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
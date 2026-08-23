import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Tous les produits' },
  { id: 'toles', label: 'Tôles & Couvertures' },
  { id: 'fers', label: 'Fers & Armatures' },
  { id: 'profiles', label: 'Profilés & Tubes' },
  { id: 'accessoires', label: 'Accessoires & Fixations' },
];

const productsList = [
  {
    id: 1,
    title: "Tôle Ondulée",
    category: "toles",
    description: "Robustes et durables pour tous types de couvertures résidentielles ou industrielles.",
    // 👉 CHANGEZ LE NOM DE L'IMAGE ICI (placez votre fichier dans le dossier public/images/)
    image: "/images/tole-ondulee.jpg",
    specs: ["Robuste & durable", "Excellente résistance intempéries", "Pose facile"],
    badge: "Populaire"
  },
  {
    id: 2,
    title: "Tôle Bac",
    category: "toles",
    description: "Tôles bac de haute qualité offrant une esthétique moderne et une étanchéité irréprochable.",
    // 👉 CHANGEZ LE NOM DE L'IMAGE ICI
    image: "/images/tole-bac.jpg",
    specs: ["Haute qualité", "Grande rigidité", "Idéal grands chantiers"],
    badge: "Résistant"
  },
  {
    id: 3,
    title: "Fer à Béton",
    category: "fers",
    description: "Solide et résistant pour renforcer durablement vos fondations et structures en béton armé.",
    // 👉 CHANGEZ LE NOM DE L'IMAGE ICI
    image: "/images/fer-beton.jpg",
    specs: ["Solide & résistant", "Normes internationales", "Divers diamètres"],
    badge: "Essentiel"
  },
  {
    id: 4,
    title: "Fer Attaché",
    category: "fers",
    description: "Solide et fiable pour lier efficacement vos structures de fers à béton sur les chantiers.",
    // 👉 CHANGEZ LE NOM DE L'IMAGE ICI
    image: "/images/ferattache.jpg",
    specs: ["Solide & fiable", "Facile à manipuler", "Attache sécurisée"],
    badge: "Chantier"
  },
  {
    id: 5,
    title: "IPN",
    category: "profiles",
    description: "Poutrelles métalliques garantissant une robustesse maximale pour vos charpentes et structures porteuses.",
    // 👉 CHANGEZ LE NOM DE L'IMAGE ICI
    image: "/images/ipn2.jpg",
    specs: ["Robustesse garantie", "Acier de premier choix", "Longueurs adaptées"],
    badge: "Industriel"
  },
  {
    id: 6,
    title: "Tube Carré",
    category: "profiles",
    description: "Allie solidité et esthétique pour vos travaux de serrurerie, portails et ossatures métalliques.",
    // 👉 CHANGEZ LE NOM DE L'IMAGE ICI
    image: "/images/tube-carre2.jpg",
    specs: ["Solide & esthétique", "Finition propre", "Multi-usages"],
    badge: "Polyvalent"
  },
  {
    id: 7,
    title: "Crochet",
    category: "accessoires",
    description: "Conçu pour une fixation sécurisée de vos couvertures et éléments de toiture.",
    // 👉 CHANGEZ LE NOM DE L'IMAGE ICI
    image: "/images/crochet.jpg",
    specs: ["Fixation sécurisée", "Matériau anti-corrosion", "Tenue irréprochable"],
    badge: "Accessoire"
  },
  {
    id: 8,
    title: "Pointe",
    category: "accessoires",
    description: "Pointes de qualité supérieure offrant précision et performance pour tous vos travaux de charpente.",
    // 👉 CHANGEZ LE NOM DE L'IMAGE ICI
    image: "/images/pointe.jpg",
    specs: ["Précision & performance", "Diverses dimensions", "Forte pénétration"],
    badge: "Accessoire"
  }
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? productsList 
    : productsList.filter(product => product.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      
      {/* En-tête de la page */}
      <section className="relative bg-industrial-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/images/header-bg.jpg" // 👉 Vous pouvez aussi changer l'image d'en-tête ici si vous le souhaitez
            alt="Produits OA Métal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-blue via-industrial-blue/90 to-industrial-blue/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-industrial-orange font-bold text-xs uppercase tracking-widest bg-industrial-orange/10 px-3 py-1 rounded-full inline-block"
          >
            Qualité • Résistance • Confiance
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight"
          >
            Nos Produits & Matériaux
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Découvrez la force du métal au service de vos projets avec notre catalogue complet de fers, tôles, profilés et accessoires.
          </motion.p>
        </div>
      </section>

      {/* Section catalogue et filtres */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Boutons de filtre */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-industrial-orange text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille des produits */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-industrial-orange/50 transition-all duration-300 flex flex-col group"
              >
                {/* Image du produit avec badge */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-industrial-blue text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                    {product.badge}
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-industrial-blue uppercase group-hover:text-industrial-orange transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Caractéristiques */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <CheckCircle size={14} className="text-industrial-orange flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bouton d'action */}
                  <div className="pt-4">
                    <a 
                      href="#contact" 
                      className="w-full bg-gray-50 hover:bg-industrial-orange text-industrial-blue hover:text-white border border-gray-200 hover:border-industrial-orange font-bold text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <span>Demander un devis</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </section>

      {/* Bannière d'appel à l'action bas de page */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-industrial-blue uppercase">
            Besoin d'autres matériaux selon vos besoins spécifiques ?
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            Retrouvez-nous à Bassinko - Station OTAM à Ouagadougou ou contactez notre service client pour un accompagnement sur mesure.
          </p>
          <a 
            href="#contact" 
            className="inline-flex bg-industrial-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl uppercase tracking-wider transition shadow-lg"
          >
            Contactez-nous au +226 70 71 76 87
          </a>
        </div>
      </section>

    </div>
  );
}
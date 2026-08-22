import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, CheckCircle, ArrowRight, Layers } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'batiment', label: 'Bâtiments & Immeubles' },
  { id: 'industriel', label: 'Infrastructures & Usines' },
  { id: 'residentiel', label: 'Résidentiel & Villas' }
];

const projectsList = [
  {
    id: 1,
    title: "Complexe Commercial Ouaga 2000",
    category: "batiment",
    location: "Ouagadougou",
    description: "Fourniture intégrale de fers à béton haute adhérence (HA) et de profilés métalliques pour la structure porteuse de ce centre commercial moderne.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18f2445?auto=format&fit=crop&w=800&q=80",
    client: "Groupe Immobilier du Faso",
    year: "2025"
  },
  {
    id: 2,
    title: "Hangar Industriel & Stockage Logistique",
    category: "industriel",
    location: "Bobo-Dioulasso",
    description: "Réalisation d'une charpente métallique de grande envergure avec des profilés IPE/HEB et tôles bacs alu robustes pour un site de stockage.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    client: "Industrie & Logistique SA",
    year: "2025"
  },
  {
    id: 3,
    title: "Cité Résidentielle Les Palmiers",
    category: "residentiel",
    location: "Ouagadougou",
    description: "Approvisionnement régulier en fers de construction et treillis soudés pour la construction sécurisée de 30 villas haut standing.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    client: "Promotion Immobilière Privée",
    year: "2024"
  },
  {
    id: 4,
    title: "Siège Social Institutionnel",
    category: "batiment",
    location: "Koudougou",
    description: "Fourniture de matériaux de gros œuvre certifiés pour un bâtiment à R+4 respectant les normes parasismiques et de durabilité.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    client: "Institution Publique",
    year: "2025"
  },
  {
    id: 5,
    title: "Usine de Transformation Agro-alimentaire",
    category: "industriel",
    location: "Bobo-Dioulasso",
    description: "Livraison express de tubes structuraux et de tôles ondulées galvanisées pour l'extension des lignes de production.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    client: "Agro-Industrie Burkina",
    year: "2024"
  },
  {
    id: 6,
    title: "Immeuble d'Appartements Standing",
    category: "residentiel",
    location: "Ouagadougou",
    description: "Livraison cadencée sur chantier exigu de fers à béton haute résistance du diamètre 8mm au 32mm.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    client: "Architectes & Associés",
    year: "2026"
  }
];

export default function Realisations() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projectsList
    : projectsList.filter(proj => proj.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      
      {/* En-tête de la page */}
      <section className="relative bg-industrial-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18f2445?auto=format&fit=crop&w=2000&q=80" 
            alt="Réalisations OA Métal" 
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
            Nos Références
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight"
          >
            Chantiers & Projets Réalisés
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Découvrez une sélection de grands projets de construction et d'infrastructures bâtis grâce à la robustesse et la qualité des aciers OA Métal Industrie.
          </motion.p>
        </div>
      </section>

      {/* Section Filtres et Grille */}
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

        {/* Grille des réalisations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-industrial-orange/50 transition-all duration-300 flex flex-col group"
              >
                {/* Image du projet avec badge Année */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-industrial-orange text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                    {project.year}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-industrial-blue/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow">
                    <MapPin size={14} className="text-industrial-orange" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-industrial-blue uppercase group-hover:text-industrial-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Informations client */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                    <span>Maître d'ouvrage :</span>
                    <span className="text-industrial-blue font-bold">{project.client}</span>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </section>

      {/* Appel à l'action bas de page */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-industrial-blue uppercase">
            Envie d'associer la qualité OA Métal à votre prochain projet ?
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            Contactez notre bureau commercial pour discuter de vos besoins en approvisionnement de fers et de matériaux.
          </p>
          <a 
            href="#contact" 
            className="inline-flex bg-industrial-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl uppercase tracking-wider transition shadow-lg"
          >
            Obtenir un devis personnalisé
          </a>
        </div>
      </section>

    </div>
  );
}
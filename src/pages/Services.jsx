import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Scissors, Wrench, ShieldCheck, Headphones, ArrowRight, CheckCircle, Clock } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const servicesList = [
  {
    id: 1,
    title: "Livraison Express sur Chantiers",
    description: "Une flotte de camions adaptée et sécurisée pour acheminer vos fers à béton, tôles et profilés directement sur vos sites de construction, partout au Burkina Faso.",
    icon: Truck,
    features: ["Respect des délais convenus", "Chauffeurs formés et professionnels", "Capacité de charge adaptée aux grands volumes"]
  },
  {
    id: 2,
    title: "Découpe & Sur-Mesure",
    description: "Service de découpe et de façonnage de l'acier selon vos plans précis. Gagnez du temps sur vos chantiers en recevant des matériaux prêts à l'installation.",
    icon: Scissors,
    features: ["Coupe précise par nos techniciens", "Moins de pertes et de déchets sur site", "Adapté à tous types de profilés métalliques"]
  },
  {
    id: 3,
    title: "Conseil Technique & Études",
    description: "Nos experts en métallurgie vous guident dans le choix des nuances d'acier, des diamètres de fers et des épaisseurs de tôles adaptés à la résistance requise.",
    icon: Wrench,
    features: ["Analyse de vos plans de construction", "Recommandations conformes aux normes", "Optimisation des coûts de matériaux"]
  },
  {
    id: 4,
    title: "Contrôle Qualité & Certification",
    description: "Tous nos produits subissent des tests rigoureux de résistance et de durabilité pour garantir une sécurité absolue à vos ouvrages d'art et bâtiments.",
    icon: ShieldCheck,
    features: ["Matériaux 100% testés et certifiés", "Traçabilité garantie des aciers", "Conformité aux standards internationaux"]
  },
  {
    id: 5,
    title: "Service Client & Support BTP",
    description: "Un interlocuteur dédié du devis initial jusqu'à la réception de votre commande pour répondre à toutes vos urgences et questions logistiques.",
    icon: Headphones,
    features: ["Suivi de commande en temps réel", "Disponibilité et écoute permanente", "Devis rapides et transparents"]
  },
  {
    id: 6,
    title: "Logistique & Stock Permanent",
    description: "Un vaste espace de stockage garantissant une disponibilité immédiate des références courantes pour éviter toute rupture sur vos chantiers.",
    icon: Clock,
    features: ["Stocks importants permanents", "Disponibilité immédiate", "Réactivité face aux urgences chantier"]
  }
];

export default function Services() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* En-tête de la page */}
      <section className="relative bg-industrial-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80" 
            alt="Services OA Métal" 
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
            Nos Prestations
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight"
          >
            Services Sur-Mesure pour le BTP
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Plus qu'un fournisseur de métaux, nous sommes votre partenaire logistique et technique pour garantir la réussite et la sécurité de vos chantiers.
          </motion.p>
        </div>
      </section>

      {/* Grille des services */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-black text-industrial-blue uppercase">
            Un accompagnement complet de A à Z
          </h2>
          <p className="text-gray-600 text-sm">
            Découvrez l'ensemble des services professionnels mis en œuvre par OA Métal Industrie pour simplifier vos approvisionnements.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesList.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                variants={fadeIn}
                key={service.id}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm hover:border-industrial-orange hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icône du service */}
                  <div className="w-14 h-14 bg-white shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center text-industrial-orange group-hover:bg-industrial-orange group-hover:text-white transition-colors duration-300">
                    <IconComponent size={28} />
                  </div>

                  <h3 className="text-xl font-black text-industrial-blue uppercase">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-xs leading-relaxed">
                    {service.description}
                  </p>

                  {/* Liste des points clés */}
                  <div className="space-y-2 pt-4 border-t border-gray-200/60">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <CheckCircle size={14} className="text-industrial-orange flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lien d'action */}
                <div className="pt-6 mt-6 border-t border-gray-200/60">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 text-xs font-bold text-industrial-blue uppercase group-hover:text-industrial-orange transition-colors"
                  >
                    <span>Profiter de ce service</span>
                    <ArrowRight size={16} />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </section>

      {/* Section CTA / Appel à l'action */}
      <section className="bg-industrial-blue text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-industrial-orange font-bold text-xs uppercase tracking-widest bg-industrial-orange/10 px-3 py-1 rounded-full inline-block">
            Besoin d'un devis ou d'une intervention ?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase">
            Discutons dès maintenant des besoins de votre chantier
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
            Notre équipe commerciale et logistique se tient prête à vous établir une proposition claire et rapide.
          </p>
          <div className="pt-2">
            <a 
              href="#contact" 
              className="inline-flex bg-industrial-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl uppercase tracking-wider transition shadow-lg"
            >
              Contactez notre équipe
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
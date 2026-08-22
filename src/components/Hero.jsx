import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';

// Import des styles de Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const heroSlides = [
  {
    id: 1,
    title1: "LA FORCE DU MÉTAL",
    highlight: "AU SERVICE",
    title2: "DE VOS PROJETS !",
    slogan: "Qualité supérieure • Résistance maximale • Confiance durable",
    // Remplacez le chemin ci-dessous par votre première image (ex: "/images/slide1.jpg")
    image: "/images/fer-beton.jpg",
    badgeTitle: "Qualité Certifiée",
    badgeSub: "Satisfaction Garantie",
    badgeIcon: ShieldCheck
  },
  {
    id: 2,
    title1: "FERS & MATÉRIAUX",
    highlight: "DE CONSTRUCTION",
    title2: "HAUTE RÉSISTANCE",
    slogan: "Fers à béton • Tôles ondulées • Profilés métalliques robustes",
    // Remplacez le chemin ci-dessous par votre deuxième image (ex: "/images/slide2.jpg")
    image: "/images/tole-ondulee.jpg",
    badgeTitle: "Normes & Sécurité",
    badgeSub: "Matériaux 100% Testés",
    badgeIcon: Building2
  },
  {
    id: 3,
    title1: "LIVRAISON EXPRESS",
    highlight: "SUR VOS CHANTIERS",
    title2: "PARTOUT AU BURKINA",
    slogan: "Réactivité • Logistique adaptée • Service client à l'écoute",
    // Remplacez le chemin ci-dessous par votre troisième image (ex: "/images/slide3.jpg")
    image: "/images/tube-carre.jpg",
    badgeTitle: "Service Pro",
    badgeSub: "Disponibilité Permanente",
    badgeIcon: Truck
  }
];

export default function Hero() {
  return (
    <section id="accueil" className="relative bg-industrial-blue text-white overflow-hidden group pb-8">
      
      {/* Boutons de navigation au survol */}
      <button 
        className="custom-prev absolute left-4 lg:left-8 top-[45%] -translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-industrial-orange text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-xl hidden sm:flex items-center justify-center"
        aria-label="Slide précédent"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        className="custom-next absolute right-4 lg:right-8 top-[45%] -translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-industrial-orange text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-xl hidden sm:flex items-center justify-center"
        aria-label="Slide suivant"
      >
        <ChevronRight size={24} />
      </button>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        speed={800}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
        }}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        className="w-full"
      >
        {heroSlides.map((slide) => {
          const BadgeIcon = slide.badgeIcon;
          return (
            <SwiperSlide key={slide.id}>
              {/* Arrière-plan dynamique */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={slide.image} 
                  alt="OA Métal Industrie" 
                  className="w-full h-full object-cover opacity-55 transform scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-industrial-blue via-industrial-blue/80 to-industrial-blue/30"></div>
              </div>

              {/* Hauteur du hero */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Grand bloc textuel de gauche */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="lg:col-span-7 space-y-4"
                  >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
                      <span className="block">{slide.title1}</span>
                      <span className="text-industrial-orange block my-1">{slide.highlight}</span>
                      <span className="block">{slide.title2}</span>
                    </h1>

                    <p className="text-gray-200 text-xs sm:text-sm max-w-xl font-medium tracking-wide border-l-4 border-industrial-orange pl-4 bg-black/20 py-2 rounded-r">
                      {slide.slogan}
                    </p>

                    {/* Boutons d'action */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-3">
                      <Link 
                        to="/produits" 
                        className="bg-industrial-orange hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wide transition shadow-lg text-xs sm:text-sm"
                      >
                        Découvrir nos produits
                        <ArrowRight size={18} />
                      </Link>
                      <Link 
                        to="/devis" 
                        className="bg-black/30 hover:bg-black/50 backdrop-blur-sm border-2 border-white text-white font-bold px-5 py-3 rounded-lg flex items-center justify-center uppercase tracking-wide transition text-xs sm:text-sm text-center"
                      >
                        Demander un devis
                      </Link>
                    </div>
                  </motion.div>

                  {/* Badge circulaire à droite */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="lg:col-span-5 flex justify-center lg:justify-end"
                  >
                    <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full border-4 border-industrial-orange bg-industrial-blue/80 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center text-center p-5">
                      <div className="absolute inset-2 rounded-full border border-industrial-orange/30 border-dashed"></div>
                      <BadgeIcon size={46} className="text-industrial-orange mb-2" />
                      <span className="text-white font-black text-base sm:text-lg tracking-wider uppercase leading-tight">
                        {slide.badgeTitle}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-200 mt-1.5 uppercase tracking-widest font-semibold">
                        {slide.badgeSub}
                      </span>
                    </div>
                  </motion.div>

                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Pagination globale fixe et indépendante positionnée en bas du bloc */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center pt-2">
        <div className="custom-pagination flex gap-2 items-center"></div>
      </div>

      {/* Style CSS personnalisé */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-pagination {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
        .custom-pagination .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          min-width: 8px !important;
          border-radius: 9999px !important;
          background: rgba(255, 255, 255, 0.4) !important;
          opacity: 1 !important;
          margin: 0 !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 32px !important;
          min-width: 32px !important;
          background: #f97316 !important; /* industrial-orange */
        }
      `}} />
    </section>
  );
}
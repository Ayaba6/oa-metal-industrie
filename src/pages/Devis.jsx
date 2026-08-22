import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, CheckCircle, Send, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const productCategories = [
  { id: 'fers', name: 'Fers à béton (HA & Lisse)', diameters: ['8 mm', '10 mm', '12 mm', '16 mm', '20 mm', '25 mm', '32 mm'] },
  { id: 'toles', name: 'Tôles & Couvertures', types: ['Tôles ondulées galvanisées', 'Tôles bacs aluminium', 'Tôles bacs aciers laqués'] },
  { id: 'profiles', name: 'Profilés & Poutrelles', types: ['IPE', 'HEB', 'UPN', 'Tubes ronds', 'Tubes rectangulaires'] },
  { id: 'autre', name: 'Autres matériaux / Consommables', types: ['Treillis soudé', 'Fils de ligature', 'Pointes'] }
];

export default function Devis() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    category: 'fers',
    itemDetail: '',
    quantity: '',
    unit: 'barres', // barres, bottes, feuilles, tonnes
    needDelivery: true,
    deliveryLocation: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* En-tête de la page */}
      <section className="relative bg-industrial-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80" 
            alt="Demande de devis OA Métal" 
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
            Estimation en ligne
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight"
          >
            Demander un Devis Personnalisé
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Configurez votre liste de matériaux et obtenez une cotation précise avec nos options de livraison sur chantier au Burkina Faso.
          </motion.p>
        </div>
      </section>

      {/* Formulaire de Devis interactif */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-50 border border-gray-200 rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-sm"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-industrial-blue uppercase">Demande de devis transmise !</h3>
              <p className="text-gray-600 text-sm max-w-lg mx-auto">
                Votre demande a bien été prise en compte par notre service commercial. Un devis détaillé chiffré vous sera envoyé par e-mail ou WhatsApp dans les plus brefs délais.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFormData({
                  category: 'fers',
                  itemDetail: '',
                  quantity: '',
                  unit: 'barres',
                  needDelivery: true,
                  deliveryLocation: '',
                  name: '',
                  phone: '',
                  email: '',
                  notes: ''
                });
              }}
              className="bg-industrial-orange text-white font-bold text-xs uppercase px-8 py-4 rounded-xl tracking-wider transition hover:bg-orange-600 shadow-lg cursor-pointer"
            >
              Effectuer une autre demande
            </button>
          </motion.div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            
            {/* Barre de progression des étapes */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-industrial-orange text-white rounded-xl font-black flex items-center justify-center text-sm shadow">
                  {step}
                </div>
                <div>
                  <h4 className="text-sm font-black text-industrial-blue uppercase">
                    {step === 1 && "Étape 1 : Choix des matériaux"}
                    {step === 2 && "Étape 2 : Quantité & Livraison"}
                    {step === 3 && "Étape 3 : Coordonnées de contact"}
                  </h4>
                  <p className="text-[11px] text-gray-500">Étape {step} sur 3</p>
                </div>
              </div>
              <div className="hidden sm:flex gap-1">
                <div className={`w-12 h-2 rounded-full ${step >= 1 ? 'bg-industrial-orange' : 'bg-gray-200'}`}></div>
                <div className={`w-12 h-2 rounded-full ${step >= 2 ? 'bg-industrial-orange' : 'bg-gray-200'}`}></div>
                <div className={`w-12 h-2 rounded-full ${step >= 3 ? 'bg-industrial-orange' : 'bg-gray-200'}`}></div>
              </div>
            </div>

            <form onSubmit={step === 3 ? handleSubmit : handleNext}>
              
              {/* ÉTAPE 1 : Choix du produit */}
              {step === 1 && (
                <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-industrial-blue uppercase">Sélectionnez la catégorie principale</h3>
                    <p className="text-xs text-gray-600">Choisissez le type de produit métallique recherché pour votre projet.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {productCategories.map((cat) => (
                      <label 
                        key={cat.id}
                        className={`flex flex-col p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                          formData.category === cat.id 
                            ? 'border-industrial-orange bg-white shadow-md' 
                            : 'border-gray-200 bg-white/50 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <input 
                            type="radio" 
                            name="category" 
                            value={cat.id} 
                            checked={formData.category === cat.id}
                            onChange={handleChange}
                            className="accent-industrial-orange"
                          />
                          <Calculator size={18} className={formData.category === cat.id ? 'text-industrial-orange' : 'text-gray-400'} />
                        </div>
                        <span className="font-bold text-sm text-industrial-blue uppercase">{cat.name}</span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-4">
                    <label className="text-xs font-bold text-gray-700 uppercase">Précisions sur le produit (Diamètre, Référence, Nuance) *</label>
                    <input 
                      type="text" 
                      name="itemDetail" 
                      required
                      value={formData.itemDetail}
                      onChange={handleChange}
                      placeholder="Ex: Fer HA 12mm ou Tôle bac alu épaisseur 0.5mm"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      className="bg-industrial-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 transition shadow cursor-pointer"
                    >
                      <span>Continuer</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ÉTAPE 2 : Quantité et Livraison */}
              {step === 2 && (
                <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-industrial-blue uppercase">Quantité et Logistique</h3>
                    <p className="text-xs text-gray-600">Indiquez les volumes nécessaires et si vous avez besoin d'une livraison sur chantier.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase">Quantité estimée *</label>
                      <input 
                        type="text" 
                        name="quantity" 
                        required
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Ex: 150 ou 2 tonnes"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase">Unité</label>
                      <select 
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                      >
                        <option value="barres">Barres / Unités</option>
                        <option value="tonnes">Tonnes</option>
                        <option value="bottes">Bottes / Paquets</option>
                        <option value="feuilles">Feuilles</option>
                        <option value="rouleaux">Rouleaux</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="needDelivery"
                        checked={formData.needDelivery}
                        onChange={handleChange}
                        className="w-4 h-4 accent-industrial-orange"
                      />
                      <div className="flex items-center gap-2">
                        <Truck size={20} className="text-industrial-orange" />
                        <span className="text-xs sm:text-sm font-bold text-industrial-blue uppercase">J'ai besoin d'une livraison sur mon chantier</span>
                      </div>
                    </label>
                  </div>

                  {formData.needDelivery && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase">Lieu / Ville de livraison *</label>
                      <input 
                        type="text" 
                        name="deliveryLocation" 
                        required={formData.needDelivery}
                        value={formData.deliveryLocation}
                        onChange={handleChange}
                        placeholder="Ex: Ouagadougou (Quartier Ouaga 2000) ou Bobo-Dioulasso"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                      />
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <button 
                      type="button"
                      onClick={handlePrev}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 transition cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                      <span>Retour</span>
                    </button>
                    <button 
                      type="submit"
                      className="bg-industrial-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 transition shadow cursor-pointer"
                    >
                      <span>Continuer</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ÉTAPE 3 : Coordonnées */}
              {step === 3 && (
                <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-industrial-blue uppercase">Vos Coordonnées</h3>
                    <p className="text-xs text-gray-600">Où devons-nous vous envoyer votre devis chiffré ?</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase">Nom / Entreprise *</label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex: Jean Kaboré / BTP Faso"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase">Téléphone / WhatsApp *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ex: +226 70 00 00 00"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase">E-mail *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@exemple.com"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase">Remarques ou instructions particulières (Optionnel)</label>
                    <textarea 
                      name="notes" 
                      rows="3"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Précisions sur les délais souhaités ou demandes de coupe sur mesure..."
                      className="w-full bg-white border border-gray-300 rounded-xl p-4 text-xs sm:text-sm focus:outline-none focus:border-industrial-orange transition"
                    ></textarea>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button 
                      type="button"
                      onClick={handlePrev}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 transition cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                      <span>Retour</span>
                    </button>
                    <button 
                      type="submit"
                      className="bg-industrial-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl uppercase tracking-wider flex items-center gap-2 transition shadow-lg cursor-pointer"
                    >
                      <span>Soumettre ma demande de devis</span>
                      <Send size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

            </form>

          </div>
        )}

      </section>

    </div>
  );
}
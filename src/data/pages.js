// =====================================================================
//  Contenus des pages intérieures (repris des anciennes pages du site).
// =====================================================================
import { Truck, Scissors, Wrench, ShieldCheck, Headset, Warehouse, Building2, DoorOpen, Hammer, PackageOpen } from 'lucide-react';

// ---- Produits --------------------------------------------------------
export const CATEGORIES_PRODUITS = [
  { id: 'all', label: 'Tous les produits' },
  { id: 'toles', label: 'Tôles & couvertures' },
  { id: 'fers', label: 'Fers & armatures' },
  { id: 'profiles', label: 'Profilés & tubes' },
  { id: 'accessoires', label: 'Accessoires & fixations' },
];

export const PRODUITS = [
  { titre: 'Tôle ondulée', categorie: 'toles', image: '/images/tole-ondulee.jpg', badge: 'Populaire', description: 'Robustes et durables pour tous types de couvertures résidentielles ou industrielles.', points: ['Robuste & durable', 'Excellente résistance aux intempéries', 'Pose facile'] },
  { titre: 'Tôle bac', categorie: 'toles', image: '/images/tole-bac.jpg', badge: 'Résistant', description: 'Tôles bac de haute qualité offrant une esthétique moderne et une étanchéité irréprochable.', points: ['Haute qualité', 'Grande rigidité', 'Idéal grands chantiers'] },
  { titre: 'Fer à béton', categorie: 'fers', image: '/images/fer-beton.jpg', badge: 'Essentiel', description: 'Solide et résistant pour renforcer durablement vos fondations et structures en béton armé.', points: ['Solide & résistant', 'Conforme aux normes', 'Divers diamètres'] },
  { titre: 'Fer attaché', categorie: 'fers', image: '/images/ferattache.jpg', badge: 'Chantier', description: 'Solide et fiable pour lier efficacement vos structures de fers à béton sur les chantiers.', points: ['Solide & fiable', 'Facile à manipuler', 'Attache sécurisée'] },
  { titre: 'IPN', categorie: 'profiles', image: '/images/ipn2.jpg', badge: 'Industriel', description: 'Poutrelles métalliques garantissant une robustesse maximale pour vos charpentes et structures porteuses.', points: ['Robustesse garantie', 'Acier de premier choix', 'Longueurs adaptées'] },
  { titre: 'Tube carré', categorie: 'profiles', image: '/images/tube-carre2.jpg', badge: 'Polyvalent', description: 'Allie solidité et esthétique pour vos travaux de serrurerie, portails et ossatures métalliques.', points: ['Solide & esthétique', 'Finition propre', 'Multi-usages'] },
  { titre: 'Crochet', categorie: 'accessoires', image: '/images/crochet.jpg', badge: 'Accessoire', description: 'Conçu pour une fixation sécurisée de vos couvertures et éléments de toiture.', points: ['Fixation sécurisée', 'Matériau anti-corrosion', 'Tenue irréprochable'] },
  { titre: 'Pointe', categorie: 'accessoires', image: '/images/pointe.jpg', badge: 'Accessoire', description: 'Pointes de qualité supérieure offrant précision et performance pour tous vos travaux de charpente.', points: ['Précision', 'Performance', 'Tous travaux de charpente'] },
];

// ---- Services ----------------------------------------------------------
// Les 4 métiers figurent sur la bannière de l'entreprise (src/assets/ban.jpeg).
export const METIERS = [
  { icon: Building2, titre: 'Construction métallique', texte: 'Transformation et pose de structures métalliques pour vos bâtiments, travaux publics et projets industriels.' },
  { icon: DoorOpen, titre: 'Menuiserie métallique', texte: 'Portes, fenêtres, portails et ouvrages sur mesure en acier.' },
  { icon: Hammer, titre: 'Ferronnerie', texte: 'Grilles, garde-corps et ouvrages de ferronnerie pour l’habitat et les entreprises.' },
  { icon: PackageOpen, titre: 'Vente de matériaux', texte: 'Tôles, fer à béton, tubes, IPN et accessoires, en stock à Ouagadougou.' },
];

export const SERVICES = [
  { icon: Truck, titre: 'Livraison sur chantier', texte: 'Une flotte de camions adaptée pour acheminer vos fers à béton, tôles et profilés directement sur vos sites, partout au Burkina Faso.', points: ['Respect des délais convenus', 'Chauffeurs formés et professionnels', 'Capacité adaptée aux grands volumes'] },
  { icon: Scissors, titre: 'Découpe & sur-mesure', texte: "Découpe et façonnage de l'acier selon vos plans. Gagnez du temps en recevant des matériaux prêts à l'installation.", points: ['Coupe précise par nos techniciens', 'Moins de pertes sur site', 'Adapté à tous types de profilés'] },
  { icon: Wrench, titre: 'Conseil technique', texte: "Nos équipes vous guident dans le choix des nuances d'acier, des diamètres de fers et des épaisseurs de tôles adaptés à votre ouvrage.", points: ['Analyse de vos plans', 'Recommandations conformes aux normes', 'Optimisation des coûts de matériaux'] },
  { icon: ShieldCheck, titre: 'Contrôle qualité', texte: "Tous nos produits subissent des tests de résistance et de durabilité pour garantir la sécurité de vos ouvrages et bâtiments.", points: ['Matériaux testés et certifiés', 'Traçabilité des aciers', 'Conformité aux standards internationaux'] },
  { icon: Headset, titre: 'Service client BTP', texte: 'Un interlocuteur dédié du devis jusqu’à la réception de votre commande, pour vos urgences et questions logistiques.', points: ['Suivi de commande', 'Disponibilité et écoute', 'Devis rapides et transparents'] },
  { icon: Warehouse, titre: 'Stock permanent', texte: 'Un vaste espace de stockage pour une disponibilité immédiate des références courantes et éviter les ruptures sur vos chantiers.', points: ['Stocks importants', 'Disponibilité immédiate', 'Réactivité face aux urgences'] },
];

// ---- Réalisations ------------------------------------------------------
// ⚠ EXEMPLES FICTIFS repris de l'ancienne page : remplacez-les par de vrais
//   chantiers (titre, lieu, client, photo) avant la mise en ligne.
export const CATEGORIES_REALISATIONS = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'batiment', label: 'Bâtiments & immeubles' },
  { id: 'industriel', label: 'Infrastructures & usines' },
  { id: 'residentiel', label: 'Résidentiel & villas' },
];

export const REALISATIONS = [
  { titre: 'Complexe commercial Ouaga 2000', categorie: 'batiment', lieu: 'Ouagadougou', annee: '2025', client: 'Groupe Immobilier du Faso', image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f2445?auto=format&fit=crop&w=1000&q=80', texte: 'Fourniture de fers à béton haute adhérence et de profilés métalliques pour la structure porteuse de ce centre commercial.' },
  { titre: 'Hangar industriel & stockage', categorie: 'industriel', lieu: 'Bobo-Dioulasso', annee: '2025', client: 'Industrie & Logistique SA', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80', texte: 'Charpente métallique de grande envergure avec profilés et tôles bac pour un site de stockage.' },
  { titre: 'Cité résidentielle Les Palmiers', categorie: 'residentiel', lieu: 'Ouagadougou', annee: '2024', client: 'Promotion immobilière privée', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80', texte: 'Approvisionnement régulier en fers de construction pour 30 villas.' },
  { titre: 'Siège social institutionnel', categorie: 'batiment', lieu: 'Koudougou', annee: '2025', client: 'Institution publique', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80', texte: 'Matériaux de gros œuvre pour un bâtiment R+4.' },
  { titre: 'Usine agro-alimentaire', categorie: 'industriel', lieu: 'Bobo-Dioulasso', annee: '2024', client: 'Agro-Industrie Burkina', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80', texte: "Livraison de tubes structuraux et de tôles ondulées galvanisées pour l'extension des lignes de production." },
  { titre: "Immeuble d'appartements", categorie: 'residentiel', lieu: 'Ouagadougou', annee: '2026', client: 'Architectes & Associés', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80', texte: 'Livraison cadencée de fers à béton sur un chantier en centre-ville.' },
];

// ---- Actualités --------------------------------------------------------
// ⚠ ARTICLES D'EXEMPLE repris de l'ancienne page : à remplacer par de vraies
//   actualités avant la mise en ligne.
export const CATEGORIES_ARTICLES = ['Tous', 'Logistique & stocks', 'Conseils chantiers', 'Entreprise', 'Qualité & normes'];

export const ARTICLES = [
  { titre: "Arrivage de fers à béton haute résistance à l'entrepôt de Bassinko", categorie: 'Logistique & stocks', date: '15 août 2026', lecture: '3 min', auteur: 'Service logistique', image: '/images/fer-beton.jpg', extrait: 'OA Métal Industrie renforce ses stocks avec un nouvel arrivage de fers à béton et de profilés métalliques pour répondre à la demande des chantiers de Ouagadougou.' },
  { titre: 'Comment bien choisir ses tôles (ondulées et bac) pour la saison des pluies ?', categorie: 'Conseils chantiers', date: '2 août 2026', lecture: '5 min', auteur: 'Équipe technique', image: '/images/tole-bac.jpg', extrait: 'Étanchéité, épaisseur, résistance à la corrosion : nos conseils pour choisir des tôles adaptées au climat du Burkina Faso.' },
  { titre: 'Extension de notre flotte de livraison sur vos chantiers', categorie: 'Entreprise', date: '20 juillet 2026', lecture: '2 min', auteur: 'Direction commerciale', image: '/images/images1.jpg', extrait: 'Pour des délais toujours plus courts, OA Métal Industrie déploie de nouveaux camions pour acheminer vos matériaux en toute sécurité.' },
  { titre: "Normes et sécurité dans le bâtiment : l'engagement qualité OA Métal", categorie: 'Qualité & normes', date: '10 juillet 2026', lecture: '4 min', auteur: 'Contrôle qualité', image: '/images/tube-carre.jpg', extrait: "La durabilité d'une construction repose sur la fiabilité de ses matériaux. Zoom sur nos contrôles avant chargement." },
];

// ---- Devis -------------------------------------------------------------
export const CATEGORIES_DEVIS = [
  { id: 'fers', nom: 'Fers à béton (HA & lisse)', options: ['8 mm', '10 mm', '12 mm', '16 mm', '20 mm', '25 mm', '32 mm'] },
  { id: 'toles', nom: 'Tôles & couvertures', options: ['Tôles ondulées galvanisées', 'Tôles bac aluminium', 'Tôles bac acier laquées'] },
  { id: 'profiles', nom: 'Profilés & poutrelles', options: ['IPE', 'HEB', 'UPN', 'Tubes ronds', 'Tubes rectangulaires'] },
  { id: 'autre', nom: 'Autres matériaux / consommables', options: ['Treillis soudé', 'Fils de ligature', 'Pointes'] },
];

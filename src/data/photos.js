// =====================================================================
//  Photos haute définition de la page d'accueil (banque d'images Unsplash).
//  Licence Unsplash : utilisation commerciale gratuite, sans attribution
//  obligatoire. https://unsplash.com/license
//
//  Ce sont des photos d'illustration : elles ne montrent ni le dépôt ni
//  l'équipe d'OA Métal Industrie. Dès que le client fournit ses propres
//  photos HD, remplacez simplement l'adresse correspondante ci-dessous
//  (par ex. '/images/depot-hd.jpg').
//
//  Poids : sur téléphone, les photos sont demandées en plus petite taille
//  (connexions mobiles plus lentes). Unsplash les compresse en AVIF/WebP.
// =====================================================================

const ecran = typeof window !== 'undefined' ? window.innerWidth * Math.min(window.devicePixelRatio || 1, 2) : 1440;
const mobile = ecran < 1000;

// largeur : taille sur ordinateur ; sur téléphone on divise par deux environ
const unsplash = (id, largeur = 1200, qualite = 70) => {
  const w = mobile ? Math.min(largeur, Math.max(640, Math.round(ecran))) : largeur;
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${mobile ? 60 : qualite}`;
};

export const PHOTOS = {
  // Fond du hero (fondu enchaîné)
  soudeurPoutres: unsplash('photo-1600965581129-eef8a214ec9d', 1600), // soudeur sur une charpente, lumière dorée
  charpenteOrange: unsplash('photo-1493476523860-a6de6ce1b0c3', 1600), // charpente métallique orange de nuit
  meulageEtincelles: unsplash('photo-1522322512347-a0e57fd1744c', 1600), // meulage d'un tube, gerbe d'étincelles
  ferBetonPile: unsplash('photo-1745909247906-123b53b70e06', 1400, 60), // barres de fer à béton (photo très détaillée, donc lourde)

  // Produits
  ferBeton: unsplash('photo-1745909247906-123b53b70e06', 900, 60),
  toleBac: unsplash('photo-1628002881911-8bcdfbdf320e', 900), // tôles bac orange sur ciel bleu
  toleOndulee: unsplash('photo-1568821692671-ea55f10b54ff', 900), // tôles nervurées sous les nuages
  tubes: unsplash('photo-1763776091801-23dfe3f63bb0', 900, 65), // tubes carrés et ronds en stock
  ipn: unsplash('photo-1441796522229-b3a3cb3d58fd', 900), // nœud de charpente en profilés
  soudureTubes: unsplash('photo-1714504904786-b6732390b206', 900), // soudure sur tubes carrés

  // Chantiers et équipes
  chantierPoteaux: unsplash('photo-1654000749275-7b032f760975', 900), // coffrages et armatures d'un immeuble
  equipeChantier: unsplash('photo-1548838670-cb67b43a6adb', 1600), // équipe en gilets orange et casques
};

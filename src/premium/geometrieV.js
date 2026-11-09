// Géométrie commune du V : utilisée par le hero, les étincelles et le bandeau.
// w = largeur de l'écran en pixels.
export function geometrieV(w) {
  const mobile = w < 640;
  return {
    mobile,
    D: Math.round(Math.min(160, Math.max(50, w * (mobile ? 0.13 : 0.095)))), // profondeur du V
    T: mobile ? 44 : 60, // épaisseur du bandeau
  };
}

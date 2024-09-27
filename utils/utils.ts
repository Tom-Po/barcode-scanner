export function fakeEAN13() {
  // Générer une chaîne aléatoire de 12 chiffres et ajouter 1 chiffre pour obtenir un nombre à 13 chiffres
  const EAN13 =
    Math.floor(Math.random() * 9 * Math.pow(10, 12)) + Math.pow(10, 12);
  return EAN13;
}

/**
 * Calcule le score d'un post en fonction des likes et de l'ancienneté
 * - Les likes ont un impact positif plus important
 * - La pénalité temporelle est atténuée et plafonnée
 * - Un post avec des likes garde un score positif plus longtemps
 */
export const calculatePostScore = (post) => {
  // Calcul de l'âge en heures
  const ageInHours = 
    (new Date().getTime() - new Date(post.createdAt).getTime()) / 
    (1000 * 60 * 60);
  
  // Coefficient pour les likes (augmenté à 10 pour donner plus de poids)
  const likeScore = post.likeCount * 10;
  
  // Pénalité temporelle avec plafond et atténuation
  const maxPenalty = 5; // Plafond de la pénalité
  const timePenalty = Math.min(ageInHours * 0.05, maxPenalty);
  
  // Score final
  return likeScore - timePenalty;
};
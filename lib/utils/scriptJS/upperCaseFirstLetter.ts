export const upperFirstLetterOfAString = (stringToUpper: string) => {
  // fonction pour mettre en majuscule la 1er lettre d'un mot

  return stringToUpper.charAt(0).toUpperCase() + stringToUpper.slice(1);
};

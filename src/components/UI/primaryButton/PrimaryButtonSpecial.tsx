import React, { useEffect, useRef, useState } from 'react';
import styles from './PrimaryButtonSpecial.module.css';

interface PrimaryButtonSpecialProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Composant Bouton Spécial avec effets de lueur interactifs
 * 
 * Structure des effets :
 * 1. Lueur externe (blur-lg) : cercle lumineux violet qui suit la souris à l'extérieur du bouton
 * 2. Fond du bouton : dégradé vertical de base (from-purpleBtn to-darkPurpleBtn)
 * 3. Lueur interne : cercle lumineux qui suit la souris à l'intérieur du bouton
 * 4. Bordure lumineuse : ombre interne blanche/violette sur le dessus
 */
const PrimaryButtonSpecial: React.FC<PrimaryButtonSpecialProps> = ({ text, onClick, disabled = false }) => {
  // Refs pour accéder aux éléments DOM
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // États pour gérer les animations
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });       // Position réelle de la souris
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });     // Position lissée pour l'animation
  const [isHovered, setIsHovered] = useState(false);                        // État de survol
  const [opacity, setOpacity] = useState(0);                                // Opacité de la lueur interne
  const [scale, setScale] = useState(1);                                    // Échelle de la lueur interne
  const [glowOpacity, setGlowOpacity] = useState(0);                       // Opacité de la lueur externe

  // Fonction d'interpolation linéaire pour les animations fluides
  const lerp = (start: number, end: number, factor: number): number => 
    start + (end - start) * factor;

  // Animation fluide de la position de la lueur
  useEffect(() => {
    let animationFrameId: number;
    
    const smoothMove = () => {
      setSmoothPosition(prev => ({
        x: lerp(prev.x, mousePosition.x, 0.15), // Facteur de lissage : 0.15
        y: lerp(prev.y, mousePosition.y, 0.15)
      }));
      
      animationFrameId = requestAnimationFrame(smoothMove);
    };

    if (isHovered) {
      animationFrameId = requestAnimationFrame(smoothMove);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mousePosition, isHovered]);

  // Gestion des transitions d'opacité des lueurs
  useEffect(() => {
    let fadeTimeout: NodeJS.Timeout;
  
    if (isHovered) {
      // Application immédiate des opacités
      setOpacity(1);
      setGlowOpacity(1);
    } else {
      // Délai de disparition pour un effet plus doux
      fadeTimeout = setTimeout(() => {
        setOpacity(0);
        setGlowOpacity(0);
      }, 200);
    }
  
    // Cleanup: on ne nettoie que fadeTimeout car c'est le seul qu'on utilise
    return () => {
      if (fadeTimeout) {
        clearTimeout(fadeTimeout);
      }
    };
  }, [isHovered]);

  // Gestion du mouvement de la souris et de l'échelle de la lueur
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || !containerRef.current) return;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    
    const buttonX = e.clientX - buttonRect.left;
    const buttonY = e.clientY - buttonRect.top;
    
    // Calcul de la distance par rapport au centre pour l'effet d'échelle
    const centerX = buttonRect.width / 2;
    const centerY = buttonRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(buttonX - centerX, 2) + Math.pow(buttonY - centerY, 2)
    );
    
    // Échelle dynamique basée sur la distance
    const maxScale = 1.2;
    const distanceScale = Math.min(distance / 100, 1);
    const newScale = 1 + (distanceScale * (maxScale - 1));
    setScale(newScale);
    
    setMousePosition({ x: buttonX, y: buttonY });
  };

  return (
    // Conteneur avec padding négatif pour la lueur externe
    <div 
      ref={containerRef}
      className="relative inline-block p-4 -m-4"
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setMousePosition({ 
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        setSmoothPosition({ 
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Lueur externe (halo violet flou) */}
      <div 
        className="absolute top-4 left-4 right-4 bottom-4 -m-2 rounded-xl blur-xl"
        style={{
          background: `radial-gradient(
            circle at ${smoothPosition.x}px ${smoothPosition.y}px,
            rgba(192, 159, 243, 0.4) 20%,    /* Violet clair */
            rgba(158, 108, 238, 0.3) 30%,   /* Violet moyen */
            transparent 50%
          )`,
          opacity: glowOpacity,
          transition: 'opacity 0.3s ease-out',
        }}
      />

      {/* Bouton principal */}
      <button
        ref={buttonRef}
        onClick={onClick}
        disabled={disabled}
        className={`${styles.primary_button}
          relative flex justify-center items-center 
          text-sm px-3 py-1.5 
          rounded-lg text-slate-50 
          bg-gradient-to-b from-purpleBtn to-darkPurpleBtn    /* Dégradé de fond */
          transition-all duration-300 ease-in-out
          ${disabled ? 'opacity-60' : 'cursor-pointer'}
          overflow-hidden
          shadow-[inset_1px_1px_1px_rgba(192,159,243,0.82),inset_0px_-1px_1.2px_#5c21ba]  /* Bordure lumineuse */
          hover:brightness-110
        `}
      >
        {/* Lueur interne (suit la souris) */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              circle at ${smoothPosition.x}px ${smoothPosition.y}px,
              rgba(147, 103, 224, 1) 10%,     /* Centre violet vif */
              rgba(158, 108, 238, 0.4) 35%,  /* Transition */
              rgba(137, 82, 224, 0.2) 45%,   /* Fondu */
              transparent 60%
            )`,
            transform: `scale(${scale})`,
            opacity: opacity,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
          }}
        />
        
        {/* Texte du bouton */}
        <span className="relative z-10">{text}</span>
      </button>
    </div>
  );
};

export default PrimaryButtonSpecial;
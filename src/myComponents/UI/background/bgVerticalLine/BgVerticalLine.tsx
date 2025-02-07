import React from "react";

const BgVerticalLine = () => {
  return (
    <div className="w-full absolute -z-10 inset-0">
      {/* Container pour les lignes verticales */}
      <div className="absolute inset-0 w-full h-full">
        {/* Grille de lignes verticales */}
        <div className="relative h-full mx-auto max-w-7xl">
          <div className="grid grid-cols-6 h-full">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="border-l border-gray-200 h-full"
                aria-hidden="true"
              />
            ))}
            {/* Dernière ligne à droite */}
            <div className="border-l border-r border-gray-200 h-full" />
          </div>
        </div>
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, var(--backgroundLight) 70%)",
        }}
      />
    </div>
  );
};

export default BgVerticalLine;

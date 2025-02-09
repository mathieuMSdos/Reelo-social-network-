import React from 'react';

const GridLinesBackground = () => {
  const numColumns = 80;
  const numRows = 50;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="relative w-full h-full">
        {/* Container pour les lignes avec overflow pour gérer la rotation */}
        <div className="absolute inset-0 scale-150"> {/* scale-150 pour compenser la rotation */}
          {/* Lignes verticales */}
          <div className="absolute inset-0 flex origin-center -rotate-45">
            {Array.from({ length: numColumns - 1 }).map((_, index) => (
              <div
                key={`vertical-${index}`}
                className="border-r border-gray-200/60 h-full"
                style={{ width: `${100 / numColumns}%` }}
              />
            ))}
          </div>
          
          {/* Lignes horizontales */}
          <div className="absolute inset-0 flex flex-col origin-center -rotate-45">
            {Array.from({ length: numRows - 1 }).map((_, index) => (
              <div
                key={`horizontal-${index}`}
                className="border-b border-gray-200/60 w-full"
                style={{ height: `${100 / numRows}%` }}
              />
            ))}
          </div>
        </div>

        {/* Overlay supérieur */}
        <div 
          className="absolute top-0 left-0 right-0 h-80 pointer-events-none bg-gradient-to-b from-[#FAFAFA] to-transparent"
        />

<div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, 
              transparent 0%, 
              transparent 25%, 
              #FAFAFA 100%
            )`
          }}
        />

        {/* Overlay inférieur */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none bg-gradient-to-t from-[#FAFAFA] to-transparent"
        />
      </div>
    </div>
  );
};

export default GridLinesBackground;
import React from 'react';

const GridLinesBackground = () => {
  const numColumns = 27;
  const numRows = 24;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="relative w-full h-full">
        {/* Lignes verticales */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: numColumns - 1 }).map((_, index) => (
            <div
              key={`vertical-${index}`}
              className="border-r border-gray-200/60 h-full rotate-45 translate-1/2"
              style={{ width: `${100 / numColumns}%` }}
            />
          ))}
        </div>
        
        {/* Lignes horizontales */}
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: numRows - 1 }).map((_, index) => (
            <div
              key={`horizontal-${index}`}
              className="border-b border-gray-200/60 w-full rotate-45 -translate-1/2"
              style={{ height: `${100 / numRows}%` }}
            />
          ))}
        </div>

        {/* Overlay supérieur */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #FAFAFA, transparent)'
          }}
        />

        {/* Overlay inférieur */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #FAFAFA, transparent)'
          }}
        />
      </div>
    </div>
  );
};

export default GridLinesBackground;
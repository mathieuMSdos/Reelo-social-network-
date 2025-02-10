import React from "react";

interface GradientDividerProps {
  className?: string;
  width?: string;
  containerWidth?: string;
  fadeWidth?: string;
}

const GradientDivider = ({ 
  className = "",
  width = "w-full",
  containerWidth = "w-full",
  fadeWidth = "w-1/3"
}:  GradientDividerProps) => {
  return (
    <div className={`${containerWidth} relative flex items-center justify-center py-4 h-3 ${className}`}>
      <div className={`${width} h-px flex`}>
        {/* Gradient de gauche */}
        <div className={`${fadeWidth} h-full bg-gradient-to-r from-transparent to-skeletonGrey`}></div>
        
        {/* Section centrale */}
        <div className="flex-grow h-full bg-skeletonGrey"></div>
        
        {/* Gradient de droite */}
        <div className={`${fadeWidth} h-full bg-gradient-to-l from-transparent to-skeletonGrey`}></div>
      </div>
    </div>
  );
};

export default GradientDivider;
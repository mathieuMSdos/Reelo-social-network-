import React from "react";
import styles from "./container.module.css";

interface BentoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const BentoContainer = ({ 
  children, 
  className,
  ...props // Récupère toutes les autres props
}: BentoContainerProps) => {
  const defaultStyle = styles.container_shadow

  return (
    <div 
      className={`${defaultStyle} ${className} rounded-lg`}
      {...props} // Transmet toutes les autres props au div
    >
      {children}
    </div>
  );
};

export default BentoContainer;
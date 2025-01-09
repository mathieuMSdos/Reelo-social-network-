import React from "react";
import styles from "./container.module.css";

interface BentoContainerProps {
  children: React.ReactNode;
  className?: string;
}

const BentoContainer = ({ children, className }: BentoContainerProps) => {
  // défini le style par defaut du container
  const defaultStyle = `${styles.container_shadow}`;

  return <div className={`${defaultStyle} ${className}`}>{children}</div>;
};

export default BentoContainer;

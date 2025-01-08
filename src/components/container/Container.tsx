import React from "react";
import styles from "./container.module.css";


interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {

  // défini le style par defaut du container
  const defaultStyle = `${styles.container_shadow}`;

  return <div className={`${defaultStyle} ${className}`}>{children}</div>;
};

export default Container;

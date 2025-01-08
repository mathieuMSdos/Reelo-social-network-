import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {

  // défini le style par defaut du container
  const defaultStyle = "bg-red-500";

  return <div className={`${defaultStyle} ${className}`}>{children}</div>;
};

export default Container;

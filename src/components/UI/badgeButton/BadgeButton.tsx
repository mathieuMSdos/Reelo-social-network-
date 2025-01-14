"use client"
import React from "react";

interface BadgeButtonProps {
  children: React.ReactNode;
  text: string
}

const BadgeButton = ({ children, text }:BadgeButtonProps) => {
  return (
    <button className="flex items-center justify-center gap-1 border rounded-full border-purpleBtn text-purpleBtn font-semibold px-6 py-1 text-xs">
      {children}
      <p>{text}</p>
    </button>
  );
};

export default BadgeButton;

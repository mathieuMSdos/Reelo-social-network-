"use client";
import styles from "./secondaryButtonInApp.module.css";

interface SecondaryButtonInAppProps {
  text: string;
  children?: React.ReactNode;
  onClick: () => void;
  className?: string
}

const SecondaryButtonInApp = ({
  text,
  onClick,
  children,
  className,
}: SecondaryButtonInAppProps) => {
  return (
    <button
      className={`${styles.button_shadow} ${className} flex gap-1 justify-center items-center  rounded-lg  whitespace-nowrap font-inter font-semibold overflow-hidden active:scale-95 transition-all duration-100  `}
      onClick={onClick}
    >
      {children}
      <p className={`${styles.text_inner_shadow} text-purpleBtn`}>{text}</p>
    </button>
  );
};

export default SecondaryButtonInApp;

"use client";
import styles from "./secondaryButtonInApp.module.css";

interface SecondaryButtonInAppProps {
  text?: string;
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const SecondaryButtonInApp = ({
  text,
  onClick,
  children,
  className,
}: SecondaryButtonInAppProps) => {
  return (
    <button
      className={`${styles.button_shadow}  flex gap-1 justify-center items-center rounded-lg h-auto px-3 py-2 min-w-22 whitespace-nowrap text-sm font-inter font-semibold overflow-hidden active:scale-95 transition-all duration-100 ${className}  `}
      onClick={onClick}
    >
      {children}
      {text && (
        <p className={`${styles.text_inner_shadow} text-purpleBtn`}>{text}</p>
      )}
    </button>
  );
};

export default SecondaryButtonInApp;

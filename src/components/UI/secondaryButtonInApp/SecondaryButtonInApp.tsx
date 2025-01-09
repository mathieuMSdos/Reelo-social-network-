"use client";
import styles from "./secondaryButtonInApp.module.css";

interface SecondaryButtonInAppProps {
  text: string;
  children?: React.ReactNode;
  onClick: () => void;
}

const SecondaryButtonInApp = ({
  text,
  onClick,
  children,
}: SecondaryButtonInAppProps) => {
  return (
    <button
      className={`${styles.button_shadow} h-9 w-126 flex gap-1 justify-center items-center px-2 py-2 rounded-lg text-sm whitespace-nowrap font-inter font-semibold overflow-hidden active:scale-95 transition-all duration-100 `}
      onClick={onClick}
    >
      {children}
      <p className={`${styles.text_inner_shadow} text-purpleBtn`}>{text}</p>
    </button>
  );
};

export default SecondaryButtonInApp;

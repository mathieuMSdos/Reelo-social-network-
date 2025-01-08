import { LogOut } from "lucide-react";
import styles from "./secondaryButtonInApp.module.css";

const SecondaryButtonInApp = () => {
  return (
    <button
      className={`${styles.button_shadow} h-8 w- flex gap-1 justify-center items-center px-2 py-2 rounded-lg text-sm whitespace-nowrap font-inter font-semibold overflow-hidden`}
    >
      <LogOut size={16} strokeWidth={2.5} color="#8952E0" />
      <p className={`${styles.text_inner_shadow} text-purpleBtn`}>Sign out</p>
    </button>
  );
};

export default SecondaryButtonInApp;

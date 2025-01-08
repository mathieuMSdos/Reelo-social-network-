import styles from "./secondaryButtonInApp.module.css";

const SecondaryButtonInApp = () => {
  return (
    <button
      className={`${styles.button_shadow} h-8 w-20 flex justify-center items-center px-2 py-2 rounded-lg text-sm whitespace-nowrap font-inter font-semibold overflow-hidden`}
    >
      <p className={`${styles.text_inner_shadow}`}>Sign out</p>
    </button>
  );
};

export default SecondaryButtonInApp;

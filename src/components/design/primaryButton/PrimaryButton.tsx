import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({ text }) => {
  return (
    <div
      className={`${styles.primary_button} cursor-pointer inline-block px-7 py-1 rounded-lg text-slate-50 bg-gradient-to-b from-purpleBtn to-darkPurpleBtn `}
    >
      <p className="">Hello</p>
    </div>
  );
};

export default PrimaryButton;

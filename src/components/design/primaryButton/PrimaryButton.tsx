import styles from "./PrimaryButton.module.css";

// TYPE
interface PrimaryButtonProps {
  text: string;
  disabled: boolean;
  onClick: () => void;
}

const PrimaryButton = ({ text, onClick, disabled }: PrimaryButtonProps) => {
  console.log(disabled);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.primary_button} ${
        disabled ? "opacity-60" : "cursor-pointer"
      }  inline-block px-7 py-1 rounded-lg text-slate-50 bg-gradient-to-b from-purpleBtn to-darkPurpleBtn`}
    >
      <p className="">{text}</p>
    </button>
  );
};

export default PrimaryButton;

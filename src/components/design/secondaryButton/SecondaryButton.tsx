import styles from "./SecondaryButton.module.css";

// TYPE
interface SecondaryButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

const SecondaryButton = ({ text, onClick, disabled }: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.primary_button} ${
        disabled ? "opacity-60" : "cursor-pointer"
      }  inline-block px-4 py-1 rounded-lg bg-greySecondaryBtn text-purpleBtn weith font-semibold `}
    >
      <p className="">{text}</p>
    </button>
  );
};

export default SecondaryButton;

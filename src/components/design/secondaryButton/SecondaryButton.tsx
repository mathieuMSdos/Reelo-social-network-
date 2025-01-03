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
      }  flex justify-center items-center text-sm max-h-8 px-3 py-2 rounded-lg bg-greySecondaryBtn text-purpleBtn weith font-semibold `}
    >
      <p className="">{text}</p>
    </button>
  );
};

export default SecondaryButton;

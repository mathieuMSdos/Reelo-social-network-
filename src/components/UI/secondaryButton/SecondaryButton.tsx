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
      className={` ${
        disabled ? "opacity-60" : "cursor-pointer"
      }  flex justify-center items-center h-auto px-3 py-2 min-w-22 text-sm whitespace-nowrap rounded-lg gap-1.5 border bg-inputLightBG border-purpleBtn text-purpleBtn weith font-medium `}
    >
      <p className="">{text}</p>
    </button>
  );
};

export default SecondaryButton;

import styles from "./PrimaryButton.module.css";

// TYPE
interface PrimaryButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const PrimaryButton = ({
  text,
  onClick,
  disabled,
  children,
  className,
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${styles.primary_button} ${
        disabled ? "opacity-60" : "cursor-pointer"
      }   flex justify-center items-center h-auto px-3 py-2 min-w-22 text-sm whitespace-nowrap rounded-lg gap-1.5 text-slate-50 bg-gradient-to-b from-purpleBtn to-darkPurpleBtn transition-all duration-200 ease-in-out`}
    >
      {/* To add icon */}
      {children}
      <p className="">{text}</p>
    </button>
  );
};

export default PrimaryButton;

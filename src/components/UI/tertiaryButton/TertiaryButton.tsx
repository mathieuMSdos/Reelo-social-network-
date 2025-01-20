// TYPE
interface TertiaryButtonProps {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

const TertiaryButton = ({
  text,
  onClick,
  disabled,
  className,
}: TertiaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center text-sm max-h-8 py-2 whitespace-nowrap  rounded-lg text-purpleBtn font-semibold hover:brightness-110 transition-all duration-200 ease-in-out ${className}`}
    >
      <p className="drop-shadow-sm">{text}</p>
    </button>
  );
};

export default TertiaryButton;

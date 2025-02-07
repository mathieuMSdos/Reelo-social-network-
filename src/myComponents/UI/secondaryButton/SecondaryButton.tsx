import { ReactNode } from "react";

// TYPE
interface SecondaryButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
  children?: ReactNode;
  className?:string
}

const SecondaryButton = ({
  text,
  onClick,
  disabled,
  children,
  className,
}: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` ${
        disabled ? "opacity-60" : "cursor-pointer"
      }  flex justify-center items-center h-auto px-3 py-1.5 min-w-22 text-sm whitespace-nowrap rounded-lg gap-1.5 border border-purpleBtn/80  shadow-sm text-purpleBtn font-medium ${className} `}
    >
      {children}
      <p className="">{text}</p>
    </button>
  );
};

export default SecondaryButton;

import { ReactNode } from "react";

// TYPE
interface SecondaryButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

const SecondaryButton = ({
  text,
  onClick,
  disabled,
  children,
}: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` ${
        disabled ? "opacity-60" : "cursor-pointer"
      }  flex justify-center items-center h-auto px-3 py-2 min-w-22 text-sm whitespace-nowrap rounded-lg gap-1.5 border bg-white border-purpleBtn text-purpleBtn font-medium `}
    >
      {children}
      <p className="">{text}</p>
    </button>
  );
};

export default SecondaryButton;

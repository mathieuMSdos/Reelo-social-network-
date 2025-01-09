import React from "react";
interface InputGenericProps {
  type: string;
  value: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  autoFocus?: boolean;
  "aria-label"?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGeneric = ({
  type,
  value,
  placeholder,
  minLength,
  maxLength,
  autoFocus,
  "aria-label": ariaLabel,
  onChange,
}: InputGenericProps) => {
  return (
    <input className="bg-greyPurple w-1/2 py-2 px-3 rounded-3xl focus:outline-none "
      type={type}
      value={value}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      autoFocus={autoFocus}
      aria-label={ariaLabel}
      onChange={onChange}
    />
  );
};

export default InputGeneric;

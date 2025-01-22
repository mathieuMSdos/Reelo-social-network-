import lordIconSearch from "@/src/assets/icons/system-regular-42-search-hover-search.json";
import React from "react";
import GenericIcon from "../lordIcons/GenericIcon";

interface InputGenericProps {
  className?: string;
  type: string;
  value: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  autoFocus?: boolean;
  showSearchIcon?: boolean;
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
  className,
  showSearchIcon: searchIcon,
}: InputGenericProps) => {
  return (
    <div className="relative w-full">
      <input
        className={`bg-greyPurple py-2 px-3 rounded-lg focus:outline-none ${className} ${
          searchIcon && "pl-9"
        }`}
        type={type}
        value={value}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        onChange={onChange}
      />
      {searchIcon && (
        <GenericIcon
          className="absolute top-1/2 left-2 -translate-y-1/2"
          icon={lordIconSearch}
          size={22}
        />
      )}
    </div>
  );
};

export default InputGeneric;

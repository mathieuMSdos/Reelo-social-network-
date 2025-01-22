"use client";

import { CircleX, Search } from "lucide-react";
import React, { useState } from "react";

interface InputGenericProps {
  className?: string;
  type: string;
  value: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  autoFocus?: boolean;
  showSearchIcon?: boolean;
  showDeleteIcon?: boolean;
  setInputValue?: (value: string) => void;
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
  showSearchIcon = false,
  showDeleteIcon = false,
  setInputValue,
}: InputGenericProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        className={`bg-greyPurple py-2 px-3 rounded-lg focus:outline-none ${className}`}
        type={type}
        value={value}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (setInputValue) {
            // reset contenu de l'input si on clique si on defocus de l'input
            setInputValue("");
          }
        }}
      />
      {showSearchIcon && !isFocused && (
        <div className="absolute top-1/2 left-2 -translate-y-1/2 text-textGrey">
          <Search size={19} />
        </div>
      )}
      {showDeleteIcon && value !== "" && (
        <div
          className="absolute top-1/2 -translate-y-1/2 right-2 text-textGrey cursor-pointer"
          onClick={() => {
            if (setInputValue) {
              // reset contenu de l'input si on clique sur close
              setInputValue("");
            }
          }}
        >
          <CircleX size={19} />
        </div>
      )}
    </div>
  );
};

export default InputGeneric;

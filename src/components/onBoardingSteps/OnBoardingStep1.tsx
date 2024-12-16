"use client";

import { useStore } from "@/lib/store/index.store";
import { useState } from "react";

// TYPE

interface OnBoardingStep1Props {
  actualUsername: string;
}


const OnBoardingStep1 = ({ actualUsername }: OnBoardingStep1Props) => {

  // zustand state
  const setNextStep = useStore((state) => state.setNextStep);

  // const state local
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNextStep();
  };
  return (
    <div>
      <h1>step 1</h1>
      <form onSubmit={handleSubmit}>
        <h2>STEP 1: Your actual username is {actualUsername} would you like to change it ? </h2>
        <input
          type="text"
          value={inputValue}
          placeholder={actualUsername}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
          
        />
        <button>Next</button>
      </form>
    </div>
  );
};

export default OnBoardingStep1;

"use client";

import { useStore } from "@/lib/store/index.store";
import { useState } from "react";

// TYPE
interface OnBoardingStep2Props {
  actualDisplayName:string
}

const OnBoardingStep2 = ({actualDisplayName}:OnBoardingStep2Props) => {

  // zustand state
  const setPreviousStep = useStore((state) => state.setPreviousStep);

  // const state local
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // créer un server action qui va les envoyé à la BDD via prisma
  };
  return (
    <div>
      <h1>STEP 2: your actual display name is : {actualDisplayName} would you like to change it ?</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          placeholder={actualDisplayName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
          required
        />
        <div>
          <button onClick={setPreviousStep}>Previous</button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default OnBoardingStep2;

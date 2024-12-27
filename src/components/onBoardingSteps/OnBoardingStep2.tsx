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

// ---------- FUNCTIONS ----------

  // contrôle du champ input
  const inputControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noSpaceValue = e.target.value.replace(/\s+/g, "_");

    setInputValue(noSpaceValue);
  };

  const handleSubmit = () => {
    // setNextStep();
    // setNewUsername(inputValue);
  };
  return (
    <div>
      <h1>STEP 2: Choose your display Name</h1>
      <h3>This is how others will see you. You can change it anytime.</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          placeholder={actualDisplayName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            inputControl(e);
            // setDisplayRules(true);
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

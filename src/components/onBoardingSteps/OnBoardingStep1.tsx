"use client";

import { useStore } from "@/lib/store/index.store";
import { useEffect, useState } from "react";
import BasicAlertRules from "./BasicAlertRules";

// TYPE

interface OnBoardingStep1Props {
  actualUsername: string;
}

const OnBoardingStep1 = ({ actualUsername }: OnBoardingStep1Props) => {
  // zustand state
  const setNextStep = useStore((state) => state.setNextStep);
  const setNewUsername = useStore((state) => state.setNewUsername);

  // const state local
  const [inputValue, setInputValue] = useState("");
  const [displayRules, setDisplayRules] = useState(false);
  const [rules, setRules] = useState({
    isMinAndMaxLength: false,
    isNoEmpty: false,
    isFirstAt: false,
  });

  // contrôle du champ input
  const inputControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setNextStep();

    // là il faut une fonction qui aille voir dans la BDD si username choisi est pas déjà pris si déjà pris prospoer un autre

    if (inputValue && inputValue !== "") {
      setNewUsername(inputValue);
    }
  };

  // USE EFFECT

  // Proposer le username par defaut à l'utilisateur (la valeur n'est pas dispo dès le montage du composant donc on est obligé de passer par un useEffect pour eéviter que inputValue soit undefined dès le début)
  useEffect(() => {
    // On check si actualUsername à récupérer son contenu est n'est plus undefined.
    if (actualUsername) {
      setInputValue(actualUsername);
    }
  }, [actualUsername]);

  // vérifie en temps réél si inputValue est conforme aux critères
  useEffect(() => {
    setRules({
      isMinAndMaxLength: inputValue.length >= 6 && inputValue.length <= 20,
      isNoEmpty: inputValue !== "",
      isFirstAt: inputValue[0] === "@",
    });
  }, [inputValue]);

  // Obligé le @
  useEffect(() => {
    if (inputValue.length <= 1) {
      setInputValue("@");
    }
  }, [inputValue]);

  return (
    <div>
      <h1>step 1</h1>
      <h2>STEP 1: Customize your username !</h2>
      <input
        type="text"
        value={inputValue}
        placeholder={actualUsername}
        autoFocus
        aria-label="username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          inputControl(e);
          setDisplayRules(true);
        }}
      />
      {/* check info container */}
      <div>
        {displayRules && inputValue.length <= 6 ? (
          <p className="text-red-500">6 characters minimum</p>
        ) : inputValue.length > 20 ? (
          <p className="text-red-500">20 characters maximum</p>
        ) : (
          ""
        )}
        {displayRules && (
          <BasicAlertRules
            isValidate={rules.isMinAndMaxLength}
            text={"Choose a username between 6 and 20 characters"}
          />
        )}
      </div>

      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default OnBoardingStep1;

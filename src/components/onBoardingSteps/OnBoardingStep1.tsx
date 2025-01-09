"use client";

import { isUsernameAlreadyExistAction } from "@/app/actions/onBoardingActions";
import { useStore } from "@/lib/store/index.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import InputGeneric from "../UI/inputGeneric/InputGeneric";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import BasicAlertRules from "./BasicAlertRules";

// ---------- TYPE ----------

interface OnBoardingStep1Props {
  actualUsername: string;
}

const OnBoardingStep1 = ({ actualUsername }: OnBoardingStep1Props) => {
  // ---------- zustand state ----------
  const setNextStep = useStore((state) => state.setNextStep);
  const newUserNameStored = useStore((state) => state.newUserName);
  const setNewUsername = useStore((state) => state.setNewUsername);

  // ---------- const state local ----------
  const [inputValue, setInputValue] = useState(newUserNameStored || "@");
  const [displayRules, setDisplayRules] = useState(false);
  const [rules, setRules] = useState({
    isMinAndMaxLength: false,
    isNoEmpty: false,
    isFirstAt: false,
  });

  // ---------- FUNCTIONS ----------

  // contrôle du champ input
  const inputControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noSpaceValue = e.target.value.replace(/\s+/g, "_");

    setInputValue(noSpaceValue);
  };

  const handleSubmit = () => {
    setNextStep();
    setNewUsername(inputValue);
  };

  //---------- USE EFFECT----------

  // Proposer le username par defaut à l'utilisateur (la valeur n'est pas dispo dès le montage du composant donc on est obligé de passer par un useEffect pour eéviter que inputValue soit undefined dès le début)
  // mettre le username choisi qu'on récupère depuis zustand pour conserverles données entre les étapes du formulaire si jamais l'user reviens en arrière de l'étape 2 vers l'étapes 1 on veux l'usernamechoisi en premier
  useEffect(() => {
    // On check si actualUsername à récupérer son contenu est n'est plus undefined.

    if (newUserNameStored) {
      setInputValue(newUserNameStored);
    } else if (actualUsername) {
      setInputValue(actualUsername);
    }
  }, [actualUsername, newUserNameStored]);

  // vérifie en temps réél si inputValue est conforme aux critères
  useEffect(() => {
    setRules({
      isMinAndMaxLength: inputValue.length >= 6 && inputValue.length <= 20,
      isNoEmpty: inputValue !== "",
      isFirstAt: inputValue[0] === "@",
    });
  }, [inputValue]);

  // Forcé le @
  useEffect(() => {
    if (inputValue.length <= 1) {
      setInputValue("@");
    }
  }, [inputValue]);

  // --------  TANSTACK --------

  // Debouncing pattern : on vérifie en direct si l'username choisi existe déjà mais on met un système de debounce pour pas surcharger le server en requête + on utilise tanstack aussi pour limiter les requêtes BDD.
  const [debouncedValue] = useDebounce(inputValue, 500);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["username", debouncedValue],
    queryFn: () => isUsernameAlreadyExistAction(debouncedValue),
    enabled: rules.isMinAndMaxLength === true,
    refetchOnWindowFocus: false,
  });

  // -------- UseMemo --------
  const isChosenUsernameValid = useMemo(() => {
    // si le nom d'utilisateur tapé n'existe pas dans la BDD c'est un username valide, si l'username est = à actual username il est donc déjà en BDD mais c'est valide puisque c'est lui même sinon c'est pas valide il doit changer de username

    // Design pattern Optimistic Update, on part du principe que le username ne serapas déjà pris. LE fait qu'il ne soit pas déjà pris est la règle et le cas qu'il soit déjà pris c'est l'exception.

    // Objectif éviter le saut visuel d'un icon à l'autr ele temps que data est undefined pendant la requête prisma
    if (isFetching && rules.isMinAndMaxLength) {
      return true;
    }

    if (data) {
      return !data.isExist || data.username === actualUsername;
    }
    return rules.isMinAndMaxLength;
  }, [data, actualUsername, isFetching, rules.isMinAndMaxLength]);

  return (
    <div>
      <h1>step 1</h1>
      <h2>STEP 1: Confirm your username</h2>
      <InputGeneric
        type="text"
        value={inputValue}
        placeholder={actualUsername}
        maxLength={20}
        autoFocus
        aria-label="username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          inputControl(e);
          setDisplayRules(true);
        }}
      />
      {/* info container */}
      <div>
        {/* Indication en temps réel */}
        {displayRules && inputValue.length < 6 ? (
          <p className="text-red-500">6 characters minimum</p>
        ) : inputValue.length > 20 ? (
          <p className="text-red-500">20 characters maximum</p>
        ) : (
          ""
        )}

        {/* Contraintes à respecter pour username */}
        {displayRules && (
          <div>
            <BasicAlertRules
              isValidate={rules.isMinAndMaxLength}
              textForValidation={
                "Choose a username between 6 and 20 characters"
              }
              textForInvalidation={
                "Choose a username between 6 and 20 characters"
              }
            />
            <BasicAlertRules
              isValidate={rules.isFirstAt}
              textForInvalidation='Your username must start with "@"'
              textForValidation='Your username must start with "@"'
            />

            <BasicAlertRules
              isValidate={isChosenUsernameValid}
              textForValidation={"Username is available !"}
              textForInvalidation={"Change username"}
              isFetching={isFetching}
              isError={isError}
            />
          </div>
        )}
      </div>

      <PrimaryButton
        text="Continue"
        onClick={handleSubmit}
        disabled={
          !rules.isFirstAt ||
          !rules.isMinAndMaxLength ||
          !isChosenUsernameValid ||
          isFetching
        }
      />
    </div>
  );
};

export default OnBoardingStep1;

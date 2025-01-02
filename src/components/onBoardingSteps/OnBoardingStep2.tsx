"use client";

import { updateUserAction } from "@/app/actions/onBoardingActions";
import { useStore } from "@/lib/store/index.store";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import InputGeneric from "../design/inputGeneric/InputGeneric";
import PrimaryButton from "../design/primaryButton/PrimaryButton";
import TertiaryButton from "../design/tertiaryButton/TertiaryButton";
import BasicAlertRules from "./BasicAlertRules";

// TYPE
interface OnBoardingStep2Props {
  userId: string;
}

interface UpdateUserData {
  userId: string;
  username: string;
  displayName: string;
  hasCompletedOnboarding: boolean;
}

// ---------------------COMPOSANT

const OnBoardingStep2 = ({ userId }: OnBoardingStep2Props) => {
  // zustand state
  const newUserName = useStore((state) => state.newUserName);
  const newDisplayName = useStore((state) => state.newDisplayName);
  const setNewDisplayName = useStore((state) => state.setNewDisplayName);
  const setPreviousStep = useStore((state) => state.setPreviousStep);

  // const state local
  const [inputValue, setInputValue] = useState(newDisplayName || "");
  const [rules, setRules] = useState({
    isNoEmpty: false,
    isMin4Max30: false,
  });

  // ---------- UseMemo ----------
  // UseMémo pour effectuer l'opération de vérification : est ce que le contenu de l'input peut être envoyé à la BDD pour enregistrement + actvation du bouton Continue
  const displayNameChosenIsValidated = useMemo(() => {
    return rules.isNoEmpty && rules.isMin4Max30;
  }, [rules]);

  // ---------- UseEffect ----------
  // Vérification en temps réél : est ce que le contenu de l'input est conforme au exigence minimal ?
  useEffect(() => {
    setRules({
      isNoEmpty: inputValue !== "",
      isMin4Max30: inputValue.length >= 4 && inputValue.length <= 30,
    });
  }, [inputValue]);

  // Mise à jour du store zustand en fonction de ce qui est tapé
  useEffect(() => {
    setNewDisplayName(inputValue);
  }, [inputValue]);

  // ---------- FUNCTIONS ----------

  // contrôle du champ input
  const inputControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noSpaceValue = e.target.value.replace(/\s+/g, "_");

    setInputValue(noSpaceValue);
  };

  // TANSTACK MUTATION
  const { mutate: updateUserMutation, error } = useMutation({
    mutationFn: (data: UpdateUserData) => updateUserAction(data),
  });

  const handleSubmit = () => {
    // sécurité suplémentaire on bloque le submit si displayname ne répond pas aux éxigences
    if (displayNameChosenIsValidated) {
      updateUserMutation({
        userId: userId,
        username: newUserName,
        displayName: newDisplayName,
        hasCompletedOnboarding: true,
      });
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>STEP 2: Choose your display Name</h1>
      <h5>This is how others will see you. You can change it anytime.</h5>
      <InputGeneric
        type="text"
        value={inputValue}
        placeholder="Your display name here..."
        maxLength={30}
        autoFocus={true}
        onChange={(e) => {
          inputControl(e);
        }}
      />
      <BasicAlertRules
        isValidate={displayNameChosenIsValidated}
        textForValidation="Choose a display name between 4 and 30 characters"
        textForInvalidation="Choose a display name between 4 and 30 characters"
      />
      <div className="flex gap-1">
        <TertiaryButton text="Previous" onClick={setPreviousStep} />
        <PrimaryButton
          text="Continue"
          onClick={handleSubmit}
          disabled={!displayNameChosenIsValidated}
        />
      </div>
      <button onClick={() => toast.success("coucou")}>test</button>
    </div>
  );
};

export default OnBoardingStep2;

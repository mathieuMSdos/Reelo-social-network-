"use client";

import { updateUserAction } from "@/app/actions/onBoarding.actions";
import { useStore } from "@/lib/store/index.store";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import InputGeneric from "../UI/inputGeneric/InputGeneric";
import PlasticCardContainer from "../UI/plasticCardContainer/PlasticCardContainer";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import SecondaryButton from "../UI/secondaryButton/SecondaryButton";
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

  // ROUTER
  const router = useRouter();
  const { update } = useSession();

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
  }, [inputValue, setNewDisplayName]);

  // ---------- FUNCTIONS ----------

  // contrôle du champ input
  const inputControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noSpaceValue = e.target.value.replace(/\s+/g, "_");

    setInputValue(noSpaceValue);
  };

  // TANSTACK MUTATION
  const { mutate: updateUserMutation, error } = useMutation({
    mutationFn: (data: UpdateUserData) => updateUserAction(data),
    onMutate: () => {
      toast.dismiss();
      toast.loading("Saving...");
    },
    onSuccess: async () => {
      toast.dismiss();
      toast.success("Saved");
      // On déclenche la mise à jour de la session pour récupérer les nouvelles infos qui viennent d'être mis à jour
      await update();
      // on refresh hard pour que les composants et l'app se mettent à jour avec les nouvelles données de session. Sans ça certain composant ne se mettrait pas à jour avec les nouvelles données
      router.refresh();
      router.push("/protected/home");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed");
    },
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
    <PlasticCardContainer className1="" className2="py-8 px-5 gap-1">
      <h2 className=" font-bold text-xl mb-5 ">Choose your display Name</h2>

      <InputGeneric
        className="w-64 text-lg font-semibold"
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
      <div className="w-full flex justify-center mt-5 gap-5 ">
        <SecondaryButton text="Previous" onClick={setPreviousStep} />
        <PrimaryButton
          text="Continue"
          onClick={handleSubmit}
          disabled={!displayNameChosenIsValidated}
        />
      </div>
    </PlasticCardContainer>
  );
};

export default OnBoardingStep2;

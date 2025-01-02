"use client"
import { useStore } from "@/lib/store/index.store";
import OnBoardingStep1 from "./OnBoardingStep1";
import OnBoardingStep2 from "./OnBoardingStep2";
import { useSession } from "next-auth/react";

const OnBoardingFormMulti = () => {

// ZUSTAND state
const step = useStore((state) => state.step)

// On récupère la session pour avoir username et display name actuel
const {data} = useSession()
const actualUsername = data?.user?.username
const userId = data?.user?.id


  return (
    
    <div>
            {step === 1 && <OnBoardingStep1 actualUsername={actualUsername} />}
            {step === 2 && <OnBoardingStep2 userId={userId}/>}
    </div>
  );
};

export default OnBoardingFormMulti;
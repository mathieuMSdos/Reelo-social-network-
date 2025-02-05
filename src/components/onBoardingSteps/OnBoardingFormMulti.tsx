"use client";
import { useStore } from "@/lib/store/index.store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import OnBoardingStep1 from "./OnBoardingStep1";
import OnBoardingStep2 from "./OnBoardingStep2";

const OnBoardingFormMulti = () => {
  // ZUSTAND state
  const step = useStore((state) => state.step);

  // On récupère la session pour avoir username et display name actuel
  const { data } = useSession();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full justify-items-center -translate-y-14">
        <Image
          className="drop-shadow-lg text-textBlack mb-10"
          src="/logo/Logo_no_text.png"
          width={70}
          height={70}
          alt="logo"
        />
        <div className="w-full flex justify-center">
          {step === 1 && (
            <OnBoardingStep1 actualUsername={data?.user?.username ?? ""} />
          )}
          {step === 2 && <OnBoardingStep2 userId={data?.user?.id ?? ""} />}
        </div>
      </div>
    </div>
  );
};

export default OnBoardingFormMulti;

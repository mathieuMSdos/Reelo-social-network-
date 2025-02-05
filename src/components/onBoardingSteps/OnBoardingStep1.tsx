"use client";

import { isUsernameAlreadyExistAction } from "@/app/actions/onBoarding.actions";
import { useStore } from "@/lib/store/index.store";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import InputGeneric from "../UI/inputGeneric/InputGeneric";
import PlasticCardContainer from "../UI/plasticCardContainer/PlasticCardContainer";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import BasicAlertRules from "./BasicAlertRules";

interface OnBoardingStep1Props {
  actualUsername: string;
}

const OnBoardingStep1 = ({ actualUsername }: OnBoardingStep1Props) => {
  const setNextStep = useStore((state) => state.setNextStep);
  const newUserNameStored = useStore((state) => state.newUserName);
  const setNewUsername = useStore((state) => state.setNewUsername);

  const [inputValue, setInputValue] = useState(
    newUserNameStored || actualUsername || "@"
  );

  const [displayRules, setDisplayRules] = useState(false);
  const [rules, setRules] = useState({
    isMinAndMaxLength: false,
    isNoEmpty: false,
    isFirstAt: false,
  });

  const inputControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noSpaceValue = e.target.value.replace(/\s+/g, "_");
    setInputValue(noSpaceValue);
  };

  const handleSubmit = () => {
    setNextStep();
    setNewUsername(inputValue);
  };

  useEffect(() => {
    if (actualUsername) {
      setInputValue(actualUsername);
    } else if (newUserNameStored) {
      setInputValue(newUserNameStored);
    }
  }, [actualUsername, newUserNameStored]);

  useEffect(() => {
    setRules({
      isMinAndMaxLength: inputValue.length >= 6 && inputValue.length <= 20,
      isNoEmpty: inputValue !== "" && inputValue !== "@",
      isFirstAt: inputValue[0] === "@",
    });
  }, [inputValue]);

  useEffect(() => {
    if (inputValue.length <= 1) {
      setInputValue("@");
    }
  }, [inputValue]);

  const [debouncedValue] = useDebounce(inputValue, 500);

  const { data, isFetching } = useQuery({
    queryKey: ["username", debouncedValue],
    queryFn: () => isUsernameAlreadyExistAction(debouncedValue),
    enabled: rules.isMinAndMaxLength === true,
    refetchOnWindowFocus: false,
  });

  const isChosenUsernameValid = useMemo(() => {
    if (!rules.isNoEmpty) {
      return false;
    }

    if (isFetching && rules.isMinAndMaxLength) {
      return true;
    }

    if (data) {
      return (
        (!data.isExist || data.username === actualUsername) &&
        rules.isMinAndMaxLength
      );
    }
    return rules.isMinAndMaxLength;
  }, [
    data,
    actualUsername,
    isFetching,
    rules.isMinAndMaxLength,
    rules.isNoEmpty,
  ]);

  return (
    <PlasticCardContainer className1="" className2="py-8 px-5">
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <h2 className="font-bold text-2xl mb-5">Confirm your username</h2>
        <div className="w-full flex justify-center">
          <InputGeneric
            className="w-64 text-lg font-semibold"
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
        </div>

        <AnimatePresence mode="wait">
          {displayRules && (
            <motion.div
              className="flex flex-col gap-1"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <BasicAlertRules
                isValidate={rules.isMinAndMaxLength}
                textForValidation="Choose a username between 6 and 20 characters"
                textForInvalidation="Choose a username between 6 and 20 characters"
              />

              <BasicAlertRules
                isValidate={isChosenUsernameValid}
                textForIsFetching="Checking availability..."
                textForValidation="Username is available !"
                textForInvalidation="Change username"
                isFetching={isFetching}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full flex justify-center mt-5">
          <PrimaryButton
            className="w-24"
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
      </div>
    </PlasticCardContainer>
  );
};

export default OnBoardingStep1;

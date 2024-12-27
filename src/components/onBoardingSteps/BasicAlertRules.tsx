"use client";

import loadingIconLord from "@/src/assets/icons/system-solid-18-autorenew-hover-autorenew.json";
import { CircleCheck, CircleX } from "lucide-react";
import GenericIcon from "../design/lordIcons/GenericIcon";

interface BasicAlertRulesProps {
  isValidate: boolean;
  textForValidation: string;
  textForInvalidation: string;
  isFetching?: boolean;
  isError?: boolean;
}

const BasicAlertRules = ({
  isValidate,
  textForValidation,
  textForInvalidation,
  isFetching: isFetching = false,
  isError = false,
}: BasicAlertRulesProps) => {
  return (
    <div className="flex gap-1">
      {isFetching ? (
        <GenericIcon icon={loadingIconLord} size={27} loop={true} />
      ) : isValidate ? (
        <CircleCheck />
      ) : (
        <CircleX />
      )}
      <p>{isValidate ? textForValidation : textForInvalidation}</p>
    </div>
  );
};

export default BasicAlertRules;

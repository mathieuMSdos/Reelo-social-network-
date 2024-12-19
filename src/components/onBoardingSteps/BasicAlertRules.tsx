"use client";

import { CircleCheck, CircleX } from "lucide-react";

interface BasicAlertRulesProps {
  isValidate: boolean;
  textForValidation: string
  textForInvalidation : string
}

const BasicAlertRules = ({ isValidate, textForValidation,textForInvalidation }: BasicAlertRulesProps) => {
  return (
    <div className="flex gap-1">
      {isValidate ? <CircleCheck /> : <CircleX />}
      <p>{isValidate ? textForValidation : textForInvalidation}</p>
    </div>
  );
};

export default BasicAlertRules;

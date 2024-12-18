"use client";

import { CircleCheck, CircleX } from "lucide-react";

interface BasicAlertRulesProps {
  isValidate: boolean;
  text: string;
}

const BasicAlertRules = ({ isValidate, text }: BasicAlertRulesProps) => {
  return (
    <div className="flex gap-1">
      {isValidate ? <CircleCheck /> : <CircleX />}
      <p>{text}</p>
    </div>
  );
};

export default BasicAlertRules;

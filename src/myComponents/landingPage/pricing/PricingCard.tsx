"use client";
import { PricingPlan } from "@/src/types/pricingTypes";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import PrimaryButton from "../../UI/primaryButton/PrimaryButton";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
  className?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isYearly,
  className,
}) => {
  const annualPrice = isYearly
    ? Number(plan.yearlyPrice.slice(1)) * 12
    : Number(plan.monthlyPrice.slice(1)) * 12;

  return (
    <div
      className={`relative bg-gradient-to-tr from-greyPurple/40 to-slate-white rounded-lg shadow-lg p-8 w-80 flex flex-col gap-2 text-darkLine ${className}`}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
        <p className="text-4xl font-bold mb-2 ">
          {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
        </p>
        <p className="text-gray-600">Billed ${annualPrice} annually</p>
      </div>

      {/* Separator */}
      <div className="h-px bg-gray-200 mb-6" />

      {/* Features */}
      <div className="flex-grow">
        {plan.id === "pro" ? (
          <p className="font-semibold mb-4 text-start text-md ">
            Everything in Plus, and:
          </p>
        ) : (
          <p className="font-semibold mb-4 text-start text-md ">Basics</p>
        )}
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-p" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <Link
        href={plan.button.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full justify-items-center mt-5"
      >
        <PrimaryButton text={plan.button.text} />
      </Link>
    </div>
  );
};

export default PricingCard;

"use client";
import { PricingPlan } from "@/src/types/pricingTypes";
import React, { useState } from "react";
import { AuroraBackground } from "../../UI/aurora-background";
import { defaultPlans } from "./dataPricing";
import PricingCard from "./PricingCard";

interface CustomPricingProps {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const CustomPricing: React.FC<CustomPricingProps> = ({
  heading = "Pricing",
  description = "Check out our affordable pricing plans",
  plans = defaultPlans,
}) => {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  return (
    <section className="py-32">
      <div className="container mx-auto px-4 py-2 text-darkLine">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 text-center">
          {/* Header */}
          <h2 className="text-4xl lg:text-6xl font-bold">{heading}</h2>
          <p className="lg:text-xl">{description}</p>

          {/* Toggle */}
          <div className="flex items-center gap-3 text-lg">
            <span className={!isYearly ? "font-medium" : ""}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
              type="button"
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={isYearly ? "font-medium" : ""}>Yearly</span>
          </div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row items-stretch gap-6">
            {plans.map((plan: PricingPlan) =>
              plan.id === "pro" ? (
                <AuroraBackground key={plan.id}>
                  <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
                </AuroraBackground>
              ) : (
                <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPricing;

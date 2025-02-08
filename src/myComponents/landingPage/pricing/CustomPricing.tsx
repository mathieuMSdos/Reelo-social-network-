"use client";
import { PricingPlan } from "@/src/types/pricingTypes";
import React, { useState } from "react";
import { AuroraBackground } from "../../UI/aurora-background";
import GridLinesBackground from "../../UI/background/gridBG/GridLinesBackground";
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
    <section className="relative py-32">
      <GridLinesBackground />
      <div className="container mx-auto px-4 py-2 text-darkLine">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-10 text-center">
          {/* Header */}
          <div className="w-full text-darkLine/90 flex flex-col gap-8 text-center">
            <h2 className="text-3xl font-extrabold lg:text-6xl">{heading}</h2>
            <p className="text-balance text-muted-foreground lg:text-lg">
              {description}
            </p>
          </div>

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
          <div className="flex flex-col  items-stretch gap-10 md:flex-row md:gap-6">
            {plans.map((plan: PricingPlan) =>
              plan.id === "pro" ? (
                <div key={plan.id} className="relative">
                  <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-darkPurpleBtn blur-lg opacity-20"></div>

                  {/* Conteneur pour maintenir Aurora et PricingCard au-dessus */}
                  <AuroraBackground className="rounded-lg">
                    <PricingCard
                      key={plan.id}
                      plan={plan}
                      isYearly={isYearly}
                      className="border border-purpleLight "
                    />
                  </AuroraBackground>
                </div>
              ) : (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  isYearly={isYearly}
                  className="bg-white"
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPricing;
